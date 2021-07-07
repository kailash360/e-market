//fetching elements
let add_product = document.getElementById("add-product-btn")
// let product_list = document.querySelector(".product-list")
let empty_list = document.querySelector(".empty-list")
let card_list = document.querySelector(".cardList")

show_products();

var letters = /^[A-Za-z]+$/;

//Adding product on lcicking button
add_product.addEventListener("click", async() => {

    //fetching input values from page
    let item_name = document.querySelector(".product-name").value
    let item_price = document.querySelector(".product-price").value
    let item_quantity = document.querySelector(".product-quantity").value
    let item_data = document.querySelector(".additional-data").value
    let item_category = document.querySelector(".category").value
    console.log(item_category)

    //Checking for empty fields
    if (item_name == "" || item_price == "" || item_quantity == "") {
        alert("Name, Price and Quantity cannot be empty")
        return
    }

    //Checking if price and quantity are numbers only
    if (letters.test(item_price) || letters.test(item_quantity)) {
        alert("Price and Quantity should be numbers only")
        return
    }

    //Checking if category has been selected
    if (item_category == "") {
        alert("Please select a category for the product")
        return;
    }

    //Adding product to the database
    await fetch("/add-product", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(({ item_name, item_price, item_quantity, item_data, item_category }))
    }).then(response => {
        if (response.ok) {
            console.log("Product Added successfully")
        }
    })

    show_products();
    //setting input values in the page to null
    document.querySelector(".product-name").value = ""
    document.querySelector(".product-price").value = ""
    document.querySelector(".product-quantity").value = ""
    document.querySelector(".additional-data").value = ""
    document.querySelector(".category").value = ""
})


//Function to show the products
async function show_products() {

    //Fetching product data
    await fetch("/show-products", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        },
    }).then(response => {
        return response.json()
    }).then(response => {
        data = JSON.parse(JSON.stringify(response))

        //Changes before data will be displayed
        if (data.length > 0) {
            empty_list.style.display = "none"
            card_list.style.marginBottom = "30vh"
            card_list.innerText = ""
        }

        //Displaying data
        for (element of data) {
            item_name = element.product_name
            item_price = element.product_price
            item_quantity = element.product_quantity
            item_data = element.product_info

            let card = document.createElement("div")
            card.classList.add("card")

            //Adding image
            let img = document.createElement("img")
            img.src = "../static/media/sample-product.png"
            img.alt = "sample image"
            card.appendChild(img)

            let card_info = document.createElement("div")
            card_info.classList.add("cardInfo")

            //Adding divs in the card info

            //Div for name
            let div1 = document.createElement("div")
            let name_label = document.createElement("h3")
            name_label.classList.add("product-name")
            name_label.innerText = "Name:"
            let name = document.createElement("p")
            name.classList.add("name-class")
            name.innerText = item_name
            div1.appendChild(name_label)
            div1.appendChild(name)
            card_info.appendChild(div1)

            //Div for price
            let div2 = document.createElement("div")
            let price_label = document.createElement("h3")
            price_label.classList.add("product-price")
            price_label.innerText = "Price:"
            let price = document.createElement("p")
            price.classList.add("price-class")
            price.innerText = item_price
            div2.appendChild(price_label)
            div2.appendChild(price)
            card_info.appendChild(div2)

            //Div for quantity
            let div3 = document.createElement("div")
            let quantity_label = document.createElement("h3")
            quantity_label.classList.add("product-quantity")
            quantity_label.innerText = "Quantity:"
            let quantity = document.createElement("p")
            quantity.classList.add("quantity-class")
            quantity.innerText = item_quantity
            div3.appendChild(quantity_label)
            div3.appendChild(quantity)
            card_info.appendChild(div3)

            //Read more section
            let read_more = document.createElement("div")
            read_more.classList.add("addInfo")
            read_more.style.display = "none"

            //Button for read more
            let read_more_btn = document.createElement("button")
            read_more_btn.classList.add("read-more")
            read_more_btn.type = "button"
            read_more_btn.innerText = "Read more"
            read_more_btn.addEventListener("click", () => {
                if (read_more.style.display == "none") {
                    read_more.style.display = "inline";
                    read_more_btn.innerText = "See Less...";
                } else {
                    read_more.style.display = "none";
                    read_more_btn.innerText = "Read more...";
                }
            })
            card_info.appendChild(read_more_btn)

            //Additional info
            let add_info_heading = document.createElement("h3")
            add_info_heading.innerText = "Additional Information"
            let add_info = document.createElement("p")
            add_info.classList.add("add-info-child")
            add_info.innerText = item_data
            read_more.appendChild(add_info_heading)
            read_more.appendChild(add_info)
            card_info.appendChild(read_more)

            card.appendChild(card_info)

            //Addding buttons
            let card_btn = document.createElement("div")
            card_btn.classList.add("card-btns")

            let edit_btn = document.createElement("button")
            edit_btn.classList.add("edit-btn")
            edit_btn.type = "button"
            edit_btn.innerHTML = '<i class="far fa-edit"></i>'
            edit_btn.addEventListener("click", () => {
                let elements = [price, quantity, add_info]
                elements.forEach(item => {
                    item.classList.add("edit-mode")
                    item.contentEditable = true
                })
                edit_btn.style.display = "none"
                save_btn.style.display = "inline-block"
            })
            card_btn.appendChild(edit_btn)

            let delete_btn = document.createElement("button")
            delete_btn.classList.add("delete-btn")
            delete_btn.type = "button"
            delete_btn.innerHTML = '<i class="fas fa-trash"></i>'
            delete_btn.addEventListener("click", () => {
                delete_item(item_name, item_price, item_quantity, item_data)
                card_list.removeChild(card)
            })
            card_btn.appendChild(delete_btn)


            let save_btn = document.createElement("button")
            save_btn.classList.add("delete-btn")
            save_btn.style.display = "none"
            save_btn.type = "button"
            save_btn.innerHTML = '<i class="fas fa-check"></i>'
            save_btn.addEventListener("click", () => {
                let elements = [price, quantity, add_info]
                elements.forEach(x => {
                    x.classList.remove("edit-mode")
                    x.contentEditable = false
                })
                save_btn.style.display = "none"
                edit_btn.style.display = "inline-block"
                item_name = name.innerText
                item_price = price.innerText
                item_quantity = quantity.innerText
                item_data = add_info.innerText
                update_item(item_name, item_price, item_quantity, item_data)
            })
            card_btn.appendChild(save_btn)

            card.appendChild(card_btn)

            card_list.appendChild(card)



























            // item_name = element.product_name
            // item_price = element.product_price
            // item_quantity = element.product_quantity
            // item_data = element.product_info

            // //making the li element for each row
            // let item = document.createElement("li")
            // item.classList.add("item")

            // //creating children of each row
            // let product_name = document.createElement("p")
            // product_name.classList.add("name")
            // product_name.innerText = item_name
            // item.appendChild(product_name)

            // let product_price = document.createElement("p")
            // product_price.classList.add("price")
            // product_price.innerText = item_price
            // item.appendChild(product_price)

            // let product_quantity = document.createElement("p")
            // product_quantity.classList.add("quantity")
            // product_quantity.innerText = item_quantity
            // item.appendChild(product_quantity)

            // let product_info = document.createElement("p")
            // product_info.classList.add("additional-info")
            // product_info.innerText = item_data
            // item.appendChild(product_info)

            // //adding buttons and their event-listeners
            // let edit_btn = document.createElement("i")
            // edit_btn.classList.add("far")
            // edit_btn.classList.add("fa-edit")
            // edit_btn.classList.add("edit-item")
            // item.appendChild(edit_btn)
            // edit_btn.addEventListener("click", () => {

            //     let elements = [product_price, product_quantity, product_info]
            //     elements.forEach(item => {
            //         item.classList.add("edit-mode")
            //         item.contentEditable = true
            //     })
            //     edit_btn.style.display = "none"
            //     save_btn.style.display = "inline-block"
            // })

            // let save_btn = document.createElement("i")
            // save_btn.classList.add("fa-check")
            // save_btn.classList.add("save-item")
            // item.appendChild(save_btn)
            // save_btn.addEventListener("click", () => {
            //     let elements = [product_price, product_quantity, product_info]
            //     elements.forEach(x => {
            //         x.classList.remove("edit-mode")
            //         x.contentEditable = false
            //     })
            //     save_btn.style.display = "none"
            //     edit_btn.style.display = "inline-block"
            //     item_name = product_name.innerText
            //     item_price = product_price.innerText
            //     item_quantity = product_quantity.innerText
            //     item_data = product_info.innerText
            //     console.log(item_name, item_data)
            //     update_item(item_name, item_price, item_quantity, item_data)
            // })

            // let delete_btn = document.createElement("i")
            // delete_btn.classList.add("fas")
            // delete_btn.classList.add("fa-trash-alt")
            // delete_btn.classList.add("delete-item")
            // item.appendChild(delete_btn)
            // delete_btn.addEventListener("click", () => {
            //     delete_item(item_name, item_price, item_quantity, item_data)
            //     product_list.removeChild(item)
            // })

            // //adding row to the entire list
            // product_list.appendChild(item)
        }
    })
}

//Function to update an item
async function update_item(name, price, quantity, data) {

    //Make request to save the updates
    await fetch("/update-item", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(({ name, price, quantity, data }))
        })
        .then(response => {
            if (!response.ok) {
                alert("Failed to update product in the database")
            }
        })

}

//Function to delete an item
async function delete_item(name, price, quantity, data) {

    //Make request to save the updates
    await fetch("/delete-item", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("token")}`
            },
            body: JSON.stringify(({ name, price, quantity, data }))
        })
        .then(response => {
            if (!response.ok) {
                alert("Failed to update product in the database")
            }
        })
}

// //Read more function for Product's Cards :
// read_more = document.querySelector(".read-more");
// read_more.addEventListener("click", () => {
//     readMore();
// });

// function readMore() {
//     addInfo = document.querySelector(".addInfo");

//     if (addInfo.style.display == "none") {
//         addInfo.style.display = "inline";
//         read_more.innerText = "See Less...";
//     } else {
//         addInfo.style.display = "none";
//         read_more.innerText = "Read more...";
//     }
// }