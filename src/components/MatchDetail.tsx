import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentMatch: any
}

interface IState {
    open: boolean,
    location: string,
    game: string,
    home: string,
    opposition: string,
    winner: string,
    comment: string
}

export default class MatchDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false,

            location: this.props.currentMatch.location,
            game: this.props.currentMatch.game,
            home: this.props.currentMatch.home,
            opposition: this.props.currentMatch.opposition,
            winner: this.props.currentMatch.winner,
            comment: this.props.currentMatch.comment,
        }
        this.updateMatch = this.updateMatch.bind(this)
        this.deleteMatch = this.deleteMatch.bind(this)

        this.handleCommentChange = this.handleCommentChange.bind(this)
        this.handleGameChange = this.handleGameChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleHomeChange = this.handleHomeChange.bind(this)
        this.handleOppositionChange = this.handleOppositionChange.bind(this)
        this.handleWinnerChange = this.handleWinnerChange.bind(this)

        // this.updateState = this.updateState.bind(this)


    }

	public render() {
        const currentMatch = this.props.currentMatch
        
        const { open } = this.state;
		return (
			<div className="container match-wrapper" >
                <div className = "container match-header-wrapper">
                    <div className="row match-heading" >
                        <b>Match#{currentMatch.id}</b>&nbsp; {currentMatch.date}
                    </div>
                    <div className="row match-heading">
                        {currentMatch.location}
                    </div>
                </div>
                <div className = "container match-detail-wrapper">
                    <div className="row match-title">
                        {currentMatch.home} vs. {currentMatch.opposition}
                    </div>
                    <div className="row match-subtitle">
                        Winner: {currentMatch.winner}
                    </div>
                    <div className="row match-body">
                        Comments: {currentMatch.comment}
                    </div>
                </div>
                <div className="row match-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deleteMatch.bind(this, currentMatch.id)}>Delete </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
                    <form>
                    <small> Fields with * are required.</small>
                        <div className="form-group">
                            <label>Match Location*</label>
                            <input type="text" className="form-control" id="match-edit-location-input" value={this.state.location} onChange={this.handleLocationChange}/>
                        </div>
                        <div className="form-group">
                            <label>Game Type*</label>
                            <input type="text" className="form-control" id="match-edit-game-input" value={this.state.game} onChange={this.handleGameChange}/>
                        </div><div className="form-group">
                            <label>Home*</label>
                            <input type="text" className="form-control" id="match-edit-home-input" value={this.state.home} onChange={this.handleHomeChange}/>
                        </div>
                        <div className="form-group">
                            <label>Opposition*</label>
                            <input type="text" className="form-control" id="match-edit-opposition-input" value={this.state.opposition} onChange={this.handleOppositionChange}/>
                        </div>
                        <div className="form-group">
                            <label>Match Winner*</label>
                            <input type="text" className="form-control" id="match-edit-winner-input" value={this.state.winner} onChange={this.handleWinnerChange}/>
                        </div>
                        <div className="form-group">
                            <label>Match Comment</label>
                            <input type="text" className="form-control" id="match-edit-comment-input" value={this.state.comment} onChange={this.handleCommentChange}/>
                        </div>
                        <button type="button" className="btn" onClick={this.updateMatch}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true,
            game: this.props.currentMatch.game,
            comment: this.props.currentMatch.comment,
            location: this.props.currentMatch.location,
            home: this.props.currentMatch.home,
            opposition: this.props.currentMatch.opposition,
            winner: this.props.currentMatch.winner});
	  };
    
    // Modal Close
    private onCloseModal = () => {
        this.setState({ open: false });
    };

    private updateMatch(){
        const locationInput = document.getElementById("match-edit-location-input") as HTMLInputElement
        const gameInput = document.getElementById("match-edit-game-input") as HTMLInputElement
        const homeInput = document.getElementById("match-edit-home-input") as HTMLInputElement
        const oppositionInput = document.getElementById("match-edit-opposition-input") as HTMLInputElement
        const winnerInput = document.getElementById("match-edit-winner-input") as HTMLInputElement
        const commentInput = document.getElementById("match-edit-comment-input") as HTMLInputElement

        if (locationInput === null || gameInput === null  || homeInput === null  || oppositionInput === null  || winnerInput === null ) {
            return;
        }
    
        const currentMatch = this.props.currentMatch
        const url = "https://matchhistoryapi.azurewebsites.net/api/MatchHistory/" + currentMatch.id
        const updatedLocation = locationInput.value
        const updatedHome = homeInput.value
        const updatedOpposition = oppositionInput.value
        const updatedWinner = winnerInput.value
        const updatedComment = commentInput.value
        const updatedGame = gameInput.value;

        fetch(url, {
            body: JSON.stringify({
                "id": currentMatch.id,
                "date": currentMatch.date,
                "game": updatedGame,
                "location": updatedLocation,
                "home": updatedHome,
                "opposition": updatedOpposition,
                "winner": updatedWinner,
                "comment":updatedComment
            }),
            headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
            method: 'PUT'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error State
                alert(response.statusText + " " + url)
            } else {
                location.reload()
            }
        })
    }

    private handleLocationChange(event:any) {
        this.setState({location: event.target.value});
    }

    private handleGameChange(event:any) {
        this.setState({game: event.target.value});
    }
    private handleHomeChange(event:any) {
        this.setState({home: event.target.value});
    }
    private handleOppositionChange(event:any) {
        this.setState({opposition: event.target.value});
    }
    private handleWinnerChange(event:any) {
        this.setState({winner: event.target.value});
    }
    private handleCommentChange(event:any) {
        this.setState({comment: event.target.value});
    }

    private deleteMatch(id: any) {
        const url = "https://matchhistoryapi.azurewebsites.net/api/MatchHistory/" + id
    
        fetch(url, {
            method: 'DELETE'
        })
        .then((response : any) => {
            if (!response.ok) {
                // Error Response
                alert(response.statusText)
            }
            else {
                location.reload()
            }
        })
    }
}