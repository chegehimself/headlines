 	// let API_KEY = '7716a0e9d1884187aeba1ce0a4178f3d';

 	let news_url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7716a0e9d1884187aeba1ce0a4178f3d';
      fetch(news_url)
      .then((res) => res.json())
      .then((data) => {
      	console.log(data);
        let output = '<h2 class="mb-4">Posts</h2>';
        each = data.articles;
        each.forEach(function(post){
          output += `
            <div class="card card-body mb-3">
              <h3>${post.title}</h3>
              <p>${post.description}</p>
              <p><em>Written by:</em> ${post.author}</p>
              <p><a href="${post.url}" target="_blank">Read More</a></p>
              <img src="${post.urlToImage}" alt="image for news headlines" height="350" width="auto">
            </div>
          `;
        });
        document.getElementById('output').innerHTML = output;
      })
