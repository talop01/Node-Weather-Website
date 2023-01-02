// Module : Import
const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// Express => function
const app = express()

// heroku : stores the port provided by heroku.
const port = process.env.PORT || 3000

// Defining path for Express config
const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// //Setup hadlebars engine and views location
// Dynamic website
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirPath))

// Response : URL request {root : /}
app.get('',(req,res) => {
    res.render('index',{
        title:"Weather App",
        name:"Andrew"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title:"About me",
        name:"Talop"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        message:"Help.....",
        title:"Help",
        name:"talop"
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide a address."
        })
    }
    
    const address = req.query.address
    geocode(address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error:error});
        }
    
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error:error});
            }
            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get("/products",(req,res) => {
    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        product:[]
    })
})

app.get("/help/*",(req,res) => {
    res.render("404",{
        errorMessage:"Help article not found",
        title:"404",
        name:"Talop"
    })
})

// 404 page
app.get('*',(req,res) => {
    res.render("404",{
        errorMessage:"Page not found.",
        title:"404",
        name:"Talop"
    })
})



// Server : Start
app.listen(port, () => {
    console.log("Server is up on port " + port)
})

module.exports = app;