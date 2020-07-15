const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Routes
// =============================================================

//Routes to get to notes page html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    });

//Routes to get to API
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Route to get Notes ID
app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

//Route to get index.html
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  });
  





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App is listening on PORT: " + PORT);
});