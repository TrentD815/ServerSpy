const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.status(200).send("Server Spy backend up and running");
});

router.get('/servers', async function(req, res) {
    try {
        const collection = req.collection
        const projection = { _id: 0, object: 0 }
        const servers = await collection.find({ object: 'server' }).project(projection).toArray() || []
        return res.status(200).send(servers)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get('/servers/:serverName', async function(req, res) {
    try {
        const serverName = req.params.serverName
        const collection = req.collection
        const projection = { _id: 0, object: 0 }
        let server = await collection.find({ object: 'server', serverName: serverName }).project(projection).toArray() || []
        server = server[0]
        const savedOnlineStatus = server.online
        if (!server) return res.status(404).send('Server name not found.')

        const pingResponse = await fetch(server.serverLink + '/live')
        server.online = (pingResponse?.status === 200)
        server.lastChecked = new Date()
        if (!server.online && (server.online !== savedOnlineStatus)) server.offlineSince = new Date()

        await collection.updateOne({ object: 'server', serverName: serverName }, { $set: server })
        return res.status(200).send(server)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})


module.exports = router;
