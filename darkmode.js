// =================================
// 🌙 N PROJECT DARK MODE
// =================================



function darkMode(){


    document.body.classList.toggle("dark");



    if(
    document.body.classList.contains("dark")
    ){


        localStorage.setItem(
        "theme",
        "dark"
        );


    }

    else{


        localStorage.setItem(
        "theme",
        "light"
        );


    }



}






// ===============================
// LOAD SAVED THEME
// ===============================


window.addEventListener(
"load",
()=>{


    let theme =
    localStorage.getItem("theme");



    if(theme==="dark"){


        document.body.classList.add("dark");


    }



});``