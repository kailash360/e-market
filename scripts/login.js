//Functions to toggle between signup and login
function toggleSignup() {
    document.getElementById("login-toggle").style.background = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.background = "linear-gradient(to top left,#FA24FA, #6609B8)";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "flex";
    document.querySelector(".body").style.backgroundSize = "contain";
}

function toggleLogin() {
    document.getElementById("login-toggle").style.background = "linear-gradient(to top left,#FA24FA, #6609B8)";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.background = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.querySelector(".body").style.backgroundSize = "cover";
}

//Function to sign up a customer
async function customer_signup() {
    let fullname = document.getElementById("sign-up-fullname").value
    let email = document.getElementById("sign-up-email").value
    let username = document.getElementById("sign-up-username").value
    let phone = document.getElementById("sign-up-phone").value
    let add1 = document.getElementById("sign-up-add1").value
    let add2 = document.getElementById("sign-up-add2").value
    let password = document.getElementById("sign-up-password").value
    let confirm_password = document.getElementById("sign-up-confirm-password").value

    //Making necessary checks
    if (fullname == "" || phone == "" || email == "" || username == "" || add1 == "" || add2 == "" || password == "" || confirm_password == "") {
        alert("Fields cannot be empty")
        return
    }
    if (password != confirm_password) {
        alert("Passwords do not match")
        return
    }

    //JSON Object to be sent
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(({ fullname, email, username, phone, add1, add2, password }))
    }

    //Signing up the user
    await fetch("/customer-sign-up", params)
        .then(response => {
            if (response.status == 402) {
                alert("Username or Email already registered")
            } else {
                window.location = "/signed-up"
            }
        })
}


//Functions to login a customer
async function customer_login(e) {

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    //Checking if any field is empty
    if (username == "" || password == "") {
        alert("Username or Password cannot be empty!");
        return
    }

    //Making the object to be sent
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(({ username, password }))
    }

    //Verifying the credentials
    await fetch("/verify-customer", params)
        .then(response => {
            if (response.status == 200) {
                return response.json()
            } else {
                window.location = "/invalid-login"
            }
        }).then(response => {
            response = JSON.parse(JSON.parse(response))
            window.localStorage.setItem("token", `${response.token}`)
            window.location = "/home"
        })
}

//Function to sign up a seller
async function seller_signup() {
    let business_name = document.getElementById("sign-up-fullname").value
    let email = document.getElementById("sign-up-email").value
    let username = document.getElementById("sign-up-username").value
    let phone = document.getElementById("sign-up-phone").value
    let office_add = document.getElementById("sign-up-add1").value
    let home_add = document.getElementById("sign-up-add2").value
    let password = document.getElementById("sign-up-password").value
    let confirm_password = document.getElementById("sign-up-confirm-password").value

    //Making necessary checks
    if (business_name == "" || phone == "" || email == "" || username == "" || office_add == "" || home_add == "" || password == "" || confirm_password == "") {
        alert("Fields cannot be empty")
        return
    }
    if (password != confirm_password) {
        alert("Passwords do not match")
        return
    }

    //JSON Object to be sent
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(({ business_name, email, username, phone, office_add, home_add, password }))
    }

    //Signing up the user
    await fetch("/seller-signup", params)
        .then(response => {
            if (response.status == 402) {
                alert("Username or Email already registered")
            } else {
                window.location = "/seller-signed-up"
            }
        })
}


//Function to login a seller
async function seller_login(e) {

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    //Checking if any field is empty
    if (username == "" || password == "") {
        alert("Username or Password cannot be empty!");
        return
    }

    //Making the object to be sent

    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(({ username, password }))
    }

    //Verifying the credentials
    await fetch("/verify-seller", params)
        .then(response => {
            if (response.status == 200) {
                return response.json()
            } else {
                window.location = "/invalid-login"
            }
        }).then(response => {
            response = JSON.parse(JSON.parse(response))
            window.localStorage.setItem("token", `${response.token}`)
            window.location = "/seller-products"
        })
}