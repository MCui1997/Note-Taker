//Require all necessary components
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

//Port
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

//Routes to get to API notes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Route to get index.html
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  });
  


//Post API to save JSON data
//Need to give these notes a unique id each time
app.post("/api/notes", function(req, res) {

  // Parses through the object
let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

//Add the new note to the array
let notesNew = req.body;
notes.push(notesNew);

  //for loop to add unique ids
for (var i = 0;i<notes.length;i++){
  notes[i].uniqueId = i;
}

  //Writes the JSON data back to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  console.log("Note saved to db.json. Content: ", notesNew);
  res.json(notes);
})




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App is listening on PORT: " + PORT);
});