//Initial instantiation of all SampleVision Servers

const allServers = [
    {
      "online" : false,
      "serverType" : "SampleVision",
      "serverLink" : "https://dev.limswizards.com:8084",
      "serverName" : "Trent's Dev Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "port" : "8084"
    },
    {
      "online" : false,
      "serverType" : "SampleVision",
      "serverLink" : "https://dev.limswizards.com:8085",
      "serverName" : "Adam Bennett's Dev Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "port" : "8085"
    },
    {
      "online" : false,
      "serverType" : "SampleVision",
      "serverLink" : "https://dev.limswizards.com:8082",
      "serverName" : "Adam Tran's Dev Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "port" : "8082"
    },
    {
      "online" : false,
      "serverType" : "SampleVision",
      "serverLink" : "https://dev.limswizards.com:8083",
      "serverName" : "Nevine's Dev Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "port" : "8083"
    },
    {
      "online" : true,
      "serverType" : "SampleVision",
      "serverLink" : "https://demo.limswizards.com",
      "serverName" : "Demo Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "port" : ""
    },
    {
      "online" : false,
      "serverType" : "SampleVision",
      "serverLink" : "https://test.limswizards.com",
      "serverName" : "Test Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "port" : ""
    },
    {
      "online" : true,
      "serverType" : "LIMS",
      "serverLink" : "http://dev.limswizards.com:56104",
      "serverName" : "SampleManager Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "connectionID" : "system",
      "connectionPassword" : "manager",
      "databaseName" : "",
      "lims" : "SAMPLEMANAGER",
      "port" : "56104"
    },
    {
      "online" : true,
      "serverType" : "LIMS",
      "serverLink" : "http://52.170.251.82:8180/labvantage/rest",
      "serverName" : "Labvantage Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "connectionID" : "admin",
      "connectionPassword" : "admin",
      "databaseName" : "lvcustportal2",
      "lims" : "LABVANTAGE",
      "port" : ""
    },
    {
      "online" : true,
      "serverType" : "LIMS",
      "serverLink" : "dev.limswizards.com:8080/LabWare-702I/services",
      "serverName" : "Labware Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "connectionID" : "system",
      "connectionPassword" : "manager",
      "databaseName" : "LW7_Base",
      "lims" : "LABWARE",
      "port" : "8080"
    },
    {
      "online" : true,
      "serverType" : "LIMS",
      "serverLink" : "http://vpn.csolsinc.com:57003/STARLIMS11.STARLIMS.QualityMfg/REST_API.",
      "serverName" : "Starlims Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "connectionID" : "SV_INTERFACE",
      "connectionPassword" : "5Delaware!",
      "databaseName" : "SITE1",
      "lims" : "STARLIMS",
      "port" : "57003"
    },
    {
      "online" : false,
      "serverType" : "FTP",
      "serverLink" : "ftpcsols.eastus.cloudapp.azure.com",
      "serverName" : "FTP Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "connectionID" : "ftpuser",
      "connectionPassword" : "N3wFTPCr3ds!",
      "port" : ""
    },
    {
      "online" : false,
      "serverType" : "Email",
      "serverLink" : "smtp.gmail.com",
      "serverName" : "SMTP Email Server",
      "offlineSince" : "2024-03-30T00:00:00.000Z",
      "lastChecked" : "2024-03-30T00:00:00.000Z",
      "connectionID" : "developer@csolsinc.com",
      "connectionPassword" : "TBD",
      "port" : ""
    }
]
export default allServers
