const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const TransactionModel = model('Transaction', TransactionSchema)
module.exports = TransactionModel