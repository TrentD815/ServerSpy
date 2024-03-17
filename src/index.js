import React from 'react';
import ReactDOM from 'react-dom';
import 'status-indicator/styles.css'
import Particles from "./Particles";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import './index.css';
import allServers from './servers.js'
import {sortByDate, sortByAlphabetical, sortByStatus} from './sorting.js'
import {PingSampleVison, PingLIMS, PingFTP, PingEmail} from './ping.js'

// Visually indicate either online or offline for server
const Online = (props) => {
    return <status-indicator active pulse positive></status-indicator>
}
const Offline = (props) => {
    return <status-indicator active pulse negative></status-indicator>
}
const Status = (props) => {
    const online = props.value;
    if (online) {
        return <Online/>
    }
    else {
        return <Offline/>
    }
}

const PingServer = async (props) => {
    const serverType = props.serverType;
    switch (serverType) {
      case "SampleVision":
          try {
              const result = await PingSampleVison(props);
              console.log(result)
          }
          catch(err) {
            console.log('Unable to get status of server: ' ,err.status)
            console.log(err)
          }
          break;
      case "LIMS":
          PingLIMS(props); break;
      case "FTP":
          PingFTP(props); break;
      case "Email":
          PingEmail(props); break;
    }
}

// Button to manually check if a server is back online
const RefreshStatusButton = (props) => {
    // Normal
    return (
        <Button variant="outline-light" size="sm" type="button"
            onClick={async () => {
              const status = await PingServer(props.value)
            console.log(status)}}>
            Check Status
        </Button>
    )
    // While refreshing
    // return (
    //     <Button type="button" variant="outline-light" size="sm">
    //         <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    //         Refreshing...
    //     </Button>
    // )
}

// How long the server has been down for
const OfflineSince = (props) => {
    const offlineSince = props.value;
    return <p>{offlineSince}</p>
}

// Time since the server was last refreshed to check online status
const LastChecked = (props) => {
    const lastChecked = props.value;
    return <p>{lastChecked}</p>
}

class Server extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <tr>
                <td><Status value={this.props.online}/></td>
                <td>{this.props.serverName}</td>
                <td>{this.props.serverType}</td>
                <td>{this.props.serverLink}</td>
                <td><OfflineSince value={this.props.offlineSince}/></td>
                <td><LastChecked value={this.props.lastChecked}/></td>
                <td><RefreshStatusButton value={this.props}/></td>
            </tr>
        )
    }
}


// Take server instances and put them into a table
class ServerList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const rows = [];
    this.props.Servers.forEach((server, i) => {
      rows.push(
        <Server
          online={server.online}
          serverType={server.serverType}
          serverName={server.serverName}
          serverLink={server.serverLink}
          offlineSince={server.offlineSince}
          lastChecked={server.lastChecked}
          lims={server.lims}
          connectionID={server.connectionID}
          connectionPassword={server.connectionPassword}
          databaseName={server.databaseName}
          port={server.port}
        />
      );
    });

    return (
        <Table responsive striped bordered hover variant="dark" size="sm">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Server Name</th>
                    <th>Server Type</th>
                    <th>Server Link</th>
                    <th>Offline Since</th>
                    <th>Last Checked</th>
                    <th>Refresh</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
  }
}

// Background, Title, Sorting and Table
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Servers: this.props.Servers
    }
    this.handleSorting = this.handleSorting.bind(this);
  }
  handleSorting(sortType) {
    let sorted = [];
    switch (sortType) {
      case "Status":
        sorted = sortByStatus(this.state.Servers); break;
      case "Name":
        sorted = sortByAlphabetical(this.state.Servers, "Name"); break;
      case "Type":
        sorted = sortByAlphabetical(this.state.Servers, "Type"); break;
      case "Link":
        sorted = sortByAlphabetical(this.state.Servers, "Link"); break;
      case "Offline Since":
        sorted = sortByDate(this.state.Servers, "Offline Since"); break;
      case "Last Checked":
        sorted = sortByDate(this.state.Servers, "Last Checked"); break;
      default:
        sorted = this.state.Servers
    }

    this.setState({
        Servers: sorted
    })
  }
  render() {
    return (
        <div id="AppContainer">
            <div id="ParticleContainer">
                <Particles/>
            </div>
            <Row className="align-items-center">
              <Col xs={3}><h1>Server Spy</h1></Col>
              <Col xs={9}>
                  <DropdownButton variant='Secondary' size="sm" id="dropdown-basic-button" title="Sort By">
                      <Dropdown.Item onClick={() => this.handleSorting("Status")}>Status</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSorting("Name")}>Server Name</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSorting("Type")}>Server Type</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSorting("Link")}>Server Link</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSorting("Offline Since")}>Offline Since</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.handleSorting("Last Checked")}>Last Checked</Dropdown.Item>
                  </DropdownButton>
              </Col>
            </Row>
            <div className="align-items-center"> <ServerList sortType={this.state.sortType} Servers={this.state.Servers}/></div>
        </div>
    );
  }
}
//Render all parts of the app
ReactDOM.render(<App Servers={allServers}/>, document.getElementById('root'));
