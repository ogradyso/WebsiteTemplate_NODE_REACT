import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import SubjectIcon from "@material-ui/icons/Subject";
import SchoolIcon from "@material-ui/icons/School";
import GithubIcon from "@material-ui/icons/GitHub";

interface Props{
	onClick: any;
}

class Navbar extends React.Component<Props> {
	constructor(props) {
		super(props);
		
	}
	render() {
		return(
			<div>
				<Button onClick={() => this.props.onClick("welcome")} variant="contained" color="primary" size="small" style={{ marginRight:10 }}>
					<HomeIcon style={{ marginRight:10 }} />Home
				</Button>
				<Button onClick={() => this.props.onClick("projects")} variant="contained" color="primary" size="small" style={{ marginRight:10 }}>
					<CategoryIcon style={{ marginRight:10 }} />Projects
				</Button>
				<Button onClick={() => this.props.onClick("blog")} variant="contained" color="primary" size="small" style={{ marginRight:10 }}>
					<SubjectIcon style={{ marginRight:10 }} />Blog
				</Button>
				<Button onClick={() => this.props.onClick("tutorial")} variant="contained" color="primary" size="small" style={{ marginRight:10 }}>
					<SubjectIcon style={{ marginRight:10 }} />Tutorials
				</Button>
				<Button variant="contained" color="primary" size="small" style={{ marginRight:10 }}
					onClick={ (e) => {e.preventDefault();window.location.href='https://github.com/ogradyso'}} >
					<GithubIcon style={{ marginRight:10 }} />Github
				</Button>
 			</div>
	)};
}

export default Navbar;
