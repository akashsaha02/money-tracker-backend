const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction.model');

require('dotenv').config();
app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('Hello from Express! hola');
});

app.post('/api/transactions', async (req, res) => {
    console.log(process.env.MONGO_URL)

    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log(err)
    });
    const { name, price, date, description } = req.body;
    const transaction = await Transaction.create({ name, price, date, description });
    res.json(transaction);
})

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log(err)
    });
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.delete('/api/transactions/:id', async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/transactions/:id', async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const { id } = req.params;
        const { name, price, date, description } = req.body;
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, { name, price, date, description }, { new: true });
        res.json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(3000, () => {
    console.log('Server is running ');
});

