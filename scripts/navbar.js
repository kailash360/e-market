let ham = document.querySelector(".fa-bars")
ham.addEventListener("click", () => {
    console.log("menu clicked")
    let menu = document.querySelector(".menu-list-responsive")
    if (menu.style.display == "none") {
        menu.style.display = "flex"
    } else {
        menu.style.display = "none"
    }
})