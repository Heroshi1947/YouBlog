const mongoose = require('mongoose')
const colors  = require('colors')

const connectDB  = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to MongoDb `.bgBlue.white)
    } catch (error) {
        console.log(`MongoDb connection error ${error}`.bgRed.white)
    }
}


module.exports = connectDB ;