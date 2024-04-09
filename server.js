// library to create the routes
const express=require("express")
// need path to find the file path
const path=require("path")
const { v4: uuidv4 } = require('uuid');

// need port to identify the server, Heroku will assign a port number, this is what the 'process.env.PORT' is for...the || statement is for when/if we run locally the port will be 3001
const PORT = process.env.PORT || 3001 

// to make sure the server is alive we need to create a listen, app and listen together we have a server


const app=express()

//app.use is the middleware, the functionality when we get data from the client, we come to the server and parse that data out so we can use it
app.use(express.json())
//extended:true means we want the exact data from teh original after parsing
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
const fs =require("fs")



//we need 2 types of routes html and api

//api routes


app.get("/api/notes", (req, res)=>{
    fs.readFile("./db/db.json", "utf8", (err, data)=> {
        const newData = JSON.parse(data)
        res.json(newData)
    })
})






app.post("/api/notes", (req, res)=> {
    const { title, text} = req.body
    
    if (title && text) {
        const newNote = {title, text, id: uuidv4()}

        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            if (err) {
                console.error(err)
                return res.status(500).json({error:"Error reading notes data"})
            }
            const notes = JSON.parse(data)
            notes.push(newNote)
            db=newNote
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => {
                if(err) {
                    console.err(err);
                    return res.status(500).json({error:'Error writing new note'});
                }
                res.json(db);
                console.info(`${req.method}request to add a new note was successful`)
            });
        });
    }else {
        res.status(400).json({error: "Please provide both a title and text for the note"})
    }
})


app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

//html routes
// app.get("*") is like a default path
app.get("*", (req, res)=>{
    //path.join it looks for that file path and once it finds it, it joins the file and the folder together. Here '_dirname' is the folder name
    res.sendFile(path.join(__dirname, './public/index.html'))
})




app.listen(PORT, () => {
    console.log("App is listening at PORT: http://localhost:" + PORT)
})







