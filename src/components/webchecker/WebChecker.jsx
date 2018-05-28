import React from "react";
import Select from 'react-select';
import Q from './Q';
import './WebChecker.css';

const tagUrl = 'http://localhost:8080/webchecker/';
const webcheckerUrl = 'http://localhost:8080/webchecker/';

class WebChecker extends React.Component {
	constructor() {
		super();
		this.state = {
			challengeid: 0,
			url: "",
			tags: [],
			response: null
		};
	}

	componentDidMount = () => {
		fetch(tagUrl, { method: 'get' }).then(
			data => { return data.json(); }
		).then(data => {
			this.setState({ tags: data })
			console.log(this.state.tags);
		});

	};

	updateChallengeID = (e) => {
		this.setState({
			challengeid: e.target.value
		});
	}

	updateUrl = (e) => {
		this.setState({
			url: e.target.value
		});
	}

	handleSubmit = () => {
		var data = new FormData();

		data.append("url", this.state.url);
		data.append("challengeid", this.state.challengeid);

		fetch(webcheckerUrl,
			{
				method: "POST",
				body: data
			})
			.then(function (res) {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({response: data});
			})
			.catch(error => {
				console.log("Error:" + error.message);
				this.setState({response: null});
			});
			
	};

	render() {
		
		
		return (
			<div className="component">
				<input
					type="text"
					name="challengeid"
					placeholder="CHALLENGEID..."
					onChange={e => this.updateChallengeID(e)}
				/>
				
				<input
					type="text"
					name="url"
					placeholder="URL..."
					value={this.state.url}
					onChange={e => this.updateUrl(e)}
				/>				

				<h2>WebChecker</h2>
				<div>
					{
						(this.state.response != null) ? 
							<div>
								<h2>Results...</h2>
								<p>Checked: { this.state.response.solution.url }</p>
								<p>Grade: { this.state.response.grade }</p>
								<p>NumberOfTests: { this.state.response.numberoftests }</p>
								<p>Successful: { this.state.response.successful }</p>
								<p>Failed: { this.state.response.failed }</p>
								<p>Percentage: { this.state.response.percentage }</p>
								<h3>Tests</h3>
								<table>
									<thead>
										<tr>
											<td>TestName</td>
											<td>Status</td>
											<td>Message</td>
										</tr>
									</thead>
									<tbody>
								{
									Object.keys(this.state.response.tests).map((key)  =>
									{
										
										//{key + "hello " + this.state.response.tests[key].status}</p>
										return(<tr className={this.state.response.tests[key].status == 'SUCCESSFUL' ? 'successful' : 'failed'}>
											<td>{key}</td>
											<td>{this.state.response.tests[key].status}</td>
											<td>{this.state.response.tests[key].message}</td>
											</tr>)
									})
									
								}
									</tbody>
								</table>
							</div>
						:
							""
					}
				</div>

				<button onClick={this.handleSubmit}>Submit</button>
			</div>)
	}
}
export default WebChecker;