import React from "react";
import Select from 'react-select';
import Q from './Q';
import './MC.css';
const challengeUrl = 'http://localhost:8080/challenge/tag/';
const tagUrl = 'http://localhost:8080/tag/';
// const postUrl = 'http://localhost:8080/challenge/submit/';
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
    };

    componentDidMount = () => {
        fetch(tagUrl, {method: 'get'}).then(
            data=>{return data.json(); }
        ).then(data=>{
            this.setState({tags: data})
        });
      };

    handleSubmit = () => {
        console.log(this.state.answers);

        const data = new FormData();
        const answers = this.state.answers;
        answers.forEach((a)=>data.append(a.q, JSON.stringify(a)));

        fetch(demoUrl,
            {
                method: "POST",
                body: data
            })
            .then(function(res){
                return res.json(); })
            .then((data)=>{
                console.log(data);
                this.setState({serverResponse: data});
            })
    };

    collectAnswers = (obj) => {
        const an = this.state.answers;
        const answers = this.addOrOverwrite(an, obj);
        this.setState({answers});
    };

    addOrOverwrite = (collection, obj) => {
        //If the object is allready in the collection overwrite else add it.
        const solution = collection.filter(o => o.id === obj.id);
        if(solution.length === 0){
             //clone and add obj to the shallow clone;
            return [...collection, obj];
        } else {
            const result = [...collection];
            result.find((o, index, arr)=>{
                if(o.id===obj.id)
                    arr[index] = obj;
            });
            return result;
        }
    };

    render(){
        // const { selectedOption } = this.state;
        const response = (this.state.serverResponse)?this.state.serverResponse:[];
        console.log(JSON.stringify(response));
       return (
       <div className="component">
           <Select
               name="tags"
               onChange={this.handleSelect}
               options={this.state.tags.map(tag=>{return {value: tag, label: tag}; })}/>

           <h2>Multiple Choice</h2>
            <div className="response">
           {(response.length !== 0)?
               <h2>Her er dit resultat: </h2>
               :""}
           {response.map(ass=><div key={ass.solution.id}>I spørgsmål nummer {ass.solution.id} fik du {ass.grade} i karakter</div>)}
            </div>
           {
               this.state.questions.map((q, inx)=>
                   <Q key={inx} q={q} addAnswer={this.collectAnswers}/>
               )
           }
           <button onClick={this.handleSubmit}>Submit</button>
        </div>)
    }
} 
export default MC;