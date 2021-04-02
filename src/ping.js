// ----------- Ping Functions ----------------

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
      complete: () => {

      }
  })
}

function PingFTP(props) {
    const host = props.serverLink
    const user = props.connectionID
    const password = props.connectionPassword
    const port = null
		const data = {host, user, password, port}

		$.get({
			url: "http://localhost:4000/pingFTP",
			data : data,
			statusCode: {
        200: () => { alert("FTP server is online")},
        400: () => { alert("FTP server is offline")},
      },
			complete: () => { console.log("Done pinging")}
		})
}
function PingEmail(props) {
  alert("pinging " + props.serverType)
  $.get({
			url: props.serverLink + "/is-sample-vision-api",
  })
}

export {
  PingSampleVison,
  PingLIMS,
  PingFTP,
  PingEmail
}
