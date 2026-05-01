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

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/notes", async (req, res) => {
    try {
        const { title, description, color } = req.body;

        const note = new Note({ title, description, color });
        await note.save();

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.put("/notes/:id", async (req, res) => { // /notes/:id → specific note
    try {
        const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } option, returns the updated document, Note.findByIdAndUpdate( ID , NEW_DATA , OPTIONS )
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.delete("/notes/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id); // findbyIdAndDelete means it will find the note by id and delete it from the database
        res.json({ message: "Note deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});