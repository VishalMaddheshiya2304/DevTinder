const express = require("express");

const connectDB = require("./config/Database");
const app = express();
const User=require("./models/user");
const user = require("./models/user");
app.use(express.json());

app.post("/signup",async (req,res)=>{
    const user =new User(req.body);
  try{
    await user.save();
    res.send("User Added successfully");
  }catch(err){
    res.status(400).send("Error saving the user:"+err.message);
  }

});

app.get("/user",async (req,res)=>{
  const UserEmail=req.body.emailID;
  try{
    const user = await User.find({emailID:UserEmail});
    res.send(user);
  }
  catch(err)
  {
    res.status(400).send("something went wrong");
  }

});

app.get("/feed",async (req,res)=>{
  try{
    const users=await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/user", async (req, res) => {
  const { userId, ...updateData } = req.body; 

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7000, () => {
      console.log("Hello server i m running in background");
    });
  })
  .catch((err) => {
    console.error("Database not be connectDB");
  });
