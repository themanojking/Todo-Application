import React, { useEffect, useState } from "react";


function NoteModal({ onClose, addNote,currentNote ,editNote, }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
     if(currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
     }
  }, [currentNote]);

  const handleSubmit = async (e) => {
     e.preventDefault();
     if(currentNote) {
        await editNote(  title, description);
     } else {
         await addNote(title,description);
     }
     
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    // Reset form and close modal
    setTitle("");
    setDescription("");
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4"
      onClick={onClose} // close modal when background clicked
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <h2 className="text-2xl font-bold mb-4 text-[#231F34] text-center">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="border border-gray-300 p-2 w-full mb-4 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note description"
            rows="4"
            className="border border-gray-300 p-2 w-full mb-4 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#231F34] text-white rounded-md hover:bg-[#2C2840] transition"
            >
              {currentNote ? "Update Note" : "Add New Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
