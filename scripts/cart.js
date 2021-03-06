let card_container = document.querySelector(".card-container")
let sum = 0,
    seller_amount_list = [],
    seller_list = [],
    product_price_list = [];


show_cart_items()
async function show_cart_items() {

    //Fetch the products in the cart
    card_container.innerHTML = ""
    await fetch("/cart-products", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
    }).then((response) => {
        return response.json()
    }).then((cart_items) => {

        //Sample HTML of a cart item
        /* <div class="card-item">
            <div class="item-image">
                <img src="../static/media/sample-product.png" alt="">
            </div>
            <div class="item-info">
                <div class="info">
                    <p class="title">Common Projects Bball High </p>
                    <p class="price">Rs. 540</p>
                    <p class="availability">Hurry,only 4 left!</p>
                    <label for="count" class="count-label">Quantity</label>
                    <input type="number" name="count" class="count" min="0">
                </div>
            </div>
            <span class="btn-section-1"><button class="delete-from-cart" type="button"><i class="fas fa-trash"></i></button></span>
            <span class="btn-section-2"><button class="buy-now" id="buy-now" type="button">BUY NOW</button></span>
        </div>
        */

        //Check if there are products in the cart
        if (cart_items.length > 0) {
            document.querySelector(".empty-cart").style.display = "none"
            document.querySelector(".calculation-container").style.display = "grid"
            document.querySelector(".checkout-btn-section").style.display = "block"
        }

        cart_items.forEach(element => {

            //Making a card item
            let cart_item = document.createElement("div")
            cart_item.classList.add("card-item")

            //Adding image
            let item_image = document.createElement("div")
            item_image.classList.add("item-image")

            let img = document.createElement("img")
            img.src = "../static/media/sample-product.png"
            item_image.appendChild(img)

            cart_item.appendChild(item_image)

            //Item-info div
            let item_info = document.createElement("div")
            item_info.classList.add("item-info")

            //Info div and it's children
            let info = document.createElement("div")
            info.classList.add("info")

            let title = document.createElement("p")
            title.classList.add("title")
            title.innerText = element.product_name

            let price = document.createElement("p")
            price.classList.add("price")
            price.innerText = "Rs." + element.product_price

            let availability = document.createElement("p")
            availability.classList.add("availability")

            if (element.product_quantity == 0) {
                availability.innerText = `Out of stock!`
                availability.style.backgroundColor = "#e6054c"
            } else if (element.product_quantity < 10) {
                availability.innerText = `Hurry, only ${element.product_quantity} left!`
                availability.style.backgroundColor = "#cece0a"
            }

            let quantity = document.createElement("input")
            quantity.classList.add("count")
            quantity.name = "count"
            quantity.type = "number"
            quantity.min = "0"
            quantity.value = "1"
            quantity.addEventListener("input", () => {
                if (quantity.value > element.product_quantity) {
                    alert(`Only ${element.product_quantity} units of ${element.product_name} are available`)
                    quantity.value = ""
                    return
                }
                calculate()
            })

            let quantity_label = document.createElement("label")
            quantity_label.classList.add("count-label")
            quantity_label.for = "count"
            quantity_label.innerText = "Quantity"

            let seller = document.createElement("p")
            seller.classList.add("seller")
            seller.innerText = element.seller_username

            info.appendChild(title)
            info.appendChild(price)
            info.appendChild(availability)
            info.appendChild(quantity_label)
            info.appendChild(quantity)
            info.appendChild(seller)

            //Adding these to info
            item_info.appendChild(info)

            //Add to info-item to card 
            cart_item.appendChild(item_info)

            //Button section 1
            let btn_section_1 = document.createElement("span")
            btn_section_1.classList.add("btn-section-1")

            //Button section 2
            let btn_section_2 = document.createElement("span")
            btn_section_2.classList.add("btn-section-2")

            //Buy-Now button 
            let buy_now = document.createElement("button")
            buy_now.classList.add("buy-now")
            buy_now.type = "button"
            buy_now.innerText = "BUY NOW"
            buy_now.addEventListener("click", () => {
                window.location.href = "/payment"
            })

            //Delete from cart button
            let del_from_cart_btn = document.createElement("button")
            del_from_cart_btn.classList.add("delete-from-cart")
            del_from_cart_btn.type = "button"
            del_from_cart_btn.innerHTML = '<i class="fas fa-trash"></i>'
            del_from_cart_btn.addEventListener("click", () => {
                delete_cart_item(cart_item, element.product_name)
            })

            //adding these to button section
            btn_section_2.appendChild(buy_now)
            btn_section_1.appendChild(del_from_cart_btn)

            //Adding these to info
            cart_item.appendChild(btn_section_1)
            cart_item.appendChild(btn_section_2)

            //Add to card container
            card_container.appendChild(cart_item)
        });
    })
    calculate()
}

//To delete an item in the cart
async function delete_cart_item(cart_item, name) {
    await fetch("/delete-from-cart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(({ name }))
        })
        .then(response => {
            let x = document.querySelector(".card-container")
            x.removeChild(cart_item)
            calculate()
            if (x.innerHTML == "") {
                document.querySelector(".empty-cart").style.display = "block"
                document.querySelector(".calculation-container").style.display = "none"
                document.querySelector(".checkout-btn-section").style.display = "none"
            }
        })
}

// Function to calculate the amounts
async function calculate() {
    let price_list = [],
        count_list = [],
        count = 0;
    sum = 0
    seller_amount_list = []
    seller_list = []
    product_price_list = []

    //Making the list of sellers and their amounts
    let prices = document.querySelectorAll(".price")
    let counts = document.querySelectorAll(".count")
    let sellers = document.querySelectorAll(".seller")

    for (let i = 0; i < sellers.length; i++) {
        if (seller_list.includes(sellers[i].innerText)) {
            seller_amount_list[seller_list.indexOf(sellers[i].innerText)] += parseInt((prices[i].innerText.split("."))[1]) * parseInt(counts[i].value)
        } else {
            seller_list.push(sellers[i].innerText)
            seller_amount_list.push(parseInt(prices[i].innerText.split(".")[1]) * parseInt(counts[i].value))
        }
        product_price_list.push(parseInt(prices[i].innerText.split(".")[1]) * parseInt(counts[i].value))
    }

    //Extracting count of all products
    counts.forEach(item => {
        if (item.value == "") {
            count_list.push(0)
        } else {
            count_list.push(parseInt(item.value))
            count += parseInt(item.value)
        }
    })

    //Extracting price of each product
    prices.forEach(item => {
        price_list.push(parseInt(item.innerText.split(".")[1]))
    })

    document.querySelector(".total-items").innerText = count

    //Calculating total cost
    for (var i = 0; i < price_list.length; i++) {
        sum += price_list[i] * count_list[i]
    }

    document.querySelector(".total-cost").innerText = sum
    document.querySelector(".total-amount").innerText = sum + 200
}

//Finally purchasing items
async function purchased() {
    calculate()

    if (!document.getElementById("terms").checked) {
        alert("Please agree to our Terms and Conditions")
        return
    }

    //Extract the values to be sent
    let name_list = document.querySelectorAll(".title")
    let count_list = document.querySelectorAll(".count")
    let list1 = new Array()
    let list2 = new Array()
    for (i in name_list) {
        list1.push(name_list[i].innerText)
        list2.push(count_list[i].value)
    }
    const product_name_list = list1.filter(item => item != undefined)
    const product_quantity_list = list2.filter(item => item != undefined)

    fetch("/checkout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(({ product_name_list, product_quantity_list, product_price_list, sum, seller_amount_list, seller_list }))
    })

    window.location.href = "/payment"
}