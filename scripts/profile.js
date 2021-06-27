//Fetching pre-required elements
let save_change_btn = document.querySelector(".save-change-btn")
let edit_name_btn = document.getElementById("edit-name-btn")
let user_name = document.getElementById("user-name")


display_customer_data()

//Fetch user data
async function display_customer_data() {
    await fetch("/customer-data", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
    }).then(response => {
        console.log(response)
        return response.json()
    }).then(response => {
        console.log(response)

        //Showing data of the customer in profiles page
        let user_name = document.getElementById("user-name")
        let user_email = document.getElementById("user-email")
        let user_phone = document.getElementById("user-phone")
        let user_address_1 = document.getElementById("user-address-1")
        let user_address_2 = document.getElementById("user-address-2")

        user_name.innerText = response[0].user_fullname
        user_email.innerText = response[0].email
        user_phone.innerText = response[0].contact_no
        user_address_1.innerText = response[0].address_1
        user_address_2.innerText = response[0].address_2
    })
}


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

// Function to saev changes
async function save_changes() {
    let user_fullname = document.getElementById("user-name")
    let user_email = document.getElementById("user-email")
    let user_phone = document.getElementById("user-phone")
    let user_address_1 = document.getElementById("user-address-1")
    let user_address_2 = document.getElementById("user-address-2")

    if (!((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(user_email.innerText))) {
        alert("Invalid Email Address")
        return
    }

    if (!((/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(user_phone.innerText))) {
        alert("Invalid Contact Number")
        return
    }

    userFullName = user_fullname.innerText
    userEmail = user_email.innerText
    userPhone = user_phone.innerText
    userAdd1 = user_address_1.innerText
    userAdd2 = user_address_2.innerText

    await fetch("/update-customer-data", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userFullName, userEmail, userPhone, userAdd1, userAdd2 })
    }).then(response => {
        if (response.ok) {
            document.querySelector('.name-section').style.border = "transparent"

            elements = [user_fullname, user_email, user_phone, user_address_1, user_address_2]
            elements.forEach(item => {
                item.contentEditable = false;
                item.style.backgroundColor = "transparent"
            })

            save_change_btn.classList.add("hide-btn").edit_mode = false;
        } else {
            alert("Failed to update data")
        }
    })
}