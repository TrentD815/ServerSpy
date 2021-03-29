// ----------- Sorting Functions ----------------

// Sort servers by their online status field
const sortByStatus = (servers) => {
  let sortedServers = [];
  for (let i = 0; i < servers.length; i++) {
    let online = servers[i].online;
    if (online) {
      sortedServers.unshift(servers[i]);
    }
    else {
      sortedServers.push(servers[i]);
    }
  }
  return sortedServers;
}

// Sort servers by various text fields
const sortByAlphabetical = (servers, column) => {
  if (column === "Name") {
    servers.sort((a, b) => {
      var textA = a.serverName.toLowerCase();
      var textB = b.serverName.toLowerCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
  else if (column === "Type") {
    servers.sort((a, b) => {
      var textA = a.serverType.toLowerCase();
      var textB = b.serverType.toLowerCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
  else if (column === "Link"){
    servers.sort((a, b) => {
      var textA = a.serverLink.toLowerCase();
      var textB = b.serverLink.toLowerCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
  else {
    console.log("Unable to sort")
  }
  return servers;
}

// Sort servers by various date fields
const sortByDate = (servers, column) => {
  if (column === "Offline Since") {
    servers.sort((a, b) => {
      var dateA = new Date(a.offlineSince).getTime();
      var dateB = new Date(b.offlineSince).getTime();
      return dateA > dateB ? 1 : -1;
    });
  }
  else if (column === "Last Checked") {
    servers.sort((a, b) => {
      var dateA = new Date(a.lastChecked).getTime();
      var dateB = new Date(b.lastChecked).getTime();
      return dateA > dateB ? 1 : -1;
    });
  }
  else {
    console.log("Unable to sort")
  }
  return servers;
}

export {
  sortByDate,
  sortByAlphabetical,
  sortByStatus
}
