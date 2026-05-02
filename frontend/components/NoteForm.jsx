import React from 'react'
import axios from 'axios';
import './NoteForm.css'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const colors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#bdb2ff"
];

const NoteForm = ({ notes, setNotes, form, setForm }) => {

    const handleAdd = async () => {
        if (!form.title.trim() || !form.description.trim()) return;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        if (form._id) {
            // ✅ UPDATE
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/notes/${form._id}`,
                {
                    title: form.title,
                    description: form.description
                }
            );

            setNotes(prev =>
                prev.map(note =>
                    note._id === form._id ? res.data : note
                )
            );

        } else {
            // ✅ CREATE 
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/notes`,
                {
                    title: form.title,
                    description: form.description,
                    color: randomColor
                }
            );

            setNotes(prev => [...prev, res.data]);
        }

        setForm({
            title: "",
            description: "",
            _id: ""
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    return (
        <div className="container">
            <div className='forms'>
                <input
                    type="text"
                    placeholder='Title'
                    className='title'
                    value={form.title}
                    onChange={handleChange}
                    name="title"
                />
                <textarea
                    placeholder='Description...'
                    className='content'
                    value={form.description}
                    onChange={handleChange}
                    name="description"
                ></textarea>
            </div>
            <div className="add-btn" onClick={handleAdd}>
                <i className="fa-solid fa-plus"></i>
                <span>Add Note</span>
            </div>
        </div>
    )
}

export default NoteForm
