import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./routes/router.mjs";
import dotenv from "dotenv"

dotenv.config();

const corsOptions = {
    origin: [ "http://localhost:5173", "https://todo-client-tan-theta.vercel.app" ],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}

mongoose.connect(process.env.MONGODB_URI ,{
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log(`Error: ${err}`));

const app = express();
app.use(cors(corsOptions));
app.options(/.*/,cors(corsOptions));
app.use(express.json());
app.use(routers);
const PORT = 5000;




app.get("/", (req,res) => {
   res.send({msg: "Root"});
});




app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});


export default app;