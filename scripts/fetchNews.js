//Fetch News
//Fetch news function
async function fetchNews() {
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=12ffabb2e2614914b84a71e2e18e26b8';
    var req = new Request(url);
    var requestObj;
    var data;
    await fetch(req).then(async function (response) {
        requestObj = response.json();
    });
    await requestObj.then(function (jsonObj) { data = jsonObj; });
    console.log(data);

    for (var i = 1; i <= 9; i++) {
        if (data.articles[i].urlToImage == null) {
            document.getElementById(i.toString() + "img").setAttribute("src", "images/noimage.jpg");
        }
        else {
            document.getElementById(i.toString() + "img").setAttribute("src", data.articles[i].urlToImage);
        }
        document.getElementById(i.toString() + "title").innerHTML = data.articles[i].title;
        document.getElementById(i.toString()).setAttribute("href", data.articles[i].url);
        document.getElementById(i.toString() + "time").innerHTML = data.articles[i].publishedAt;
        document.getElementById(i.toString() + "src").innerHTML = data.articles[i].source.name;

    }
}
