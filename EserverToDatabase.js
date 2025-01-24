import express from"express";
import "dotenv/config";
import mongoose from "mongoose"


//database connection 
mongoose.connect(process.env.MONGO_URL)


const port = process.env.PORT;
// schema 
const studentSchema=new mongoose.Schema({
    id:{type:Number , unique:true},
    name:{type:String},
    age:{type:Number},
    phone:{type:Number , unique:true},
    email:{type:String, unique:true},
    address:{type:String},
    class:{type:String},
})
//model
const Student =mongoose.model("Student",studentSchema)

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",async(req,res)=>{
    const students = await Student.find({})
    res.send(students)
})

app.post("/" ,async(req,res)=>{
//    console.log(req.body);
  const newData = req.body;
  const newStudent = new Student(newData)
  await newStudent.save()
   res.status(201).send({massege:"newStudent Added", newStudent:newStudent})  
})
 
app.delete("/:id",async(req,res)=>{
    const idDelete = Number(req.params.id)
    // const filterData =data.filter((item)=>id!==item.id)
    // res.send(filterData)
   const deletedStudent=await Student.findOneAndDelete({id:idDelete })
   if(!deletedStudent){
  res.send({messege:"student not found"})
   }
  res.status(200).send({messege:"stdents Deleted",deletedStudent:deletedStudent})

})

// app.put("/:id",(req,res)=>{
//     const edit =req.params.id
//     if(!edit || isNaN(edit)){
//         res.send("404 error of url")
//     }
//     const body =req.body
//     const updateData = data.map((item)=>{
//         return  item.id===Number(edit)?body:item
//     })
//    res.send(updateData)
// })

app.listen(port,()=>{
    console.log("Server stared at port"+port);
    
})