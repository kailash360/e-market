//Fetching pre-required elements
let save_change_btn = document.querySelector(".save-change-btn")
let edit_name_btn = document.getElementById("edit-name-btn")
let user_name = document.getElementById("user-name")


display_seller_data()

//Fetch user data
async function display_seller_data() {
    await fetch("/seller-data", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
    }).then(response => {
        return response.json()
    }).then(response => {

        //Showing data of the customer in profiles page
        let business_name = document.getElementById("user-name")
        let user_email = document.getElementById("user-email")
        let user_phone = document.getElementById("user-phone")
        let office_add = document.getElementById("user-address-1")
        let home_add = document.getElementById("user-address-2")
        let total_revenue = document.getElementById("total-revenue")
        let total_orders = document.getElementById("total-orders")

        business_name.innerText = response[0].business_name
        user_email.innerText = response[0].email
        user_phone.innerText = response[0].contact_no
        office_add.innerText = response[0].office_address
        home_add.innerText = response[0].home_address
        total_revenue.innerText = response[0].total_revenue
        total_orders.innerText = response[0].total_orders
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
    let business_name = document.getElementById("user-name")
    let user_email = document.getElementById("user-email")
    let user_phone = document.getElementById("user-phone")
    let office_address = document.getElementById("user-address-1")
    let home_address = document.getElementById("user-address-2")


    //Making necessary checks before saving changes
    if (business_name.innerText == "" || user_email.innerText == "" || user_phone.innerText == "" || office_address.innerText == "" || home_address.innerText == "") {
        alert("Fields cannot be empty")
        return
    }

    if (!((/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(user_email.innerText))) {
        alert("Invalid Email Address")
        return
    }

    if (!((/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(user_phone.innerText))) {
        alert("Invalid Contact Number")
        return
    }

    userBusinessName = business_name.innerText
    userEmail = user_email.innerText
    userPhone = user_phone.innerText
    office_add = office_address.innerText
    home_add = home_address.innerText

    //Sending new data to the database
    await fetch("/update-seller-data", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userBusinessName, userEmail, userPhone, office_add, home_add }),
    }).then(response => {
        if (response.ok) {
            document.querySelector('.name-section').style.border = "transparent"

            elements = [business_name, user_email, user_phone, office_address, home_address]
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

async function logout() {
    window.localStorage.removeItem("token")
    window.location.href = "/seller-login"
}