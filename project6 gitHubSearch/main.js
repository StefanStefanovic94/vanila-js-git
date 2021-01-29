function handler() {
    var input = document.querySelector("input").value;
    var main = document.querySelector("main")
    var urlOne = "https://api.github.com/search/users?q="
    var div = document.querySelector("div")


    var request = $.ajax({
        url: urlOne + input,
        method: "GET",
        data: { id: 1 },
        dataType: "html"
    });
    request.done(function(url) {
        console.log(url)
        var data = JSON.parse(url);
        main.innerHTML = "";
        div.innerHTML = "";
        for (var i = 0; i < data.items.length; i++) {
            var img = document.createElement("img")
            var name = document.createElement("p")
            var divv = document.createElement("div")
            divv.className = "user"
            img.setAttribute("src", data.items[i].avatar_url)
            name.textContent = data.items[i].login
            divv.appendChild(img)
            divv.appendChild(name)
            div.appendChild(divv)
            main.appendChild(div)
        }
        clickk();
    });

}

function clickk() {
    $(".user").on("click", function(event) {
        var user = event.currentTarget.querySelector('p').textContent;
        var request1 = new XMLHttpRequest();
        request1.open("GET", "https://api.github.com/users/" + user + "/repos");
        request1.send();

        request1.onload = function() {
            var data = JSON.parse(request1.responseText);
            var section = document.querySelector("section");
            section.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                var divR = document.createElement("div");
                divR.textContent = data[i].name;
                section.appendChild(divR)
            }
        }
    })
}






var search = document.querySelector("button")
search.addEventListener("click", handler)