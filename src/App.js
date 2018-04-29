import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Nav, NavItem} from 'react-bootstrap';
import MC from './components/mc/MC.jsx'
import './App.css'
import { LinkContainer } from 'react-router-bootstrap';

class App extends React.Component{
constructor(){
  super()
  this.state = {aKey: 1}
}
handleSelect=(eventKey)=> {
  // event.preventDefault();
  
  this.setState({aKey: eventKey})
}
render = () => (
  <Router>
    <div>
      <Nav bsStyle="tabs" activeKey={this.state.aKey} onSelect={k=>this.handleSelect(k)}>
      <LinkContainer to="/">
        <NavItem eventKey="1" href="/home">
          Edutor
        </NavItem>
     </LinkContainer>
        <LinkContainer to="/mc">
        <NavItem eventKey="2" title="Item">
        Multiple Choice
        </NavItem>
        </LinkContainer>
        <LinkContainer to="/topics">
        <NavItem  eventKey="3">
         Other Topics
        </NavItem>
        </LinkContainer>
      </Nav>

      <hr /> 

      <Route exact path="/" component={Edutor} />
      <Route path="/mc" component={MC} />
      <Route path="/topics" component={Topics} />
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



const Topics = ({ match }) => (
  <div className="component">
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div className="component">
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;
