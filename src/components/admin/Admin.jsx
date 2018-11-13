import React from "react";
import './Admin.css';

const webcheckerUrlUpload = 'http://localhost:8080/webchecker/upload';

class Admin extends React.Component {
	constructor() {
		super();
		this.state = {
			webchallengename: "",
			webchallengetype: "",
			webchallengedescription: "",
			webchallengequestion: "",
			tags: [],
			response: null
		};
	}

	componentDidMount = () => {
	};

	updateWebChallengeName = (e) => {
		this.setState({
			webchallengename: e.target.value
		});
	}

	updateWebChallengeType = (e) => {
		this.setState({
			webchallengetype: e.target.value
		});
	}

	updateWebChallengeDescription = (e) => {
		this.setState({
			webchallengedescription: e.target.value
		});
	}

	updateWebChallengeQuestion = (e) => {
		this.setState({
			webchallengequestion: e.target.value
		});
	}

	handleUpload = (e) => {
		if(this.state.webchallengetype !== "")
		{
			var data = new FormData();

			data.append("webchallengename", this.state.webchallengename);
			data.append("webchallengetype", this.state.webchallengetype);
			data.append("webchallengedescription", this.state.webchallengedescription);
			data.append("webchallengequestion", this.state.webchallengequestion);
			data.append("webchallengefile", this.uploadFile.files[0]);

			fetch(webcheckerUrlUpload,
				{
					method: "POST",
					body: data
				})
				.then(function (res) {
					return res.json();
				})
				.then((data) => {
					alert("WebChallenge uploaded...");
					console.log(data);
					this.setState({response: data});
				})
				.catch(error => {
					console.log("Error:" + error.message);
					this.setState({response: null});
				});
		}
	};

	render() {
		return (
			<div id="componentadmin">
				<h2>WebChallengeUpload</h2>
				<form>
					<div>
						<label htmlFor="webchallengename">NAME</label>
						<input
							type="text"
							id="webchallengename"
							name="webchallengename"
							onChange={e => this.updateWebChallengeName(e)}
						/>
					</div>
					<div>
						<label htmlFor="webchallengetype">TYPE</label>
						<select
							id="webchallengetype"
							name="webchallengetype"
							onChange={e => this.updateWebChallengeType(e)}
							required>
							<option defaultValue="" hidden></option>
							<option value="SELENIUM">SELENIUM</option>
							<option value="REST">RESTASSURED</option>
						</select>
					</div>
					<div>
						<label htmlFor="webchallengedescription">DESCRIPTION</label>
						<textarea
							id="webchallengedescription"
							name="webchallengedescription"
							onChange={e => this.updateWebChallengeDescription(e)}
						/>
					</div>
					<div>
						<label htmlFor="webchallengequestion">QUESTION</label>
						<textarea
							id="webchallengequestion"
							name="webchallengequestion"
							onChange={e => this.updateWebChallengeQuestion(e)}
						/>
					</div>
					<div>
						<label htmlFor="webchallengefile">FILE</label>
						<input
							type="file"
							id="webchallengefile"
							name="webchallengefile"
							placeholder="WebChallengeFile..."
							ref={(ref) => this.uploadFile = ref}
						/>				
					</div>
					<div>
						<input 
							type="button"
							value="UPLOAD"	
							onClick={e => this.handleUpload(e)}						
						/>
					</div>
				</form>
			</div>
		)
	}
}
export default Admin;