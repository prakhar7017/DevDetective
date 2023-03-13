//serach bar
const input=document.getElementById("input");
const noresults=document.getElementById("no-result");
const btnsubmit=document.getElementById("submit");

// profile bio
const avatar=document.getElementById("avatar");
const userName=document.getElementById("name");
const date=document.getElementById("date");
const user=document.getElementById("user");
const bio=document.getElementById("bio");
const repos=document.getElementById("repos");
const following=document.getElementById("following");
const followers=document.getElementById("followers");
const user_location=document.getElementById("location");
const page=document.getElementById("page");
const twitter=document.getElementById("twitter");
const company=document.getElementById("company");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//api
const url = "https://api.github.com/users/";


// event Listners

btnsubmit.addEventListener("click",()=>{
    if(input.value !==""){
        console.log(input.value);
        getUserData(url+input.value);
    }

})

input.addEventListener("keydown",(e)=>{
    if(!e){
        let e=window.event;
    }
    if(e.key=="Enter"){
        if(input.value!==""){
            getUserData(url+input.value);
        }
    }

})

input.addEventListener("input",()=>{
    noresults.style.display="none";

});






//functions

async function getUserData(gitUrl){
    try {

        const response=await fetch(gitUrl);
        const data=await response.json();
        console.log(data);
        updateProfile(data);
        
    } catch (error) {

        console.log(error);
        
    }

}

function updateProfile(data){
    if(data.message!=="Not Found"){
        noresults.style.display="none";

        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
              param2.style.opacity = 0.5;
              param2.previousElementSibling.style.opacity = 0.5;
              return false;
            } else {
              return true;
            }
          }
    
        avatar.src=`${data.avatar_url}`;
    
        userName.innerText=data.name===null ?data.login : data.name;
    
        user.innerText=`@${data.login}`;
    
        user.href=`${data.html_url}`;
    
        bio.innerText=data.bio===null ?"This Profile Has No Bio":`${data.bio}`;
    
        repos.innerText=`${data.public_repos}`;
    
        followers.innerText=`${data.followers}`;
    
        following.innerText=`${data.following}`;

        user_location.innerText=checkNull(data.location,user_location) ?`${data.location}`:"Not Available";

        page.innerText=checkNull(data.blog,page) ? `${data.blog}`:"Not Available";

        page.href=checkNull(data.blog) ? data.blog :"#";

        twitter.innerText=checkNull(data.twitter_username,twitter) ?`${data.twitter_username}`:"Not Available";

        twitter.href=checkNull(data.twitter_username,twitter) ? `https://twitter.com/${data.twitter_username}`:"#";

        company.innerText=checkNull(data.company,company) ? `${data.company}`:"Not Available";
    }
    else{
        noresults.style.display="block";
    }
}