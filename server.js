require('dotenv').config()
const express = require('express')
const app = express()
const { launchDB } = require('./Config/db')
const { notFound, errorHandler } = require('./Middleware/error.middleware')
const authRouter = require('./Routes/auth.route')
const userRouter = require('./Routes/users.route')
const { userRequired } = require('./Middleware/auth.middleware')
const { productRouter } = require('./Routes/products.route')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api/v1', (req,res)=>{
    res.status(200).json({msg: `Welcome! You can use the Vending Machine API now`})
})


app.use('/auth', authRouter)
app.use('/users', userRequired, userRouter)
app.use('/products', productRouter)



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