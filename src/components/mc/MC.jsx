import React from "react";
import {Form} from 'react-bootstrap'
import './MC.css'
const url = 'http://localhost:8080/challenge/tag/'
class MC extends React.Component{
    constructor(){
        super()
        this.state = {data: null, tag:'Math'}
    }
    componentDidMount() {
        const wholeUrl = url+this.state.tag;
        // const wholeUrl = "https://api.chucknorris.io/jokes/random";
        console.log(wholeUrl);
        fetch(wholeUrl, {method: 'get'}).then(data=>{
            return data;
        }).then(data=>{
            console.log(data);
        });
      }

    render(){
       return ( 
       <div className="component"       >
            <h2>Multiple Choice</h2>
        </div>)
    }
} 
export default MC;