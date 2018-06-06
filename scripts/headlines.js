 let news_url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
  let req = new Request(news_url);
      fetch(req)
      .then((response) => response.json())
      .then((fetched_data) => {
        console.log(fetched_data);
        let article = '<h2 class="mb-4">News Articles</h2>';
        each = fetched_data.sources;
        each.forEach(function(post){
          article += `
            <div class="card card-body mb-3">
              <h3>${post.name}</h3>
              <p>${post.description}</p>
              <p><em>Category:</em> ${post.category}</p>
              <p><a href="${post.url}" target="_blank">Read More</a></p>
              
            </div>
          `;
        });
        document.getElementById('article').innerHTML = article;
      })