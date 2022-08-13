require('dotenv').config()
const express = require('express')
const app = express()
const { launchDB } = require('./Config/db')
const { notFound, errorHandler } = require('./Middleware/error.middleware')
const rootRouter = require('./Routes/index.route')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', rootRouter)


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