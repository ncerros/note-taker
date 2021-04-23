// dependencies
const fs = require('fs');
const path = require('path');

// export module
module.exports = app => {

    //  notes variables are created
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // this function will start, create, and save to JSON the notes
        app.get("/api/notes", function(req, res) {
            
            res.json(notes);
        });

        //it will create the notes after finding the api route  
        app.post("/api/notes", function(req, res) { 
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note:" + newNote.title);
        });

        // will get the the correct id and show the json notes array
        app.get("/api/notes/:id", function(req,res) {
            res.json(notes[req.params.id]);
        });

        // an specific ide will be deleted
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });
        // ======================================================
        // HTML ROUTES
        // ========================================================

        // This function will access and show notes.html
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // This function will access and show index.html
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // everytime the user add or delete a note json will be updated
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}