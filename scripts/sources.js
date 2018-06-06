// let API_KEY = '7716a0e9d1884187aeba1ce0a4178f3d';

let sources_url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;

let req_source = new Request(sources_url);

fetch(req_source)
      .then((response) => response.json())
      .then((fetched_res) => {
      	console.log(fetched_res);

      	// variable  to contain all options
      	let options;
      	// place holder for countries
      	source = fetched_res.sources;
      	source.forEach(function(post){
      		options += `
			<option>${post.name}</option>
      		`;
      	});
      	// insert available countries to the html page
      	availabelCountries = ["ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg","fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma","mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs","ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve", "za"]; 

      	for (let i in availabelCountries) {
      		countries += `
      		<option>${availabelCountries[i]}</option>
      		`;
      	}
      	
      	document.getElementById('allsources').innerHTML = options;
      	document.getElementById('countries').innerHTML = countries;
      	})
