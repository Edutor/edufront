import React from "react";
import {Form} from 'react-bootstrap';
import CB from './CB';
import Q from './Q';
import './MC.css';
const url = 'http://localhost:8080/challenge/tag/';
// const url = 'http://localhost:4000/challenge/'
class MC extends React.Component{
    constructor(){
        super();
        this.state = {data: [], answers: []};
    }
    componentDidMount() {
        // const wholeUrl = url+this.state.tag;
        const wholeUrl = "http://localhost:4000/challenge/";
        console.log(wholeUrl);
        fetch(wholeUrl, {method: 'get'}).then(data=>{
            return data.json();
        }).then(data=>{
            // console.log(data);
            this.setState({data});
        });
      }

    handleSubmit = () => {
        console.log(this.state.answers);
    }

    collectAnswers = (obj) => {
        this.state.answers.push(obj);
        console.log('This is the collection of answers to send to the server: ',this.state.answers);
        // make a post request to ktor server here using fetch().
    }

    render(){
       return ( 
       <div className="component"       >
           <h2>Multiple Choice</h2>
           {
               this.state.data.map((q,inx)=>
                   <Q key={inx} q={q} getAnswers={this.collectAnswers}/>
               )
           }
           <button onClick={this.handleSubmit}>Submit</button>
        </div>)
    }
} 
export default MC;