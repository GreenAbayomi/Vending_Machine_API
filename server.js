require('dotenv').config()
const express = require('express')
const app = express()
const { launchDB } = require('./Config/db')
const { notFound, errorHandler } = require('./Middleware/error.middleware')
const routes = require('./Routes/index.route')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(morgan("dev"));
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/', routes)


app.get('/api/v1', (req,res)=>{
    res.status(200).json({msg: `Welcome! You can use the Vending Machine API now`})
})


app.all('*', notFound)

app.use(errorHandler) 

const port = process.env.PORT 


const start = async()=>{
    try {
        
        await launchDB()
        app.listen(port, ()=>{
            console.log(`Server is running on http://localhost:${port}...`);
        })
    } catch (err) {
        console.log(`Error: ${err.message}`);

        
    }
}

start()