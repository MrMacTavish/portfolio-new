const API_URL = "https://api.github.com/repos/MrMacTavish/portfolio-new/commits/main";
const COMMIT_DT_OBJ = document.getElementById("commit-dt");
const COMMIT_MSG_OBJ = document.getElementById("commit-msg");

//Function to get latest commit
function getLatestCommit(){
	console.log("API CALLED");
	fetch(API_URL,{method: "GET"})
        .then((response) => response.json())
        .then((json) => updateCommitTracker(json));
}

//Function to update the sidebar last commit thingy
function updateCommitTracker(json){
	dt = json["commit"]["author"]["date"];
	msg = json["commit"]["message"];
	const ed = new Date();
	ed.setTime(ed.getTime() + (1000 * 10 * 60)); //Expire 10 minutes from now
	cookieString = encodeURI(`gh-commit=${dt}${msg};`) + `expires=${ed.toUTCString()}`;
	document.cookie = cookieString;
	COMMIT_DT_OBJ.innerHTML = dt;
	COMMIT_MSG_OBJ.innerHTML = msg;
} 

//Function to update the sidebar last commit thing but from the cached data
function updateCommitTrackerFromCache(res){
	console.log(res);
	res = decodeURI(res);
	dt = res.substring(0,20);
	msg = res.substring(20);
	COMMIT_DT_OBJ.innerHTML = dt;
	COMMIT_MSG_OBJ.innerHTML = msg;
}

//Check cookie for last refresh time
cookies = document.cookie.split("; ");

foundCookie = false;
cookies.forEach((cookie)=>{
	console.log(cookie);
	//There has already been an API call in the last 10 minutes, use the cached value to avoid ratelimit
	if (cookie.startsWith("gh-commit=")){
		val = cookie.slice(10);
		updateCommitTrackerFromCache(val);
		foundCookie = true;
	}
});
//If the cookie doesn't exist, use the api
if (!foundCookie){
	getLatestCommit();
}
