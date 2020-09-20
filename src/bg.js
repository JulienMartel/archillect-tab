chrome.alarms.onAlarm.addListener(() => {
	fetch("https://sheltered-ravine-15012.herokuapp.com/recent")
		.then(res => res.text())
		.then(url => chrome.storage.local.set({ url }))
})