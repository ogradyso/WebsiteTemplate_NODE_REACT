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
import axios from "axios";


/**
* BaseLayout.
*/
class BaseLayout extends Component {
	constructor(props) {
		super(props);
		this.state.getBlogList();
	}

	async handleNavClick(changeView) {
		console.log("Change view state");
		await this.setState({ currentView : changeView,
													blogCreateEdit : "hide"});	
	}
	async handleModalClick(actionIndicator, blogTitleInput, blogBodyInput) {
		console.log("Performing action");
		switch(actionIndicator) {
			case "cancel":
				console.log("Cancelling action");
				await this.setState({ blogCreateEdit : "hide" });
				break;
			case "saveBlog":
				console.log("Saving the new something" + blogTitleInput + "blog ");
				let blogTitle = this.state.blogTitle;
				let blogBody = this.state.blogBody;
				let blogId = this.state.blogId;
				if (this.state.blogId == "") {
					axios.post('http://localhost/saveBlog', {method: 'POST', blogTitle: blogTitleInput, blogBody: blogBodyInput }).then(resp=> {
					this.state.getBlogList().then(resp=> {
					this.setState({ blogCreateEdit: "hide"});
					})
				})
				} else {
					axios.post('http://localhost/editBlog', {method: 'POST', blogTitle: blogTitleInput, blogBody: blogBodyInput, blogId: blogId }).then(resp=> {
					this.state.getBlogList();
					this.setState({ currentView: "blog"});
				})
				}
				await this.setState({ blogCreateEdit : "hide" });
				break;
			default:
				console.log("Action not found");
		}
		this.forceUpdate();
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
				let blogId = this.state.blogId;
			  await axios.post('http://localhost/deleteBlog',{method: 'POST', blogId: blogId});	
				this.state.getBlogList();	
				break;
			case "create":
				console.log("Creating a new blog");
				await this.setState({blogId: ""});
				await this.setState({blogBody: []});
				await this.setState({blogTitle: ""});
			case "edit":
				console.log("Editing current blog");
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
						{ this.state.blogCreateEdit === "show" && <BlogCreateEdit state={ this.state } onClick={this.handleModalClick.bind(this)} /> }
					</div>
				</div>
				<div className="actionArea">
						{ this.state.currentView === "blog" && <BlogActions onClick={this.handleActionClick.bind(this)}/> }
				</div>
			</div>
		)};
}

export default BaseLayout;
