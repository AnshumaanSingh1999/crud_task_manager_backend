import express from "express";
import mysql from "mysql";
import cors from "cors";


const app=express()
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
    host:"Localhost",
    password:"",
    user:"root",
    database:"crud_task_manager"
})

app.get("/", (req,res)=>{
    res.json("API is LIVE!")
})



app.post("/addtask",(req,res)=>{
    const q="insert into table_tasks (task, status) values (?)"
    const value=[
        req.body.task=String(req.body.task),
        req.body.status=String(req.body.status),
    ]
    db.query(q,[value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Added")
        }
    })
})


app.post("/updatetask",(req,res)=>{
    const q="update table_tasks set task=?, status=? where  taskid=?"
    const value=[
        req.body.task=String(req.body.task),
        req.body.status=String(req.body.status),
        req.body.taskid=String(req.body.taskid),
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Updated")
        }
    })
})


app.post("/deletetask",(req,res)=>{
    const q="delete from table_tasks where taskid=?"
    const value=[
        req.body.taskid=String(req.body.taskid),
    ]
    db.query(q,[...value],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Deleted")
        }
    })
})


app.get("/deletetaskg/:id",(req,res)=>{
    const taskid=req.params.id
    const q="delete from table_tasks where taskid=?"
    db.query(q,[taskid],(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json("Task Deleted")
        }
    })
})


app.get("/tasks",(req,res)=>{
    const q="select * from table_tasks"
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err)
        }
        else if(data){
            return res.json(data)
        }
    })
})


app.listen(8800,()=>{
    console.log("Port has been set to localhost:8800")
})