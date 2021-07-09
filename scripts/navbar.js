//Hamburger function for navbar
document.querySelector(".fa-bars").addEventListener("click", () => {
    let menu = document.querySelector(".menu-list-responsive")
    if (menu.style.display == "none") {
        menu.style.display = "flex"
        document.querySelector(".navbar").style.height = "145px"
        document.querySelector(".search-container").style.marginTop = "12rem"
    } else {
        menu.style.display = "none"
        document.querySelector(".navbar").style.height = "40px"
        document.querySelector(".search-container").style.marginTop = "4rem"

    }
})