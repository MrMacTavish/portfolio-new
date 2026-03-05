const BLOG_TITLE_OBJ = document.getElementById("blog-title");
const BLOG_DATE_OBJ = document.getElementById("blog-date");
const BLOG_TAGS_OBJ = document.getElementById("blog-tags");
const BLOG_CONT_OBJ = document.getElementById("blog-content");

function fillTemplate(id){
	blog = BLOGS.get(id);
	tag_string = "";
	blog["tags"].forEach(tag=>tag_string+=`${tag}, `);
	tag_string = tag_string.slice(0,-2);
	BLOG_TITLE_OBJ.innerHTML = blog["title"];
	BLOG_DATE_OBJ.innerHTML = blog["date"];
	BLOG_TAGS_OBJ.innerHTML = tag_string;
	BLOG_CONT_OBJ.innerHTML = blog["content"];
}


url_params = new URLSearchParams(document.location.search);
id = url_params.get("id");

if(id == null){
	BLOG_TITLE_OBJ.innerHTML = "No id parameter passed!";
} else if(BLOGS.has(id)){
	fillTemplate(id);
} else {
	BLOG_TITLE_OBJ.innerHTML = `No blog exists with id: ${id}`;
}
