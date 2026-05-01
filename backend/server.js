const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors"); // allows React (5173) to talk to backend (5000)
const Note = require("./models/Note");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post("/notes", async (req, res) => { // /notes → collection (all notes)
    const { title, description, color } = req.body;

    const note = new Note({
        title,
        description,
        color
    });

    await note.save();
    res.json(note);
});

app.put("/notes/:id", async (req, res) => { // /notes/:id → specific note
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } option, returns the updated document, Note.findByIdAndUpdate( ID , NEW_DATA , OPTIONS )
    res.json(updated);
});

app.delete("/notes/:id", async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // findbyIdAndDelete means it will find the note by id and delete it from the database
    res.json({ message: "Note deleted" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});