const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db.json");

const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes
// =============================================================

//Routes to get to html

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    });

app.get("*", function(req, res) {
res.sendFile(path.join(__dirname, "public/index.html"));
});



//Routes to get to API
app.get("/api/notes", function(req, res) {
    res.send(db);
  });




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App is listening on PORT: " + PORT);
});