console.log("JS File integrated successfully!")

//Fetching pre-required elements
let save_change_btn = document.querySelector(".save-change-btn")
let edit_name_btn = document.getElementById("edit-name-btn")
let user_name = document.getElementById("user-name")

// Editing the user name 
let edit_mode = false;
edit_name_btn.addEventListener("click", () => {
    edit_mode = true;
    if (edit_mode) {
        user_name = document.getElementById("user-name")
        user_name.contentEditable = true;
        save_change_btn.classList.remove("hide-btn")
        document.querySelector(".name-section").style.borderBottom = "1px solid white"
    }
})

//Editing email
let edit_email_btn = document.getElementById("edit-email-btn")
let user_email = document.getElementById("user-email")
edit_email_btn.addEventListener("click", () => {
    console.log("edit email clicked")
    edit_mode = true;
    if (edit_mode) {
        user_email = document.getElementById("user-email")
        user_email.contentEditable = true;
        save_change_btn.classList.remove("hide-btn")
        user_email.style.backgroundColor = "#f3f3f3"
    }
})

//Editing phone
let edit_phone_btn = document.getElementById("edit-phone-btn")
let user_phone = document.getElementById("user-phone")
edit_phone_btn.addEventListener("click", () => {
    console.log("edit phone clicked")
    edit_mode = true;
    if (edit_mode) {
        user_phone = document.getElementById("user-phone")
        user_phone.contentEditable = true;
        save_change_btn.classList.remove("hide-btn")
        user_phone.style.backgroundColor = "#f3f3f3"
    }
})

//Editing address
let edit_address_btn = document.getElementById("edit-address-btn")
let user_address_list = document.querySelectorAll(".user-address")
edit_address_btn.addEventListener("click", () => {
    console.log("edit address clicked")
    edit_mode = true;
    if (edit_mode) {
        user_address_list.forEach((user_address) => {
            user_address.contentEditable = true;
            save_change_btn.classList.remove("hide-btn")
            user_address.style.backgroundColor = "#f3f3f3"
            user_address.style.padding = "0.1em 1em"
        })
    }
})



//Saving the changes
save_change_btn.addEventListener("click", () => {
    if (edit_mode) {
        user_name.contentEditable = false;
        user_name.style.border = "0px"

        user_email.contentEditable = false;
        user_email.style.backgroundColor = "transparent"

        user_phone.contentEditable = false;
        user_phone.style.backgroundColor = "transparent"

        user_address_list.forEach((user_address) => {
            user_address.contentEditable = false;
            user_address.style.backgroundColor = "transparent"
        })

        edit_mode = false;
        setTimeout(() => {
            save_change_btn.classList.add("hide-btn")
        }, 10);
    }
})