import express from "express"
import "dotenv/config"
import mongoose from "mongoose"

const port = (process.env.PORT)
// connect to database with using env file 
mongoose.connect(process.env.MONGO_URL)

const TeacherSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    age: { type: Number },
    email: { type: String, unique: true },
    address: { type: String },
    phone: { type: Number, unique: true }
})
//database model
const Teacher = mongoose.model("Teacher", TeacherSchema)


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extends: true }))

app.get("/", async (req, res) => {
    const allTeachers = await Teacher.find({})
    res.send(allTeachers)
})
app.post("/", async (req, res) => {
    const newData = req.body
    const newTeacher = new Teacher(newData);
    await newTeacher.save()
    res.status(201).send({ messege: "successfully created Teacher", newteacher: newTeacher })
})

app.listen(port, () => {
    console.log("Server stared at port" + port);

})

