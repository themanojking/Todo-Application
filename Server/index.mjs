import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./routes/router.mjs";

const corsOptions = {
    origin: process.env.APPLICATION_URL,
    methods: `GET,POST,PUT,DELETE`
}
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(routers);
const PORT = 5000;


mongoose.connect(process.env.MANGODB_URL)
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log(`Error: ${err}`));

app.get("/", (req,res) => {
   res.send({msg: "Root"});
});




app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});