import * as React from "react";

interface IProps {
    matchHistory: any[],
    selectNewMatch: any,
    searchByTag: any
}

export default class MatchList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTag = this.searchByTag.bind(this)
    }

	public render() {
		return (
			<div className="container match-list-wrapper">
                <div className="row match-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Tags" />
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
            children.push(<td key={"id" + i}>{match.id}</td>)
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

}