import React from "react"
import CB from './CB'
import './MC.css'

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            answers: []
        };
    }

    toggleChange = (target) => {
            // console.log(target.isChecked)
            (target.checked)?
                this.state.answers.push(target.name):
                this.state.answers = this.state.answers.filter(el=>el !== target.name);
            console.log(this.state.answers);
            this.props.getAnswers({q: this.props.q.question, a: this.state.answers});
    }

    render() {
        const q = this.props.q;
        return (
            <div>
                <div><h4>{q.question}</h4></div>
                {
                    q.choices.map((c,i)=>
                        <div key={i} >
                            <CB name={c} change={this.toggleChange}/>
                            <span width="20px"></span>{c}
                        </div>
                    )
                }
                    <hr/>
                </div>
        );
    }
}
export default Question;
