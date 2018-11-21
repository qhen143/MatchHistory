import * as React from "react";
import Modal from 'react-responsive-modal';
interface IProps {
    matchHistory: any[],
    selectNewMatch: any,
    searchByTag: any,
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

export default class MatchList extends React.Component<IProps, IState, {}> {
    constructor(props: any) {
        super(props)   
        this.state = {
            open: false,

            location: "",
            game: "",
            home: "",
            opposition: "",
            winner: "",
            comment: ""
        }
        this.searchByTag = this.searchByTag.bind(this)
        this.postMatch = this.postMatch.bind(this)
    }

	public render() {
        const { open } = this.state;
		return (
			<div className="container match-list-wrapper">
                <div className="row match-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Player" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTag}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row match-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
                <div className="row match-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Submit New Match</div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} >
				<form>
                <div className="form-group">
                    <small className="form-text text-muted">* Field is required</small>
                        <label>Date*</label>
                        <input type="text" className="form-control" id="match-post-date-input" placeholder="YYYY/MM/DD"/>
                    </div>
                    <div className="form-group">
                        <label>Match Venue*</label>
                        <input type="text" className="form-control" id="match-post-location-input" placeholder="Where the match was played."/>
                    </div>
                    <div className="form-group">
                        <label>Game Type*</label>
                        <input type="text" className="form-control" id="match-post-game-input" placeholder="8 Ball"/>
                    </div><div className="form-group">
                        <label>Home*</label>
                        <input type="text" className="form-control" id="match-post-home-input" placeholder="Player 1"/>
                    </div>
                    <div className="form-group">
                        <label>Opposition*</label>
                        <input type="text" className="form-control" id="match-post-opposition-input" placeholder="Player 2"/>
                    </div>
                    <div className="form-group">
                        <label>Match Winner*</label>
                        <input type="text" className="form-control" id="match-post-winner-input" placeholder="Player 1"/>
                    </div>
                    <div className="form-group">
                        <label>Match Comment</label>
                        <input type="text" className="form-control" id="match-post-comment-input" placeholder="Eg. Re-break by player 2. Victory by foul from player 1."/>
                    </div>

					<button type="button" className="btn" onClick={this.postMatch}>Submit</button>
				</form>
			</Modal>
            </div>
		);
    }

    // Construct table using match history list
	private createTable() {
        const table:any[] = []
        const matchHistoryList = this.props.matchHistory
        console.log(matchHistoryList);
        if (matchHistoryList == null) {
            return table
        }

        for (let i = 0; i < matchHistoryList.length; i++) {
            const children = []
            const match = matchHistoryList[i]
            // children.push(<td key={"id" + i}>{match.id}</td>)
            children.push(<td key={"date" + i}>{match.date}</td>)
            children.push(<td key={"home" + i}>{match.home}</td>)
            children.push(<td key={"opposition" + i}>{match.opposition}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Match selection handler to display selected match in details component
    private selectRow(index: any) {
        const selectedMatch = this.props.matchHistory[index]
        if (selectedMatch != null) {
            this.props.selectNewMatch(selectedMatch)
        }
    }

    // Search match by tag
    private searchByTag() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const tag = textBox.value 
        this.props.searchByTag(tag)  
    }

    // Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
    };
    
    private postMatch(){
        const dateInput = document.getElementById("match-post-date-input") as HTMLInputElement
        const locationInput = document.getElementById("match-post-location-input") as HTMLInputElement
        const gameInput = document.getElementById("match-post-game-input") as HTMLInputElement
        const homeInput = document.getElementById("match-post-home-input") as HTMLInputElement
        const oppositionInput = document.getElementById("match-post-opposition-input") as HTMLInputElement
        const winnerInput = document.getElementById("match-post-winner-input") as HTMLInputElement
        const commentInput = document.getElementById("match-post-comment-input") as HTMLInputElement

        if (dateInput === null || locationInput === null || gameInput === null  || homeInput === null  || oppositionInput === null  || winnerInput === null ) {
            return;
        }
    
        const url = "https://matchhistoryapi.azurewebsites.net/api/MatchHistory/"
        const updatedDate = dateInput.value
        const updatedLocation = locationInput.value
        const updatedHome = homeInput.value
        const updatedOpposition = oppositionInput.value
        const updatedWinner = winnerInput.value
        const updatedComment = commentInput.value
        const updatedGame = gameInput.value;

        if (updatedComment === "" || updatedDate === "" || updatedGame === ""  || updatedHome === ""  || updatedOpposition === ""  || updatedWinner === "" ) {
            alert("Not a valid entry! Please fill out the required fields.")
            return;
        }

        fetch(url, {
            body: JSON.stringify({
                "date": updatedDate,
                "game": updatedGame,
                "location": updatedLocation,
                "home": updatedHome,
                "opposition": updatedOpposition,
                "winner": updatedWinner,
                "comment":updatedComment
            }),
            headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
            method: 'POST'
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
	

}