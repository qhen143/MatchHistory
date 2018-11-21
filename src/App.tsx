import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import MemeDetail from './components/MemeDetail';
import MemeList from './components/MemeList';
import PatrickLogo from './patrick-logo.png';


interface IState {
	currentMatch: any,
	matchHistory: [],
	open: boolean,
	uploadFileList: any,
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			currentMatch: {
				"id": 1,
				"date": "YYYY/MM/DD",
				"location": "Cue City",
				"game": "8 Ball",
				"home": "Opponent 1",
				"opposition": "Opponent 2",
				"winner": "Opponent 1",
				"comment": "N/A"
			  },
			matchHistory: [],
			open: false,
			uploadFileList: null
		}     	
		this.selectNewMeme = this.selectNewMeme.bind(this)
		this.fetchMatchHistory = this.fetchMatchHistory.bind(this)
		this.fetchMatchHistory("")
	}

	public render() {
		const { open } = this.state;
		return (
		<div>
			<div className="header-wrapper">
				<div className="container header">
					<img src={PatrickLogo} height='40'/>&nbsp; My Meme Bank - MSA 2018 &nbsp;
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add Meme</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-7">
						<MemeDetail currentMatch={this.state.currentMatch} />
					</div>
					<div className="col-5">
						<MemeList matchHistory={this.state.matchHistory} selectNewMatch={this.selectNewMeme} searchByTag={this.fetchMatchHistory}/>
					</div>
				</div>
			</div>
			<Modal open={open} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Meme Title</label>
						<input type="text" className="form-control" id="meme-title-input" placeholder="Enter Title" />
						<small className="form-text text-muted">You can edit any meme later</small>
					</div>
					<div className="form-group">
						<label>Tag</label>
						<input type="text" className="form-control" id="meme-tag-input" placeholder="Enter Tag" />
						<small className="form-text text-muted">Tag is used for search</small>
					</div>
					<div className="form-group">
						<label>Image</label>
						<input type="file" onChange={this.methodNotImplemented} className="form-control-file" id="meme-image-input" />
					</div>

					<button type="button" className="btn" onClick={this.methodNotImplemented}>Upload</button>
				</form>
			</Modal>
		</div>
		);
	}

	private methodNotImplemented() {
		alert("Method not implemented")
	}

	// Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};
	
	// Change selected meme
	private selectNewMeme(newMeme: any) {
		this.setState({
			currentMatch: newMeme
		})
	}

	private fetchMatchHistory(tag: any) {
		let url = "https://matchhistoryapi.azurewebsites.net/api/MatchHistory"
		if (tag !== "") {
			url += "/search/" + tag
		}
		fetch(url, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(json => {
			let currentMatch = json[0]
			if (currentMatch === undefined) {
				currentMatch = {
					"id": 1,
					"date": "YYYY/MM/DD",
					"location": "Cue City",
					"game": "8 Ball",
					"home": "Opponent 1",
					"opposition": "Opponent 2",
					"winner": "Opponent 1",
					"comment": "N/A"
				  }
			}
			this.setState({
				currentMatch,
				matchHistory: json
				
			})
			console.log(this.state.matchHistory);
		});
	}
}

export default App;
