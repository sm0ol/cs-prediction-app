//DEPENDENCIES

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

// Custom requires
const { startDatabase } = require('./database/mongo')
const { insertTeam, getTeams, updateTeam, deleteTeam, getTeamById } = require('./database/teams')

// Define the express app
const app = express();

app.use(helmet())

app.use(bodyParser.json())

app.use(cors())

app.use(morgan('combined'))

app.get('/', async (req, res) => {
    res.send(await getTeams());
})

app.post('/', async (req, res) => {
    const newTeam = req.body;
    await insertTeam(newTeam);
    res.send({ message: 'New team inserted.' });
})

app.delete('/:id', async (req, res) => {
    await deleteTeam(req.params.id);
    res.send({ message: 'Team removed.' });
})

app.put('/:id', async (req, res) => {
    const updatedTeam = req.body;
    await updateTeam(req.params.id, updatedTeam);
    res.send({ message: 'Team updated.' })
})

app.get('/team/:id', async (req, res) => {
    let team = await getTeamById(req.params.id);
    res.send(team);
})

startDatabase().then(async () => {
    app.listen(3001, () => {
        console.log("Listening on port 3001");
    })
})