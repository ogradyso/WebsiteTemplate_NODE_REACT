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
						<input type="text" defaultValue={this.props.state.blogTitle} onChange={evt => this.updateBlogTitleValue(evt)}/><br/><br/>


						<label>Blog Content:</label><br/>
						<textarea className="textBox" defaultValue={this.props.state.blogBody} onChange={evt => this.updateBlogBodyValue(evt)}/><br/><br/>
						<input type="button" value="Save" onClick={() => this.props.onClick("saveBlog", this.props.state.blogTitle, this.props.state.blogBody)} /><br/><br/>
						<input type="button" value="Cancel" onClick={() => this.props.onClick("cancel")} /><br/><br/>
					</form>
				</div>
			</div>
		)};

	updateBlogTitleValue(evt) {
		this.props.state.blogTitle = evt.target.value;
	};

	updateBlogBodyValue(evt) {
		this.props.state.blogBody = evt.target.value;
	};
}


export default BlogCreateEdit;
