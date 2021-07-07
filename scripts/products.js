const range = document.querySelector("#price-range");

range.addEventListener("input", () => {
    const bubble = document.querySelector(".bubble");
    bubble.style.display = "inline-block";

    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 10000;
    const newVal = Number(((val - min) * 100) / (max - min));
    if (newVal == 10000) {
        bubble.innerText = ">10000"
    } else {
        bubble.innerHTML = newVal * 100
    }

    setTimeout(() => {
        bubble.style.display = "none"
    }, 3000);
})

show_products()

async function show_products() {
    let product_list = document.querySelector(".product-container")
    product_list.innerHTML = ""

    let type = document.getElementById("type").value
    let price = document.getElementById("price-range").value
    let search = document.getElementById("search").value

    // HTML of a products
    /*    <div class="product">
        <div class="product-image">
            <img src="../static/media/sample-product.png" alt="">
        </div>
        <div class="product-info">
            <p class="product-name">Sunflower oil</p>
            <p class="product-price">Rs.500</p>
            <p class="product-quantity">Hurry,only 2 left!</p>
            <button class="read-more"">Read more...</button>
            <div class="addInfo">
                <p class="product-about">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                <p class="product-delivery">Delivery in 2 days</p>
            </div>
        </div>
        <div class="button-section">
            <button class="add-to-wishlist">
                <i class="fas fa-heart"></i>
            </button>
            <button class="add-to-cart">
                Add to Cart
            </button>
            <button class="buy-now">
                Buy Now
            </button>
        </div>
    </div>
    */

    await fetch("/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(({ type, price, search }))
        }).then(response => response.json())
        .then(response => {
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
                } else if (item["product_quantity"] <= 10) {
                    let product_quantity = document.createElement("p")
                    product_quantity.classList.add("product-quantity")
                    product_quantity.style.display = "flex"
                    product_quantity.innerText = `Hurry, only ${item["product_quantity"]} left!`
                    product_info.appendChild(product_quantity)
                }
                let add_info = document.createElement("div")
                add_info.classList.add("addInfo")

                //Additional info section
                let read_more_btn = document.createElement("button")
                read_more_btn.classList.add("read-more")
                read_more_btn.type = "button"
                read_more_btn.innerText = "Read more.."
                read_more_btn.addEventListener("click", () => {
                    if (add_info.style.display != "none") {
                        add_info.style.display = "none";
                        read_more_btn.innerText = "Read more..";
                    } else {
                        add_info.style.display = "inline";
                        read_more_btn.innerText = "See Less..";
                    }
                })

                let product_about = document.createElement("p")
                product_about.classList.add("product-about")
                product_about.innerText = item["product_info"]
                add_info.appendChild(product_about)

                let product_delivery = document.createElement("p")
                product_delivery.classList.add("product-delivery")
                product_delivery.innerText = "Delivery in 2 days"
                add_info.appendChild(product_delivery)

                product_info.appendChild(read_more_btn)
                product_info.appendChild(add_info)

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
                add_cart.addEventListener("click", () => {
                    let name = item["product_name"]
                    let price = item["product_price"]
                    let quantity = item["product_quantity"]
                    let info = item["product_info"]
                    if (quantity > 0) {
                        let seller_username = item["username"]
                        add_to_cart(add_cart, name, price, quantity, info, seller_username)
                    } else {
                        alert(`${name} is not available now.`)
                    }
                })
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

//Search button
/*Removing placeholder*/
let search_input = document.getElementById("search");
search.addEventListener("click", ()=>{
    search_input.placeholder = "";  
})
//Searching text
let search_btn = document.getElementById("search-btn")
search_btn.addEventListener("click", () => {
    if (document.getElementById("search").value == "") {
        alert("Please write the product you want to search")
    } else {
        show_products()
    }
})

//Function for adding to cart
async function add_to_cart(add_cart, name, price, quantity, info, seller_username) {
    await fetch("/add-to-cart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(({ name, price, quantity, info, seller_username }))
        })
        // .then(response => response.json())
        .then(response => {
            if (!response.ok) {
                alert("Item already exists in cart")
            } else {
                add_cart.innerText = "Added to cart"
                add_cart.disabled = "true"
                add_cart.style.background = "linear-gradient(45deg, #ffc800, #2cf307)"
            }
        })
}