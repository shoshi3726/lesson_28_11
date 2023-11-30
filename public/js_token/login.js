const { default: axios } = require("axios");
const { application, json } = require("express");

const init = ()=>{
    declareEvents()
}

const declareEvents = ()=>{
    let id_form = document.querySelector("#id_form");
    id_form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let body = {
            email:document.querySelector("#id_email").value,
            password:document.querySelector("#id_password").value
        }
        console.log(body);
        doApiPost(body);
    })
}

const doApiPost = async(_body)=>{
    let myUrl ="https://node-start-9yoo.onrender.com/users/login"
    try {
        let resp = await axios({
            url:myUrl,
            method:"POST",
            data:JSON.stringify(_body),
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(resp.data);
        if (resp.data.token){
            localStorage.setItem("tok", resp.data.token);
            window.location.href= "showUserInfo.html"
        }
        else{
            alert("the token didn't accepted from some reason")
        }
    }
    catch(err){
        console.log(err)
        alert("user name or password are wrong from UI")
    }
}

init();