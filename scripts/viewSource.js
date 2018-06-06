function changeSource() {
    var selectBox = document.getElementById("allsources");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    // console.log("inside:"+selectedValue);
    var selectedSource = selectedValue;

     // reset cuntries selection
    $("#allsources").on("click", function () {
    $('#countries option').prop('selected', function() {
        return this.defaultSelected;
    });
    });

    // url for sources
let news_url = `https://newsapi.org/v2/top-headlines?sources=${selectedSource}&apiKey=${API_KEY}`;
let req = new Request(news_url);
    fetch(req)
    .then((response) => response.json())
    .then((fetched_data) => {
        console.log(fetched_data);
        let article = '<h2 class="mb-4">News Articles</h2>';
        each = fetched_data.articles;
        each.forEach(function(post){
          article += `
            <div class="card card-body mb-3">
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <p><em>Written by:</em> ${post.author}</p>
              <p><a href="${post.url}" target="_blank">Read More</a></p>
              <img src="${post.urlToImage}" alt="image for news headlines" height="350" width="auto">
            </div>
          `;
        });
        document.getElementById('article').innerHTML = article;
      })
}