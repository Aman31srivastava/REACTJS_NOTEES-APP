import React, { useState, useEffect } from "react";
import "./App.css";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const App = () => {

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (!input.trim()) return;

    if (editId) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, text: input } : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text: input,
        date: new Date().toLocaleString(),
        pinned: false,
      };
      setNotes([newNote, ...notes]);
    }

    setInput("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setInput(note.text);
    setEditId(note.id);
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const filteredNotes = notes
    .filter((note) =>
      note.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className={darkMode ? "container dark" : "container"}>
      
      <div className="app-wrapper">

        <h1>📝 Smart Notes</h1>

        <div className="top-bar">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={() => setDarkMode(!darkMode)}>
            Toggle Theme
          </button>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Write your note..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={addOrUpdateNote}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <div key={note.id} className={`note ${note.pinned ? "pinned" : ""}`}>
              <p>{note.text}</p>
              <small>{note.date}</small>

              <div className="note-actions">
                <button onClick={() => togglePin(note.id)}>📌</button>
                <button onClick={() => editNote(note)}>✏</button>
                <button onClick={() => deleteNote(note.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}

        <footer className="footer">
          <p>
            Made with ❤️ by <span>Aman Srivastava</span>
          </p>

          <div className="footer-icons">
            <a
              href="www.linkedin.com/in/aman-srivastava-417913235/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/Aman31srivastava"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://lnkd.in/gmBPvzSr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe />
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;