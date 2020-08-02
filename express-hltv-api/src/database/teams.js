const { getDatabase } = require('./mongo')
const { ObjectID } = require('mongodb')
const { HLTV } = require('hltv')

const collectionName = 'teams';

async function insertTeam(team) {
    const database = await getDatabase()
    const { insertedId } = await database.collection(collectionName).insertOne(team);
    return insertedId;
}

async function getTeams() {
    const database = await getDatabase()
    return await database.collection(collectionName).find({}).toArray()
}

async function deleteTeam(id) {
    const database = await getDatabase()
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id)
    })
}

async function updateTeam(id, team) {
    const database = await getDatabase()
    delete team._id;
    await database.collection(collectionName).update(
        {
            _id: new ObjectID(id),
        },
        {
            $set: {
                ...team
            }
        }
    )
}

async function getTeamById(id) {
    const {name, recentResults} = await HLTV.getTeam({id: id});
    return {name, recentResults};
}

module.exports = {
    insertTeam,
    getTeams,
    deleteTeam, 
    updateTeam,
    getTeamById
}