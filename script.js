// =================================
// 💖 N PROJECT SCRIPT
// =================================


// ===============================
// LOGIN
// ===============================


const LOGIN = "admin";
const PASSWORD = "12345";



function login(){


const user =
document.getElementById("username").value;


const pass =
document.getElementById("password").value;



if(user === LOGIN && pass === PASSWORD){



const loginPage =
document.getElementById("loginPage");


const homePage =
document.getElementById("homePage");



loginPage.classList.add("hide-login");



setTimeout(()=>{


loginPage.style.display="none";


homePage.style.display="flex";


homePage.classList.add("show-home");



startClock();


loadImages();



},1000);



}

else{


document.getElementById("error").innerHTML=

"❌ Login yoki parol xato!";


}



}







// ===============================
// LOGOUT
// ===============================


function logout(){


document.getElementById("homePage")
.style.display="none";


document.getElementById("loginPage")
.style.display="flex";


}









// ===============================
// CLOCK
// ===============================


function startClock(){


setInterval(()=>{


let now = new Date();



document.getElementById("clock")
.innerHTML =
now.toLocaleTimeString();



document.getElementById("date")
.innerHTML =
now.toLocaleDateString();



},1000);


}









// ===============================
// IMAGE SYSTEM
// ===============================


const imageInput =
document.getElementById("imageInput");


const gallery =
document.getElementById("gallery");





if(imageInput){



imageInput.addEventListener("change",()=>{



let files=imageInput.files;



let images =
JSON.parse(localStorage.getItem("images"))
|| [];





Array.from(files).forEach(file=>{


let reader=new FileReader();



reader.onload=function(e){



images.push(e.target.result);



localStorage.setItem(
"images",
JSON.stringify(images)
);



loadImages();



};



reader.readAsDataURL(file);



});



});



}










function loadImages(){



if(!gallery)return;



gallery.innerHTML="";



let images =
JSON.parse(localStorage.getItem("images"))
|| [];




images.forEach((src,index)=>{



let box =
document.createElement("div");


box.className="image-box";



let img =
document.createElement("img");



img.src=src;


img.className="gallery-image";



img.onclick=function(){


openImage(src);


};





let del =
document.createElement("button");



del.innerHTML="🗑️ Delete";


del.className="delete-btn";



del.onclick=function(){


deleteImage(index);


};




box.appendChild(img);


box.appendChild(del);



gallery.appendChild(box);



});



}









function deleteImage(index){



let images =
JSON.parse(localStorage.getItem("images"))
|| [];



images.splice(index,1);



localStorage.setItem(
"images",
JSON.stringify(images)
);



loadImages();



}










// ===============================
// IMAGE VIEWER
// ===============================


function openImage(src){


let viewer =
document.getElementById("imageViewer");


let big =
document.getElementById("bigImage");



big.src=src;



viewer.style.display="flex";


}






function closeImage(){


document.getElementById("imageViewer")
.style.display="none";


}










// ===============================
// MUSIC
// ===============================


const music =
document.getElementById("music");



let playing=false;




function toggleMusic(){



if(!playing){



music.play()

.then(()=>{



playing=true;



document.querySelector(".music-btn")
.innerHTML="⏸ Stop Music";



})

.catch(()=>{


alert(
"music.mp3 topilmadi"
);


});




}

else{


music.pause();


playing=false;



document.querySelector(".music-btn")
.innerHTML="🎵 Music";


}



}









// ===============================
// VOLUME
// ===============================



const volume =
document.getElementById("volume");



if(volume){



volume.addEventListener("input",()=>{


music.volume =
volume.value;



});


}









// ===============================
// SECRET MESSAGE
// ===============================



function showMessage(){


document.getElementById("popup")
.style.display="flex";


}



function closePopup(){


document.getElementById("popup")
.style.display="none";


}









// ===============================
// ✨ MAGIC WISH
// ===============================



const wishes=[


"💖 Har kuning baxtli o'tsin 🌸",

"✨ Orzularing amalga oshsin 💕",

"🌹 Tabassuming doimo chiroyli bo'lsin",

"🦋 Hayoting ranglarga boy bo'lsin",

"💎 Sen juda qadrlisan 💖"


];






function makeWish(){



let box =
document.getElementById("wishBox");



let text =
wishes[
Math.floor(Math.random()*wishes.length)
];



box.innerHTML=text;



box.classList.add("show");



createWishHearts();



setTimeout(()=>{


box.classList.remove("show");


},3000);



}







function createWishHearts(){



for(let i=0;i<15;i++){



let heart =
document.createElement("div");



heart.innerHTML="💗";


heart.className="heart";



heart.style.left =
Math.random()*100+"vw";



heart.style.bottom="0";



document.body.appendChild(heart);



setTimeout(()=>{


heart.remove();


},3000);



}



}










// ===============================
// LOADING
// ===============================


window.addEventListener("load",()=>{


setTimeout(()=>{


let loader =
document.getElementById("loader");



if(loader){


loader.style.display="none";


}



},2000);



});









// ===============================
// ENTER LOGIN
// ===============================



document.addEventListener("keydown",(e)=>{


if(e.key==="Enter"){


login();


}


});