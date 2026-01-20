import express from "express"
import usersRouter from "./users.routes.js"
import todosRouter from "./todos.routes.js"
const apps=express()
apps.use(express.json())
apps.use("/users",usersRouter)
apps.use("/todos",todosRouter)
apps.listen(3000,(req,res)=>{
    console.log('server is running on http://localhost:3000')
})