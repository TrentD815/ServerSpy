const express = require('express');
const router = express.Router();
const ftpClient = require('ftp');

class FTPClient {
	create(host, port, user, password) {
		this.config = { host, port, user, password };
		return new ftpClient();
	}
}

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
});

router.get('/pingFTP', (req, res) => {
  const data = req.query;
  try {
      const connector = new FTPClient();
      const client = connector.create(data.host, data.port, data.user, data.password);
      client.on('ready', () => {
        console.log("Connection to FTP successful")
        client.end();
        res.status(200).send();
      });
      client.connect(connector.config);
      client.on('error', (err) => {
        console.error("Error connecting to FTP server. Credentials may be incorrect.");
        res.status(400).send(err);
      });
  }
  catch (err){
    console.error("Error pinging FTP server: ", err)
    res.status(400).send(err)
  }
});
module.exports = router;