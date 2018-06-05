import React from "react";
import './WebChecker.css';

const webcheckerUrlCheck = 'http://localhost:8080/evaluate/URL';

class WebChecker extends React.Component {
	constructor() {
		super();
		this.state = {
			webchallengeid: 0,
			websolutionurl: "",
			tags: [],
			response: null
		};
	}

	componentDidMount = () => {
	};

	updateWebChallengeId = (e) => {
		this.setState({
			webchallengeid: e.target.value
		});
	}

	updateWebSolutionUrl = (e) => {
		this.setState({
			websolutionurl: e.target.value
		});
	}

	handleCheck = () => {
		var data = new FormData();

		data = {
			url: this.state.websolutionurl, 
			challenge: {
				id: parseInt(this.state.webchallengeid)
			}
		};

		data = JSON.stringify(data);

		//data.append("url", this.state.websolutionurl);
		//data.append("id", this.state.webchallengeid);

		fetch(webcheckerUrlCheck,
			{
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
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
			<div id="componentwebchecker">
				<h2>WebChallengeCheck</h2>
				<form>
					<div>
						<label htmlFor="webchallengeid">ID</label>
						<input
							type="text"
							id="webchallengeid"
							name="webchallengeid"
							onChange={e => this.updateWebChallengeId(e)}
						/>
					</div>
					<div>
						<label htmlFor="websolutionurl">URL</label>	
						<input
							type="text"
							id="websolutionurl"
							name="websolutionurl"
							value={this.state.websolutionurl}
							onChange={e => this.updateWebSolutionUrl(e)}
						/>
					</div>
					<div>
						<input
							type="button" 
							value="CHECK"
							onClick={this.handleCheck}
						/>
					</div>
				</form>
				
				<div>
					{
						(this.state.response != null && this.state.response.numberoftests > 0) ? 
							<div>
								<h2>Results...</h2>
								{
									//<p>Checked: { this.state.response.solution.url }</p>
								}
								<p>Grade: { this.state.response.grade }</p>
								<p>Explanation: { this.state.response.explanation }</p>
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
										return(<tr className={this.state.response.tests[key].status === 'SUCCESSFUL' ? 'successful' : 'failed'}>
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
			</div>)
	}
}
export default WebChecker;