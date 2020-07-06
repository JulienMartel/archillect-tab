fetch("https://api.unsplash.com/photos/random?client_id=ZwlAH167E4UEIulH5zobX29b8MCvfj1dga_IF0iB2ik").then(res => res.json())
	.then(result => {
		console.log(result)
		const { urls: {full : url} } = result
		document.querySelector("img").src = url
	})
