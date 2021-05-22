import React, { Component } from "react";

import Button from "@material-ui/core/Button";

interface Props{
	onClick: any;
}

class BlogActions extends React.Component<Props> {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<Button onClick={() => this.props.onClick("create")} variant="contained" color="primary" size="small" style={{ marginTop:9, marginBottom:10 }}>Create New Blog</Button>
				<Button onClick={() => this.props.onClick("edit")} variant="contained" color="primary" size="small" style={{ marginBottom:10 }}>Edit Current Blog</Button>
				<Button onClick={() => this.props.onClick("delete")} variant="contained" color="primary" size="small" style={{ marginBottom:10 }}>Delete Current Blog</Button>
			</div>
	)};
}

export default BlogActions;
