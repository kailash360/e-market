function pay() {
    var radios = document.getElementsByTagName('input');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            window.location.href = "/purchased"
            return
        }
    }
    alert("Please select a method of payment")
}