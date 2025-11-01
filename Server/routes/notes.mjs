import { Router } from "express";
import Note from "../mongo/Note.mjs";
import middlewareCondition from "../middleware/middlewareCondition.mjs";

const router = Router();

router.post("/addnotes", middlewareCondition, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (err) {
    console.log("Error saving user: ", err);
    res.status(500).json({ message: "Error in adding note!" });
  }
});

router.get("/getnotes", middlewareCondition, async (req,res)=> {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({success: true, notes});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "cannot retrive the notes"});
  }
});


router.put("/updatenotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, updateNote ,message: "Note updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "cannot update the notes" });
  }
});

router.delete("/deletenotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deleteNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "cannot delete the notes" });
  }
});


export default router;
