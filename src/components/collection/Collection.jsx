import React, {Component} from 'react';
import { Route } from "react-router-dom";
import Q from '../mc/Q';
import facade from '../../data/ApiFacade';

class Collection extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    
    handleChange = (event) => {
        const id = event.target.value;
        console.log('value: ',id);
        this.setState({id});
    }
    render(){
        const arr = [...Array(10).keys()];
        return (<div>
            Choose an assignment: {' '}
            <select value={this.state.id} onChange={this.handleChange}>
                {arr.map((el)=> <option key={el} value={el+1}>{el+1}</option>)}
            </select>
            {this.state.id && (<Quest  id={this.state.id} />)}
            
        </div>);
    }
}
class Quest extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        console.log('Loading Quest');
    }
    componentDidMount = ()=>{
        const id = this.props.id;
        facade.fetchData({request:'quest',id}).then((quest)=>{
            this.setState({quest});
            console.log(quest);
        });
    }
    render(){
        const quest = this.state.quest;
        return (
            <div>
                {quest && (<div>
                    <h1>{quest.title.value}</h1>
                   { quest.contents && quest.contents.map((el)=>{
                       if(el.type === 'TEXT'){
                           return <p>{el.value}</p>
                       } else if(el.type === 'QUERY'){
                           return <Q key={el.query} query={el.query}/>
                       } else if(el.type === 'SECTION'){
                           return (<div key={el.title.value}>
                               <h2>{el.title.value}</h2>
                               {el.contents.map((element)=>{
                                   if(element.type === 'QUERY'){
                                       return <Q key={element.query} query={element.query}/>
                                   }
                                   else {
                                       return 'Not a query ...';
                                   }
                               })}
                               </div>
                           );
                       }
                   })}
                </div>)}
            </div>
        );
    }
}

export default Collection;