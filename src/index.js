import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'status-indicator/styles.css'
import Particles from './Particles'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import './index.css'
import { sortByDate, sortByAlphabetical, sortByStatus } from './sorting.js'
import { formatDate } from './formatDate.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Spinner } from 'react-bootstrap'
import SortableTableColumn from './sortableTable.js';

// Visually indicate either online or offline for server
const Online = (props) => {
	return <status-indicator active pulse positive></status-indicator>
}

const Offline = (props) => {
	return <status-indicator active pulse negative></status-indicator>
}

const Status = (props) => {
	const online = props.value
	if (online) {
		return <Online />
	} else {
		return <Offline />
	}
}

const PingServer = async (props) => {
	try {
		const serverName = props.serverName
		const serverURL = process.env.REACT_APP_SERVER_URL + '/servers/' + serverName
		const response = await fetch(serverURL)
		response?.status === 200
			? toast.success('Server online!', { theme: 'dark' })
			: toast.error('Server offline!', { theme: 'dark' })
		console.log(response)
	} catch (error) {
		console.log(error)
	}
}

const CheckStatusWithLoading = (props) => {
	const [loading, setLoading] = useState(false)
	const fetchData = async () => {
		try {
			setLoading(true)
			await PingServer(props.value)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setLoading(false)
		}
	}
	return (
		<div>
			<span onClick={fetchData}>{loading ? <Loading /> : <RefreshStatusButton />}</span>
		</div>
	)
}

// Button to manually check if a server is back online
const RefreshStatusButton = () => {
	return (
		<span>
			<Button variant="outline-light" size="sm" type="button">
				Check Status
			</Button>
			<ToastContainer />
		</span>
	)
}

// Altered button which has a spinner and loading text. Rendered while servers are being refreshed
const Loading = () => {
	return (
		<Button type="button" variant="outline-light" size="sm">
			<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Refreshing...
		</Button>
	)
}

class Server extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<tr>
				<td><Status value={this.props.online} /></td>
				<td>{this.props.serverName}</td>
				<td>{this.props.serverType}</td>
				<td>{this.props.serverLink}</td>
				<td><p>{(this.props.online) ? 'Currently Online' : formatDate(this.props.offlineSince)}</p></td>
				<td><p>{formatDate(this.props.lastChecked)}</p></td>
				<td><CheckStatusWithLoading value={this.props}/></td>
			</tr>
		)
	}
}

// Take server instances and put them into a table
class ServerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sortedData: this.props.Servers
		}
	}
	handleSort = sortedData => {
		this.setState({ sortedData });
	}

	render() {
		const { sortedData } = this.state;
		const rows = []
		this.props.Servers.forEach((server) => {
			//server.serverLink = 'https://[REDACTED].azurewebsites.net'
				rows.push(
				<Server
					online={server.online}
					serverType={server.serverType}
					serverName={server.serverName}
					serverLink={server.serverLink}
					offlineSince={server.offlineSince}
					lastChecked={server.lastChecked}
					port={server.port}
				/>
			)
		})
		return (
			<Table responsive striped bordered hover variant="dark" size="sm">
				<thead>
					<tr>
						<SortableTableColumn data={sortedData} columnName="online" onSort={this.handleSort} />
						<SortableTableColumn data={sortedData} columnName="serverName" onSort={this.handleSort} />
						<SortableTableColumn data={sortedData} columnName="serverType" onSort={this.handleSort}/>
						<SortableTableColumn data={sortedData} columnName="serverLink" onSort={this.handleSort}/>
						<SortableTableColumn data={sortedData} columnName="offlineSince" onSort={this.handleSort}/>
						<SortableTableColumn data={sortedData} columnName="lastChecked" onSort={this.handleSort}/>
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
		super(props)
		this.state = {
			Servers: this.props.Servers,
		}
		this.handleSorting = this.handleSorting.bind(this)
	}
	handleSorting(sortType) {
		let sorted = []
		switch (sortType) {
			case 'Status':
				sorted = sortByStatus(this.state.Servers)
        break
			case 'Name':
				sorted = sortByAlphabetical(this.state.Servers, 'Name')
				break
			case 'Type':
				sorted = sortByAlphabetical(this.state.Servers, 'Type')
				break
			case 'Link':
				sorted = sortByAlphabetical(this.state.Servers, 'Link')
				break
			case 'Offline Since':
				sorted = sortByDate(this.state.Servers, 'Offline Since')
				break
			case 'Last Checked':
				sorted = sortByDate(this.state.Servers, 'Last Checked')
				break
			default:
				sorted = this.state.Servers
		}

		this.setState({ Servers: sorted })
	}

	async componentDidMount() {
		try {
			const serverURL = process.env.REACT_APP_SERVER_URL + '/servers'
			console.log(serverURL)
			let response = await fetch(serverURL)
			const result = await response.json()
			this.setState({ isLoaded: true, Servers: result })
		} catch (error) {
			this.setState({ isLoaded: true, error })
		}
	}

	render() {
		return (
			<div id="AppContainer">
				<div id="ParticleContainer">
					<Particles />
				</div>
				<Row className="align-items-center">
					<Col xs={3}><h1>Server Spy</h1></Col>
					<Col xs={6}>
						<DropdownButton variant="Secondary" size="sm" id="dropdown-basic-button" title="Sort By">
							<Dropdown.Item onClick={() => this.handleSorting('Status')}>Status</Dropdown.Item>
							<Dropdown.Item onClick={() => this.handleSorting('Name')}>Server Name</Dropdown.Item>
							<Dropdown.Item onClick={() => this.handleSorting('Type')}>Server Type</Dropdown.Item>
							<Dropdown.Item onClick={() => this.handleSorting('Link')}>Server Link</Dropdown.Item>
							<Dropdown.Item onClick={() => this.handleSorting('Offline Since')}>Offline Since</Dropdown.Item>
							<Dropdown.Item onClick={() => this.handleSorting('Last Checked')}>Last Checked</Dropdown.Item>
						</DropdownButton>
					</Col>
					<Col style={{ display: 'flex', justifyContent: 'flex-end' }} xs={3}>
						<Button variant="Secondary" size="sm" id="dropdown-basic-button" title="Refresh All">
							Refresh All
						</Button>
					</Col>
				</Row>
				<div className="align-items-center">
					{' '}
					<ServerList sortType={this.state.sortType} Servers={this.state.Servers} />
				</div>
			</div>
		)
	}
}



const YourTable = ({ data }) => {
	return (
		<table>
			<thead>
			<tr>
				<SortableTableColumn data={data} columnName="Name" />
				<SortableTableColumn data={data} columnName="Age" />
				{/* Add more sortable columns as needed */}
			</tr>
			</thead>
			{/* Render table body */}
		</table>
	);
};

export default YourTable;

//Render all parts of the app
ReactDOM.render(<App Servers={[{}]} />, document.getElementById('root'))
