import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./routes/router.mjs";
import dotenv from "dotenv"

dotenv.config();

const corsOptions = {
    origin: process.env.APPLICATION_URL,
    methods: `GET,POST,PUT,DELETE`
}
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(routers);
const PORT = 5000;


mongoose.connect(process.env.MONGODB_URI ,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log(`Error: ${err}`));

app.get("/", (req,res) => {
   res.send({msg: "Root"});
});




app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});