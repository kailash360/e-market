console.log("JS integrated successfully")
let card_container = document.querySelector(".card-container")

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

        if (cart_items.length > 0) {
            document.querySelector(".empty-cart").style.display = "none"
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


            info.appendChild(title)
            info.appendChild(price)
            info.appendChild(availability)
            info.appendChild(quantity_label)
            info.appendChild(quantity)

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
}

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
            }
        })
}

calculate()
async function calculate() {
    let quantity_list = [],
        price_list = [],
        count = 0,
        sum = 0
        //Extracting count of all products
    document.querySelectorAll(".count").forEach(item => {
            if (item.value == "") {
                quantity_list.push(0)
            } else {
                quantity_list.push(parseInt(item.value))
                count += parseInt(item.value)
            }
        })
        //Extracting price of each product
    document.querySelectorAll(".price").forEach(item => {
        price_list.push(parseInt(item.innerText.split(".")[1]))
    })

    document.querySelector(".total-items").innerText = count

    //Calculating total cost
    for (var i = 0; i < price_list.length; i++) {
        sum += price_list[i] * quantity_list[i]
    }

    document.querySelector(".total-cost").innerText = sum
    document.querySelector(".total-amount").innerText = sum + 200
}