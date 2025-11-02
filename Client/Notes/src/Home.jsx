import React, { useEffect, useState } from "react";
import NoteModal from "./Components/NoteModel";
import Navbar from "./Components/Navbar";
import axios from "axios";
import NoteCard from "./Components/NoteCard";
import {toast} from  "react-toastify";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getnotes`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });
     
      setNotes(data.notes || []);
    } catch (error) {
      console.log(error);
      setNotes([]);
    }
  };

  const addNote = async (title, description) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/addnotes`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.success) {
        setShowModal(false);
      }
      if (result.data.message === "Note created successfully") {
        toast.success("note created");
        fetchNotes();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editNote = async (title, description) => {
    try {

      const result = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/updatenotes/${currentNote._id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.message === "Note updated successfully") {
        toast.success("note updated");
        fetchNotes();
        setShowModal(false);
        setCurrentNote(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/deletenotes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.success) {
       toast.success("note deleted");
        fetchNotes();
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Navbar setQuery={setQuery} />
        <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          { filteredNotes.length > 0 ? filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              n={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          )): <p>No notes</p>}
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setCurrentNote(null);
          }}
          className="fixed right-4 bottom-4 text-3xl bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full"
        >
          +
        </button>

        {showModal && (
          <NoteModal
            onClose={() => setShowModal(false)}
            addNote={addNote}
            currentNote={currentNote}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )}
      </div>
    </>
  );
}

export default Home;
