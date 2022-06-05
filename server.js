const path = require("path")
const express = require("express");
const fs = require("fs");

const app = express();

const db = path.join(__dirname, "/db")
const mainPath = path.join(__dirname, "/public")

// Using process.env.PORT so Heroku can be used
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainPath, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(db, "db.json"))
    return res.body

})
app.get("*", function(req, res) {
    res.sendFile(path.join(mainPath, "index.html"));
});

app.post("/api/notes", function(req, res) {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var newNote = req.body;


    var uniqueId = (savedNotes.length).toString();
    newNote.id = uniqueId;
    savedNotes.push(newNote);


    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));

    res.json(savedNotes);

})

 
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});