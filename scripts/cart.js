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
                        <p class="color">White</p>
                        <p class="price">Rs. 540</p>
                        <p class="availability">Available</p>
                    </div>
                    <span class="button-section">
                        <button class="buy-now" id="buy-now" type="button">BUY NOW</button>
                        <button class="delete-from-cart" type="button"><i class="fas fa-trash"></i></button>
                    </span>
                </div>
            </div>
        */


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

            let description = document.createElement("p")
            description.classList.add("availability")
            description.innerText = element.product_info

            info.appendChild(title)
            info.appendChild(price)
            info.appendChild(description)

            //Button section
            let btn_section = document.createElement("span")
            btn_section.classList.add("button-section")

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
            btn_section.appendChild(buy_now)
            btn_section.appendChild(del_from_cart_btn)

            //Adding these to info
            item_info.appendChild(info)
            item_info.appendChild(btn_section)

            //Add to info-item to card 
            cart_item.appendChild(item_info)

            //Add to crd container
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
            document.querySelector(".card-container").removeChild(cart_item)
        })
}