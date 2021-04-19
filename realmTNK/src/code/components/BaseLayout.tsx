import React, { Component } from "react";

import Navbar from "./Navbar";
import WelcomeView from "./WelcomeView";
import NewsList from "./NewsList";
import ProjectList from "./ProjectList";
import TutorialList from "./TutorialList";
import { createState } from "../state";


/**
* BaseLayout.
*/
class BaseLayout extends Component {
	constructor(props) {
		super(props);

	}

	handleClick(changeView) {
		console.log("Changeview: " + changeView);
		this.setState({ currentView : changeView});	
	}
	/**
	*get state
	*
	*/
	state = createState(this);
	/**
	* Render()
	*/
	render() {
		return(
			<div className="appContainer">
				<div className="navbar">
					<Navbar onClick={this.handleClick.bind(this)} />
				</div>
				<div className="newsList">
					{ this.state.currentView === "welcome" && <NewsList state={ this.state } /> }
					{ this.state.currentView === "blog" && <NewsList state={ this.state } /> }
					{ this.state.currentView === "projects" && <ProjectList state={ this.state } /> }
					{ this.state.currentView === "tutorial" && <TutorialList state={ this.state } /> }
				</div>
				<div className="centerArea">
					<div className="centerViews">
						{ this.state.currentView === "welcome" && <WelcomeView /> }
					</div>
				</div>
			</div>
		)};
}

export default BaseLayout;
