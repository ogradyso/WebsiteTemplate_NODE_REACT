import React from "react";

import DOMPurify from 'dompurify';

const BlogView = ({ state }) => (
	<div>
		<h1>{ `${state.blogTitle}` }</h1>
		<body dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(state.blogBody)}}></body>
	</div>

);

export default BlogView;
