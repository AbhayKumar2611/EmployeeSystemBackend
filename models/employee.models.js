const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    department: {type:String, required: true},
    role: {type: String, required: true},
    status: {type: String, enum: ["Active", "On Leave", "Resigned"], default: "Active"},
    lifecycle: [
        {
            eventType: {type: String, required: true},
            description: {type: String},
            effectiveDate: {type: Date, required: true},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    createAt: {type: Date, default: Date.now}
})

const employeeModel = new mongoose.model("Employees", employeeSchema)

module.exports = employeeModel