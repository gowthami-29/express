import express from "express"
import fs from "fs"
const router = express.Router()
const readDB=()=>{
    return JSON.parse(fs.readFileSync("./db.json","utf-8"))
}
const writeDB=(data)=>{
    fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
}
router.post("/add",(req,res)=>{
    const db=readDB()
    const newTodo={id:Date.now(),...req.body}
    db.todos.push(newTodo)
    writeDB(db)
    res.status(201).json(newTodo)
})
router.get("/",(req,res)=>{
    const db=readDB()
    res.json(db.todos)
})
router.get("/:todoId",(req,res)=>{
    const db=readDB()
    const todo=db.todos.find((t)=>t.id===Number(req.params.todoId))
    todo?res.json(todo):res.status(404).json({message:"todo not found"})
})
router.put("/update/:todoId",(req,res)=>{
    const db=readDB()
    const index=db.todos.findIndex((t)=>t.id===Number(req.params.todoId))
    if(index===-1)
        return res.status(404).json({message:"todo not found"})
    db.todos[index]={...db.todos[index],...req.body};
    writeDB(db)
    res.json(db.todos[index]);
})
router.delete("/delete/:todoId",(req,res)=>{
    const db=readDB()
    const filteredtodos=db.todos.filter((t)=>t.id!==Number(req.params.todoId))
    if(filteredtodos.length===db.todos.length)
        return res.status(404).json({message:"todo not found"})
    db.todos =filteredtodos;
    writeDB(db)
    res.json({message:"todo deleted"})
})
export default router;