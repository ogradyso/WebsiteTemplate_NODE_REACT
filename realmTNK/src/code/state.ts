//import {config} from "./config";
import axios, { AxiosResponse } from "axios";

export function createState(inParentComponent) {
	return {
		currentView : "welcome",
		blogList: [],
		currentBlog: null,
		blogTitle: "placeholder",
		blogBody: [],
		blogCreateEdit: "hide",
		blogId: "",
	
		setCurrentBlog : async function(newCurrentBlog): Promise<void> {
			console.log("Blog to change:" + newCurrentBlog.Title);
			await inParentComponent.setState({
				blogId: newCurrentBlog.BlogID,
				blogTitle: newCurrentBlog.Title,
			blogBody: newCurrentBlog.BlogBody,
			blogCreateEdit :"hide"
			});
			}.bind(inParentComponent),

			getBlogList : function(): void {
			let fetchHeaders =	{key: 'max-age', value:'0'};
			fetch('/blogs',{ headers:fetchHeaders})
				.then(res => res.json())
				.then(response => {
					console.log(response[0]);
					inParentComponent.setState({
						blogList: response,
						blogTitle: response[response.length -1].Title,
						blogBody: response[response.length-1].BlogBody,
						blogId: response[response.length-1].BlogID
					})
					console.log(this.state.currentBlog);
					console.log(this.state.blogList);
				}).catch(err => {
					console.log(err);
				})
		}.bind(inParentComponent)

	}
}
