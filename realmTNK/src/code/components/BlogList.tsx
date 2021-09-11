import React from "react";

import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";

const BlogList = ({ state }) => (
	<List>
		{state.blogList.map(value => {
			return (
				<Chip label={ `${value.Title}` } onClick={ () => state.setCurrentBlog(value)}
					style={{ width:128, marginBottom:10 }}
					color={ state.currentBlog === value.filepath ? "secondary" : "primary" } />
			);
		} ) }
	</List>
);

export default BlogList;
