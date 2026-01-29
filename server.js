require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectToDB = require('./configs/db.config')
const employeeRouter = require('./routes/employees.router')

const app = express()
app.use(express.json())
app.use(cors())

// Connection To DB
connectToDB()

// test route
app.get("/", (req, res) => {
    res.send("This is a test route")
})

// employees routes
app.use("/employees", employeeRouter)

// handling undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`)
})