import express from "express";

//connect port with env file 
import "dotenv/config"
 const port = process.env.PORT 
 
 // connect mongoose with mongoose.connect with envfile
import mongoose from "mongoose";
  mongoose.connect(process.env.MONGO_URL)

  // create schema to show data which formet 

  const friendSchema = new mongoose.Schema ({
      id:{type:"Number", unique:true},
      name:{type:"String"},
      lastName:{type:"String"},
      phone:{type:"Number", unique:true},
      addresh:{type:"String"},
      age:{type:"Number"},
      email:{type:"String", unique:true},
  })
  // connect to database as like formet 
  const Friend = mongoose.model("Friend",friendSchema)

  const app =express()
  app.use(express.json());
  app.use(express.urlencoded({extended:true}))


  app.get("/",async(req,res)=>{
    const friends = await Friend.find({})
    res.send(friends)
  })

  app.post("/",async(req,res)=>{
    const database= req.body;
    const newFriend = new Friend(data) 
    await newFriend.save(
        res.status().save({messege:"messege", newFriend:newFriend})
    )
  })

  app.listen(port, ()=>{
     console.log("server is on to port "+port)
  })

  