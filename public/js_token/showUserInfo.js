const { default: axios } = require("axios");
const { application, json } = require("express");

const init =()=>{
    doApi();
}

const doApi= async() =>{
    let myUrl= "https://node-start-9yoo.onrender.com/users/myInfo";
    let resp = await axios({
        url : myUrl,
        method:"GET",
        headers:{
            "x-api-key":localStorage['tok'],
            "content-type":"application/json"
        }
    })
    console.log(resp.data)
    if(resp.data._id){
        let item = resp.data;
        document.querySelector("id_name").innerHTML=item.name;
        document.querySelector("id_email").innerHTML=item.email;
        document.querySelector("id_role").innerHTML=item.role;
    }
}

init()