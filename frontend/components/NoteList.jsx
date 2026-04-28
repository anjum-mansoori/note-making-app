import React from 'react'
import axios from 'axios';
import './NoteList.css'

const NoteList = ({ notes, setNotes, form, setForm, search }) => {

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/notes/${id}`);
        setNotes(prev => prev.filter(note => note._id !== id));
    };

    const editNote = (id) => { // Get one note and put it into form for editing
        const editedNote = notes.find(note => note._id === id);
        setForm(editedNote); // This fills your input fields
    };

    const highlightText = (text, search) => { // This is a function that takes: text → original string, search → what user typed
        if (!search) return text; // If user didn’t type anything → don’t highlight, Just return normal text

        const regex = new RegExp(`(${search})`, "gi"); // g → global → match ALL occurrences, i → ignore case → React = react
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === search.toLowerCase()
                ? <mark key={i}>{part}</mark>
                : part
        );
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) return `${interval} year${interval > 1 ? 's' : ''} ago`;

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) return `${interval} month${interval > 1 ? 's' : ''} ago`;

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`;

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`;

        interval = Math.floor(seconds / 60);
        if (interval >= 1) return `${interval} minute${interval > 1 ? 's' : ''} ago`;

        return "Just now";
    };

    return (
        <div className='container-list'>
            {notes.length === 0 && <h2 className='no-notes'>No notes yet...</h2>}
            {notes.map((note, index) => (
                <div className='items' key={note._id || note.id} style={{ backgroundColor: note.color }}>
                    <h2>{highlightText(note.title, search)}</h2>
                    <p>{highlightText(note.description, search)}</p>
                    <div className='bottom'>
                        {/* <span className='time'> we use this to show time in this format 10:30 AM/ PM
                            {new Date(note.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span> */}
                        <span className='time'>{timeAgo(note.createdAt)}</span>
                        <div className="button">
                            <span className='edit' onClick={() => editNote(note._id)}><i className="fas fa-edit"></i></span>
                            <span className='del' onClick={() => deleteNote(note._id)}><i className="fas fa-trash"></i></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NoteList
