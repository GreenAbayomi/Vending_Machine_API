const {connect} = require('mongoose');


const launchDB = async()=>{
    try {
        await connect(process.env.DB_URI)
        console.log(`Database connected successfully...`);
        
    } catch (error) {
        //throw error
        console.log(error)
    }
}


module.exports = {
    launchDB
}