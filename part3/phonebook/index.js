const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '';
})

app.use(morgan('method: :url :status :res[content-length] - :response-time ms :postData'))
app.use(express.json())

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    console.log('GET /api/persons');
    res.send(JSON.stringify(phonebook))
});

app.get('/info', (req, res) => {
    const numberOfEntries = phonebook.length;
    const currentDate = new Date().toString();

    const infoText = `Phonebook has info for ${numberOfEntries} people<br/> ${currentDate}`
    res.send(infoText)
});

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(`GET /api/persons/${id}`);
    const person = phonebook.find(entry => entry.id === id)
    if (person) {
        res.json(person);
    } else {
        res.status(400).json({ error: 'person not found' })
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = phonebook.findIndex(entry => entry.id === id);
    if (index !== -1) {
        phonebook.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'person not found' })
    }
});

app.post('/api/persons/', (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'name and number are required' })
    }
    if (phonebook.some(entry => entry.name === name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const maxId = Math.max(...phonebook.map(entry => entry.id));

    const newEntry = {
        id: maxId + 1,
        name, number
    };

    phonebook.push(newEntry);
    res.status(201).json(newEntry)

})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})