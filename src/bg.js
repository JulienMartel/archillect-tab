chrome.alarms.onAlarm.addListener(({name}) => {
	switch(name) {
		case "tv":
			fetch("https://sheltered-ravine-15012.herokuapp.com/tv")
				.then(res => res.text())
				.then(tvUrl => chrome.storage.local.set({ tvUrl }))
			break;
		case "getNewImg":
			fetch("https://sheltered-ravine-15012.herokuapp.com/recent")
				.then(res => res.text())
				.then(url => chrome.storage.local.set({ url }))
			break;
	}
})