const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://archillect.com/api/last/1?token=4817b82d-640a-4ad9-b5db-385412d0745f"

fetch(proxyurl + url).then(res => res.json())
	.then(result => {
		console.log(result)
		const { image: { original: url } } = result.pop()
		document.querySelector(".bg").src = url
		document.querySelector(".logo").style.display = "block"
		document.body.style.backgroundImage = `url(${url})`

	})

// git clone https://github.com/Rob--W/cors-anywhere.git
// cd cors-anywhere/
// npm install
// heroku create
// git push heroku master