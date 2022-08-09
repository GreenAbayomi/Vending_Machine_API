const {connect} = require('mongoose')

const launchDB = async()=>{
    await connect(process.env.DB_URI)
    console.log(`Database connected successfully...`);
}


module.exports = {
    launchDB
}