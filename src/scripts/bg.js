chrome.alarms.get("getNewImg", alarm => {
  if (!alarm) {
    chrome.alarms.create("getNewImg", {periodInMinutes: 10, when: Date.now() + 1})
  }
})

chrome.alarms.onAlarm.addListener(() => {
  fetch("https://archillect-recent.vercel.app")
    .then(res => res.json())
		.then(({ src }) => chrome.storage.local.set({ src }))
})