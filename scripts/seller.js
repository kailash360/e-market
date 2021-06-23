//fetching elements
let add_product = document.getElementById("add-product-btn")
let product_list = document.querySelector(".product-list")
let empty_list = document.querySelector(".empty-list")

//Adding product on lcicking button
add_product.addEventListener("click", () => {

    empty_list.style.display = "none"
    product_list.style.marginBottom = "30vh"

    //fetching input values from page
    let item_name = document.querySelector(".product-name").value
    let item_price = document.querySelector(".product-price").value
    let item_quantity = document.querySelector(".product-quantity").value
    let item_data = document.querySelector(".additional-data").value

    //making the li element for each row
    let item = document.createElement("li")
    item.classList.add("item")

    //creating children of each row
    let product_name = document.createElement("p")
    product_name.classList.add("name")
    product_name.innerText = item_name
    item.appendChild(product_name)

    let product_price = document.createElement("p")
    product_price.classList.add("price")
    product_price.innerText = item_price
    item.appendChild(product_price)

    let product_quantity = document.createElement("p")
    product_quantity.classList.add("quantity")
    product_quantity.innerText = item_quantity
    item.appendChild(product_quantity)

    let product_info = document.createElement("p")
    product_info.classList.add("additional-info")
    product_info.innerText = item_data
    item.appendChild(product_info)

    //adding buttons and their event-listeners
    let edit_btn = document.createElement("i")
    edit_btn.classList.add("far")
    edit_btn.classList.add("fa-edit")
    edit_btn.classList.add("edit-item")
    item.appendChild(edit_btn)
    edit_btn.addEventListener("click", () => {

        let elements = [product_name, product_price, product_quantity, product_info]
        elements.forEach(item => {
            item.classList.add("edit-mode")
            item.contentEditable = true
        })
        edit_btn.style.display = "none"
        save_btn.style.display = "inline-block"
    })

    let save_btn = document.createElement("i")
    save_btn.classList.add("fa-check")
    save_btn.classList.add("save-item")
    item.appendChild(save_btn)
    save_btn.addEventListener("click", () => {
        let elements = [product_name, product_price, product_quantity, product_info]
        elements.forEach(item => {
            item.classList.remove("edit-mode")
            item.contentEditable = false
        })
        save_btn.style.display = "none"
        edit_btn.style.display = "inline-block"
    })

    let delete_btn = document.createElement("i")
    delete_btn.classList.add("fas")
    delete_btn.classList.add("fa-trash-alt")
    delete_btn.classList.add("delete-item")
    item.appendChild(delete_btn)
    delete_btn.addEventListener("click", () => {
        product_list.removeChild(item)
    })

    //adding row to the entire list
    product_list.appendChild(item)

    //setting input values in the page to null
    document.querySelector(".product-name").value = ""
    document.querySelector(".product-price").value = ""
    document.querySelector(".product-quantity").value = ""
    document.querySelector(".additional-data").value = ""

})