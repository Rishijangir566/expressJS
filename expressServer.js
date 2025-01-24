import express from"express";
import "dotenv/config";
import mongoose from "mongoose"


//database connection 
mongoose.connect(process.env.MONGO_URL)

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT;

const data =[
    {id:1, name:"rishi"},
    {id:2, name:"shikhar"},
    {id:3, name:"ranveer"},
    {id:4, name:"harry"},
]

app.get("/",(req,res)=>{
    res.send(data)
})

app.post("/" ,(req,res)=>{
//    console.log(req.body);
  const newData = req.body;
   data.push(newData)
   res.status(201).send(data)  
})

app.delete("/:id",(req,res)=>{
    const id = Number(req.params.id)
    const filterData =data.filter((item)=>id!==item.id)
    res.send(filterData)
})

app.put("/:id",(req,res)=>{
    const edit =req.params.id
    if(!edit || isNaN(edit)){
        res.send("404 error of url")
    }
    const body =req.body
    const updateData = data.map((item)=>{
        return  item.id===Number(edit)?body:item
    })
   res.send(updateData)
})

app.listen(port,()=>{
    console.log("Server stared at port"+port);
    
})