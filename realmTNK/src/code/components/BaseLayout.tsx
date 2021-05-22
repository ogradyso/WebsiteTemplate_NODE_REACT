import React, { Component } from "react";

import Navbar from "./Navbar";
import WelcomeView from "./WelcomeView";
import BlogView from "./BlogView";
import NewsList from "./NewsList";
import BlogList from "./BlogList";
import BlogActions from "./BlogActions";
import ProjectList from "./ProjectList";
import TutorialList from "./TutorialList";
import { createState } from "../state";
import BlogCreateEdit from "./BlogCreateEdit";


/**
* BaseLayout.
*/
class BaseLayout extends Component {
	constructor(props) {
		super(props);
		this.state.getBlogList();
	}

	async handleNavClick(changeView) {
		console.log("Getting blog post data");
		console.log(this.state.currentBlog.filepath);
		await this.state.getSelectedBlogPost();
		console.log("Change view state");
		await this.setState({ currentView : changeView});	
	}
	async handleActionClick(actionIndicator) {
		console.log("Performing action");
		switch(actionIndicator) {
			case "cancel":
				console.log("Cancelling action");
				await this.setState({ blogCreateEdit : "hide" });
				break;
			case "delete":
				console.log("Deleting current blog");
				break;
			case "create":
				console.log("Creating a new blog");
			case "edit":
				console.log("Editing current blog");
				// still need to add state change to present edit/create modal
				await this.setState({ currentView : "blog"});	
				await this.setState({ blogCreateEdit : "show" });
				console.log("state" + this.state.blogCreateEdit);
				break;
			default:
				console.log("Action not found");
		}
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
					<Navbar onClick={this.handleNavClick.bind(this)} />
				</div>
				<div className="newsList">
					{ this.state.currentView === "welcome" && <NewsList state={ this.state } /> }
					{ this.state.currentView === "blog" && <BlogList state={ this.state } /> }
					{ this.state.currentView === "projects" && <ProjectList state={ this.state } /> }
					{ this.state.currentView === "tutorial" && <TutorialList state={ this.state } /> }
				</div>
				<div className="centerArea">
					<div className="centerViews">
						{ this.state.currentView === "welcome" && <WelcomeView /> }
						{ this.state.currentView === "blog" && this.state.blogCreateEdit === "hide" && <BlogView state={ this.state } /> }
						{ this.state.blogCreateEdit === "show" && <BlogCreateEdit onClick={this.handleActionClick.bind(this)} state={ this.state } /> }
					</div>
				</div>
				<div className="actionArea">
						{ this.state.currentView === "blog" && <BlogActions onClick={this.handleActionClick.bind(this)}/> }
				</div>
			</div>
		)};
}

export default BaseLayout;
