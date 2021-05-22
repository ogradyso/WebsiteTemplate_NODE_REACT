//import {config} from "./config";
import axios, { AxiosResponse } from "axios";

export function createState(inParentComponent) {
	return {
		pleaseWaitVisible : false,
		currentView : "welcome",
		blogList: [],
		currentBlog: null,
		blogTitle: "placeholder",
		blogBody: [],
		blogCreateEdit: "hide",
	
		setCurrentBlog : async function(newCurrentBlog): Promise<void> {
			console.log("Blog to change:" + newCurrentBlog.title);
			await inParentComponent.setState({
				currentBlog: newCurrentBlog			
			});
			inParentComponent.state.getSelectedBlogPost();
			}.bind(inParentComponent),

		getBlogList : function(): void {
			fetch('/blogs')
				.then(res => res.json())
				.then(response => {
					console.log(response.blogs);
					inParentComponent.setState({
						blogList: response.blogs,
						currentBlog: response.blogs[response.blogs.length-1]
					})
					console.log(this.state.currentBlog);
					console.log(this.state.blogList);
				}).catch(err => {
					console.log(err);
				})
		}.bind(inParentComponent),

		getSelectedBlogPost : async function(): Promise<void> {
			const response: AxiosResponse = await axios.get(`http://localhost:80/getSelectedBlogPost/${inParentComponent.state.currentBlog.blogFilename}`);
			console.log(response);
			inParentComponent.setState({
				blogTitle : response.data.blog.title,
				blogBody : response.data.blog.body.element	
			});
			console.log(this.state.blogTitle);
			console.log(this.state.blogBody);
		}.bind(inParentComponent)
	};
}
