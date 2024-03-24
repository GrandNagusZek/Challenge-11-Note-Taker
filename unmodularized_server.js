// library to create the routes
const express=require("express")
// need path to find the file path
const path=require("path")
// need port to identify the server, Heroku will assign a port number, this is what the 'process.env.PORT' is for...the || statement is for when/if we run locally the port will be 3001
const PORT = process.env.PORT || 3001 

// to make sure the server is alive we need to create a listen, app and listen together we have a server


const app=express()

//app.use is the middleware, the functionality when we get data from the client, we come to the server and parse that data out so we can use it
app.use(express.json())
//extended:true means we want the exact data from teh original after parsing
app.use(express.urlencoded({extended:true}))


//we need 2 types of routes html and api

//api routes




//html routes
// app.get("*") is like a default path
app.get("*", (req, res)=>{
    //path.join it looks for that file path and once it finds it, it joins the file and the folder together. Here '_dirname' is the folder name
    res.sendFile(path.join(__dirname, './public/index/html'))
})


app.use("/notes" , ()=>{
    //res is the response, 'sendFile' is the response that you want to send back to the browser
    res.sendFile(err=>{
        //path.join is a way to combine 2 paths together
        path.join(__dirname , "./notes.html" ) 
    })
})






app.listen(PORT, () => {
    console.log("App is listening at PORT: http://localhost:3001/" + PORT)
})







