// library to create the routes
const express=require("express")
// need path to find the file path
const path=require("path")
// need port to identify the server, Heroku will assign a port number, this is what the 'process.env.PORT' is for...the || statement is for when/if we run locally the port will be 3001
const PORT = process.env.PORT || 3001 

// to make sure the server is alive we need to create a listen, app and listen together we have a server


const app=express()








app.listen(PORT, () => {
    console.log("App is listening at PORT: http://localhost:3001/" + PORT)
})







