fetch_history()

//Function to fetch the purchase history of a customer
async function fetch_history() {
    fetch("/history", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
        }).then(response => response.json())
        .then(history => {
            if (history.length > 0) {
                document.querySelector(".empty-list").style.display = "none"
                document.querySelector(".product-heading-container").classList.remove("empty")
            }

            //Sample HTML of a row
            // <li class="product-item hover">
            //     <p class="item-name">iPhone</p>
            //     <p class="item-quantity">2</p>
            //     <p class="item-price">10000</p>
            //     <p class="item-additional-info">10/12/2900</p>
            // </li>

            let list = document.querySelector(".product-name-list")
            history.forEach(element => {
                console.log(element)
                let item = document.createElement("li")
                item.classList.add("product-item")
                item.classList.add("hover")

                let item_name = document.createElement("p")
                item_name.classList.add("item-name")
                item_name.innerText = element.product_name
                item.appendChild(item_name)

                let item_quantity = document.createElement("p")
                item_quantity.classList.add("item-quantity")
                item_quantity.innerText = element.quantity
                item.appendChild(item_quantity)

                let item_price = document.createElement("p")
                item_price.classList.add("item-price")
                item_price.innerText = element.price
                item.appendChild(item_price)

                let item_date = document.createElement("p")
                item_date.classList.add("item-additional-info")
                item_date.innerText = element.date_of_purchase.slice(0, 10)
                item.appendChild(item_date)

                list.appendChild(item)
                list.innerHTML += "<hr>"

            })
        })
}