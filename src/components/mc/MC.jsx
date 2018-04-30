import React from "react";
import {Form} from 'react-bootstrap';
import Select from 'react-select';
import Q from './Q';
import './MC.css';
const challengeUrl = 'http://localhost:8080/challenge/tag/';
const tagUrl = 'http://localhost:8080/tag/';
const postUrl = 'http://localhost:8080/challenge/submit/';
const demoUrl = 'http://localhost:8080/postdemo/';
// const url = 'http://localhost:4000/challenge/'

class MC extends React.Component{
    constructor(){
        super();
        this.state = {
            questions: [],
            answers: [],
            tags: [],
            selectedTag: '',
        };
    }
    handleSelect = (selectedTag) => {
        this.setState({ selectedTag: selectedTag.value});
        fetch(challengeUrl+selectedTag.value, {method: 'get'}).then(data=>{
            return data.json();
        }).then(questions=>{
            this.setState({questions});
        });
    }

    componentDidMount() {

        fetch(tagUrl, {method: 'get'}).then(
            data=>{return data.json(); }
        ).then(data=>{
            this.setState({tags: data})
        });
      }

    handleSubmit = () => {
        console.log(this.state.answers);

        var data = new FormData();
        const answers = this.state.answers;
        answers.forEach((a)=>data.append(a.q, JSON.stringify(a)));

        fetch(demoUrl,
            {
                method: "POST",
                body: data
            })
            // .then(function(res){ return res.json(); })
            // .then(function(data){ alert( JSON.stringify( data ) ) })
    }

    collectAnswers = (obj) => {
        this.state.answers.push(obj);
    }

    render(){
        // const { selectedOption } = this.state;
       return ( 
       <div className="component">
           <Select
               name="tags"
               onChange={this.handleSelect}
               options={this.state.tags.map(tag=>{return {value: tag, label: tag}; })}/>

           <h2>Multiple Choice</h2>
           {
               this.state.questions.map((q, inx)=>
                   <Q key={inx} q={q} getAnswers={this.collectAnswers}/>
               )
           }
           <button onClick={this.handleSubmit}>Submit</button>
        </div>)
    }
} 
export default MC;