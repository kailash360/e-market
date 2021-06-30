const range = document.querySelector("#price-range");

range.addEventListener("input", () => {
    const bubble = document.querySelector(".bubble");
    bubble.style.display = ""

    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 10000;
    const newVal = Number(((val - min) * 100) / (max - min));
    if (newVal == 10000) {
        bubble.innerText = ">10000"
    } else {
        bubble.innerHTML = newVal * 100
    }
    bubble.style.left = `calc(${newVal/10}% + (${47 - newVal * 0.015}em))`;


    setTimeout(() => {
        bubble.style.display = "none"
    }, 3000);
})

show_products()

async function show_products() {
    let product_list = document.querySelector(".product-container")

    let type = document.getElementById("type").value
    let price = document.getElementById("price-range").value

    // HTML of a product 
    /* <div class="product">
        <div class="product-image">
            <img src="../static/media/sample-product.png" alt="">
        </div>
        <div class="product-info">
            <p class="product-name">Sunflower oil</p>
            <p class="product-price">Rs.500</p>
            <p class="product-quantity">Hurry,only 2 left!</p>
            <p class="nil-product-quantity">Out of stock!</p>
            <p class="product-about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae eligendi ab facere doloribus nesciunt nemo, tempora vel blanditiis quisquam ratione.</p>
            <p class="product-delivery">Delivery in 2 days</p>

        </div>
        <div class="button-section">
            <button id="add-to-wishlist">
                <i class="fas fa-heart"></i>
            </button>
            <button id="add-to-cart">
                Add to Cart
            </button>
            <button id="buy-now">
                Buy Now
            </button>
        </div>
    </div> */

    await fetch("/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(({ type, price }))
        }).then(response => response.json())
        .then(response => {
            // response = JSON.stringify(response)
            console.log(response)
            response.forEach(item => {
                let product = document.createElement("div")
                product.classList.add("product")

                let product_image = document.createElement("div")
                product_image.classList.add("product-image")

                //Adding product image
                let img = document.createElement("img")
                img.src = "../static/media/sample-product.png"
                product_image.appendChild(img)
                product.appendChild(product_image)

                //Adding product info
                let product_info = document.createElement("div")
                product_info.classList.add("product-info")

                let product_name = document.createElement("p")
                product_name.classList.add("product-name")
                product_name.innerText = item["product_name"]
                product_info.appendChild(product_name)

                let product_price = document.createElement("p")
                product_price.classList.add("product-price")
                product_price.innerText = 'Rs.' + item["product_price"]
                product_info.appendChild(product_price)

                if (item["product_quantity"] == 0) {
                    let product_quantity = document.createElement("p")
                    product_quantity.classList.add("nil-product-quantity")
                    product_quantity.style.display = "flex"
                    product_quantity.innerText = "Out of stock!"
                    product_info.appendChild(product_quantity)
                } else {
                    let product_quantity = document.createElement("p")
                    product_quantity.classList.add("product-quantity")
                    product_quantity.style.display = "flex"
                    product_quantity.innerText = `Hurry, only ${item["product_quantity"]} left!`
                    product_info.appendChild(product_quantity)
                }

                let product_about = document.createElement("p")
                product_about.classList.add("product-about")
                product_about.innerText = item["product_info"]
                product_info.appendChild(product_about)

                let product_delivery = document.createElement("p")
                product_delivery.classList.add("product-delivery")
                product_delivery.innerText = "Delivery in 2 days"
                product_info.appendChild(product_delivery)

                //Adding buttons
                let btn_section = document.createElement("div")
                btn_section.classList.add("button-section")

                let add_wishlist = document.createElement("button")
                add_wishlist.classList.add("add-to-wishlist")
                add_wishlist.innerHTML += '<i class="fas fa-heart"></i>'
                add_wishlist.addEventListener("click", () => {
                    add_wishlist.style.color = "red"
                })
                btn_section.appendChild(add_wishlist)


                let add_cart = document.createElement("button")
                add_cart.classList.add("add-to-cart")
                add_cart.innerText = "Add to cart"
                btn_section.appendChild(add_cart)

                let buy_now = document.createElement("button")
                buy_now.classList.add("buy-now")
                buy_now.innerText = "Buy Now"
                btn_section.appendChild(buy_now)

                //Adding these sections to the product
                product.appendChild(product_image)
                product.appendChild(product_info)
                product.appendChild(btn_section)

                //Adding the product to the display list
                product_list.appendChild(product)
            })
        })
}