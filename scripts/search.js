function searchFunc() {
// set articles to null first
delete articles;
let searchMe = $('#searchMe').val();
console.log(searchMe);
let API_KEY = '7716a0e9d1884187aeba1ce0a4178f3d';

let newsUrl = `https://newsapi.org/v2/top-headlines?q=${searchMe}&apiKey=${API_KEY}`;

let qRequest = new Request(newsUrl);
fetch(qRequest).then((response) => response.json())
      .then((fetched_data) => {
	console.log(fetched_data);

	let matchingArticle = '<h2 class="mb-4">News Articles</h2>';
        each = fetched_data.articles;
        each.forEach(function(post){
          matchingArticle += `
            <div class="card card-body mb-3">
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <p><em>Written by:</em> ${post.author}</p>
              <p><a href="${post.url}" target="_blank">Read More</a></p>
              <img src="${post.urlToImage}" alt="image for news headlines" height="350" width="auto">
            </div>
          `;
        });
        document.getElementById('article').innerHTML = matchingArticle;

})
}