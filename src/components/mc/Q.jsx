import React from "react";
import CB from './CB';
import './MC.css';
import facade from '../../data/ApiFacade';
const user = {id: 1}; //matches the PersonIdentifier format on the backend.
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers : []
        };
    }
    componentDidMount = ()=>{
        const id = this.props.query;
        console.log('this.poprs. question',this.props.query)
        facade.fetchData({request:'query',id}).then((query)=>{
            this.setState({query});
            console.log('WQUESTION: ', query);
        });

    }
    toggleChange = (target) => {
        const addAnswer = ()=>{this.state.answers.push(target.name);};
        const removeAnswer = ()=>{this.setState({
                answers: this.state.answers.filter(el=>el !== target.name)
            });
        };
        (target.checked)?addAnswer():removeAnswer();
    };
    submit = ()=>{
        facade.postData({request: 'answer',id: this.props.query, 
        data:{answers:this.state.answers}
    })
    };
    render() {
        const q = this.state.query;
        
        return (
            <div >
            {q && q.dtype === 'CHOICE' &&(<div>
                <div><h4>{q.question}</h4></div>
                Answers:
                {
                    q.answers.map((c,i)=>
                        <div key={i} >
                            <CB key={c} id={i} name={c} change={this.toggleChange}/>
                            {c}
                        </div>
                    )
                    
                }
                <button onClick={this.submit}>submit answer</button>
                    <hr/>
            </div>)}
                </div>
        );
    }
}
export default Question;
