console.log("JS integrated successfully")
let card_container = document.querySelector(".card-container")

//Fetch the data 
const url = "https://my-json-server.typicode.com/AnifaMd/shopping-cart/products"

fetch(url).then((response) => {
    return response.json()
}).then((cart_items) => {
    console.log(cart_items)


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
                    <button class="buy-now" id="buy-now" type="button">BUY NOW</button>
                </div>
            </div> */


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
        title.innerText = element.title

        let color = document.createElement("p")
        color.classList.add("color")
        color.innerText = element.color

        let price = document.createElement("p")
        price.classList.add("price")
        price.innerText = "Rs." + element.price

        let availability = document.createElement("p")
        availability.classList.add("availability")
        availability.innerText = element.availability

        info.appendChild(title)
        info.appendChild(color)
        info.appendChild(price)
        info.appendChild(availability)

        //Buy-Now button
        let buy_now = document.createElement("button")
        buy_now.classList.add("buy-now")
        buy_now.type = "submit"
        buy_now.innerText = "BUY NOW"

        //Adding these to info
        item_info.appendChild(info)
        item_info.appendChild(buy_now)

        //Add to info-item to card 
        cart_item.appendChild(item_info)

        //Add to crd container
        card_container.appendChild(cart_item)
    });
})