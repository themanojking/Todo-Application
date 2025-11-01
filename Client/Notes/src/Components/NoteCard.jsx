import React from 'react'
import { FaEdit , FaTrash } from "react-icons/fa"


const NoteCard = ({ n , onEdit, deleteNote }) => {
  return (
   <>
     <div className='bg-white p-4 rounded shadow'>
        <h2 className="text-xl font-bold">{n.title}</h2>
        <p>{n.description}</p>
        <div className='flex justify-end mt-2'>
            <button className='text-blue-500 mr-2' onClick={() => onEdit(n)}>
                <FaEdit />
            </button>
            <button className='text-red-500' onClick={() => deleteNote(n._id)}>
                <FaTrash />
            </button>
        </div>
     </div>
   </>
  )
}

export default NoteCard
