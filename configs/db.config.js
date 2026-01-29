const mongoose = require('mongoose')
require('dotenv').config()

const connectToDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in environment variables")
            return
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
        console.error("Full error:", error)
    }
}

module.exports = connectToDB