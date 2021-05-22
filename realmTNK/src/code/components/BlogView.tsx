import React from "react";


const BlogView = ({ state }) => (
	<div>
		<h1>{ `${state.blogTitle}` }</h1>
		<body>
			{state.blogBody.map(value => {
				return (
					<p>{ `${value}` }</p>
				);
			})}
		</body>
	</div>

);

export default BlogView;
