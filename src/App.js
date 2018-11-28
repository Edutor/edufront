import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Nav, NavItem } from 'react-bootstrap';
import MC from './components/mc/MC';
import WebChecker from './components/webchecker/WebChecker';
import Admin from './components/admin/Admin';
import Collection from './components/collection/Collection';
import './App.css';
import { LinkContainer } from 'react-router-bootstrap';

class App extends React.Component {
	constructor() {
		super()
		this.state = { aKey: 3 }
	}
	handleSelect = (eventKey) => {
		// event.preventDefault();
		// alert(eventKey)
		this.setState({ aKey: eventKey })
	}
	render = () => (
		<Router>
			<div>
				<Nav bsStyle="tabs" activeKey={this.state.aKey} onSelect={k => this.handleSelect(k)}>
					<LinkContainer to="/edutor">
						<NavItem eventKey="4" href="/">
							Edutor
            			</NavItem>
					</LinkContainer>
					<LinkContainer to="/mc">
						<NavItem eventKey="2" title="Item">
							Multiple Choice
        				</NavItem>
					</LinkContainer>
					<LinkContainer to="/webchecker">
						<NavItem eventKey="3" title="Item">
							WebChecker
        				</NavItem>
					</LinkContainer>
					<LinkContainer to="/admin">
						<NavItem eventKey="4">
							Admin
        				</NavItem>
					</LinkContainer>
					<LinkContainer to="/collection">
						<NavItem eventKey="5">
							Collection
        				</NavItem>
					</LinkContainer>
				</Nav>

				<hr />

				<Route exact path="/" component={() => <div>Application front page</div>} />
				<Route path="/edutor" component={Edutor} />
				<Route path="/mc" component={MC} />
				<Route path="/webchecker" component={WebChecker} />
				<Route path="/admin" component={Admin} />
				<Route path="/collection" component={Collection} />
			</div>
		</Router>
	)
}

const Edutor = () => (
	<div className="component">
		<h2>Edutor</h2>
		<div>This site is for different auto feedback services. The purpose is to give students access to assignments with which they can get immidiate feedback on their work.</div>
	</div>
);

export default App;