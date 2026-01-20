import express from "express"
import fs from "fs"
const router =express.Router()
const readDB=()=>{
    return JSON.parse(fs.readFileSync("./db.json","utf-8"))
}
const writeDB=(data)=>{
    fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
}
router.post("/add",(req,res)=>{
    const db=readDB()
    const newUser={id:Date.now(),...req.body};
    db.users.push(newUser)
    writeDB(db)
    res.status(201).json(newUser)
})
router.get("/",(req,res)=>{
    const db=readDB()
    res.json(db.users)
})
router.get("/:userId",(req,res)=>{
    const db=readDB()
    const user=db.users.find((u)=>u.id===Number(req.params.userId))
    user ? res.json(user):res.status(404).json({message:"user not found"})
})
router.put("/update/:userId",(req,res)=>{
    const db=readDB()
    const index=db.users.findIndex((u)=>u.id===Number(req.params.userId))
    if(index===-1)
        return res.status(404).json({message:"user not found"})
    db.users[index]={...db.users[index],...req.body}
    writeDB(db)
    res.json(db.users[index])
})
router.delete("/delete/:userId",(req,res)=>{
    const db=readDB()
    const filteredUsers=db.users.filter((u)=>u.id!== Number(req.params.userId))
    if(filteredUsers.length===db.users.length)
        return res.status(404).json({message:"user not found"})
    db.users=filteredUsers;
    writeDB(db)
    res.json({message:"user deleted"})
})
export default router;