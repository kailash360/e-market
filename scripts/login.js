function toggleSignup() {
    document.getElementById("login-toggle").style.background = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.background = "linear-gradient(to top left,#FA24FA, #6609B8)";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}

function toggleLogin() {
    document.getElementById("login-toggle").style.background = "linear-gradient(to top left,#FA24FA, #6609B8)";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.background = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}


async function customer_signup() {
    let email = document.getElementById("sign-up-email").value
    let username = document.getElementById("sign-up-username").value
    let password = document.getElementById("sign-up-password").value
    let confirm_password = document.getElementById("sign-up-confirm-password").value

    //Making necessary checks
    if (email == "" || username == "" || password == "" || confirm_password == "") {
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
        body: JSON.stringify(({ email, username, password }))
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
            window.location = "/profile"
        })
}

async function seller_signup() {
    let email = document.getElementById("sign-up-email").value
    let username = document.getElementById("sign-up-username").value
    let password = document.getElementById("sign-up-password").value
    let confirm_password = document.getElementById("sign-up-confirm-password").value

    //Making necessary checks
    if (email == "" || username == "" || password == "" || confirm_password == "") {
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
        body: JSON.stringify(({ email, username, password }))
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
            window.location = "/seller-profile"
        })
}