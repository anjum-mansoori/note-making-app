import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { v4 as uuidv4 } from 'uuid';
import Footer from "../components/Footer";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    _id: ""
  });
  const [search, setSearch] = useState("");

  const [dark, setDark] = useState(() => { // This is called a lazy initializer function, React runs this ONLY ONCE (first render)
    const saved = localStorage.getItem("darkMode"); // get saved value, Gets value from browser storage
    return saved ? JSON.parse(saved) : false; // // if exists → use it, else → false “Check localStorage → if value exists use it → otherwise start with false”
  });

  useEffect(() => {
    axios.get("http://localhost:5000/notes")
      .then(res => setNotes(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={dark ? "app dark" : "app"}>
        <Navbar search={search} setSearch={setSearch} dark={dark} setDark={setDark} />
        <NoteForm notes={notes} setNotes={setNotes} form={form} setForm={setForm} />
        <NoteList notes={filteredNotes} setNotes={setNotes} form={form} setForm={setForm} search={search} />
        <Footer />
      </div>
    </>
  );
}

export default App;
