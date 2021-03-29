// ----------- Ping Functions ----------------
import ftpClient from 'ftp'

class FTPClient {
	create(host, port, user, password) {
		this.config = { host, port, user, password };
		return new ftpClient();
	}
}

async function PingSampleVison(props) {
  return await $.get({
    url: props.serverLink + "/is-sample-vision-api",
    crossDomain: true,
    dataType: "jsonp",
    statusCode: {
      200: () => {
        alert(props.serverName + " is online");
				return true
       },
      404: () => {
        alert(props.serverName + " is offline");
      },
    },
		success: () => { console.log("Successful")}
  })
}
function PingLIMS(props) {
  alert("pinging " + props.serverType)
  const data = {
    lims: props.lims,
    connectInfo: props.serverLink,
    connectID: props.connectionID,
    connectPassword: props.connectionPassword,
    databaseName: props.databaseName
  }
  console.log(data)
  //TODO: Ideally create an independent check for each lims that doesn't rely on Samplevision API backend
  //      Easiest for now: Hardcode an exact dev instance but could fail if instance is down
  //      Alternatively and slightly more robust: Write a function to see if any SampleVision instances are up and run check using that
  $.get({
      url: props.serverLink + "/testLimsConnection",
      data: data,
      statusCode: {
        200: () => { alert("server is online") },
        404: () => { alert("server is offline")}
      },
      complete: (response) => {

      }
  })
}

function PingFTP(props) {
    const host = props.serverLink
    const user = props.connectionID
    const password = props.connectionPassword
    const port = null

    try {
  			const connector = new FTPClient();

  			const client = connector.create(host, port, user, password);

        client.on('ready', (err) => {
          console.log("Connection to FTP successful")
          client.end();
        });
        client.connect(connector.config);
        client.on('error', (err) => { console.error("Error connecting to FTP server. Credentials may be incorrect.")});
    }
    catch (err){
      console.error(err)
    }

}
function PingEmail(props) {
  alert("pinging " + props.serverType)
  $.get({

  })
}

export {
  PingSampleVison,
  PingLIMS,
  PingFTP,
  PingEmail
}
