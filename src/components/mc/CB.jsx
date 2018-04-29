import React from "react";
import './MC.css'

class CB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }

    doChange = (event) => {
        this.setState({isChecked: !this.state.isChecked});
        this.props.change(event.target)
    }
    render() {
        // console.log(this.props.name)
        return (
            <label>
                <input type="checkbox"
                       checked={this.state.isChecked}
                       onChange={this.doChange}
                       name={this.props.name}
                />

            </label>
        );
    }
}
export default CB;
