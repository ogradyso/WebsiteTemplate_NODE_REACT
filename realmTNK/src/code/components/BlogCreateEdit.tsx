import React from "react";
import Modal from "react-modal";

interface Props{
	onClick: any;
	state: any;
}

class BlogCreateEdit extends React.Component<Props> {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="modal">
				<div className="modal_content">
					<form>
						<br/><br/>	
						<label>Blog Title:</label><br/>
						<input type="text" value={this.props.state.blogTitle}/><br/><br/>
						<label>Blog Content:</label><br/>
						<textarea className="textBox" value={this.props.state.blogBody}/><br/><br/>
						<input type="submit" className="submitButton"/>
						<input type="button" value="Cancel" onClick={() => this.props.onClick("cancel")} /><br/><br/>
					</form>
				</div>
			</div>
		)};
}

export default BlogCreateEdit;
