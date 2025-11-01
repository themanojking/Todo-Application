import jwt from "jsonwebtoken";
import User from "../mongo/User.mjs";

const middlewareCondition = async (req,res,next) => {
    try {
         const token = req.headers.authorization?.split(' ')[1];
         if(!token) {
            return res.status(401).json({success: false, message: "Unauthorized"});
         }
         const decoded = jwt.verify(token, "secretkeyofnotesapp@#");
         if(!decoded) {
            return res.status(401).json({success: false, message: "Wrong token"});
         }
         const user = await User.findById(decoded.id);
         if(!user) {
            return res.status(401).json({success: false, message: "No User"});
         }
         const newUser = { name: user.username, id: user._id};
         req.user = newUser;
         next();
    } catch (error) {
        return res.status(500).json({success: false, message: "Please Login"});
    }
}

export default middlewareCondition;