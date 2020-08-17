chrome.alarms.get("getNewImg", alarm => {
  if (!alarm) {
    chrome.alarms.create("getNewImg", {periodInMinutes: 3, when: Date.now() + 1})
    console.log("created alarm")
  }
})

const setNewImg = url => {
  document.querySelector(".bg").src = url
  document.querySelector(".logo").style.display = "block"
  document.body.style.backgroundImage = `url(${url})`
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['url'], function(result) {
    console.log(result);

      if (Object.keys(result).length === 0) {
        console.log("no url")
        fetch("https://sheltered-ravine-15012.herokuapp.com/recent").then(res => res.text())
          .then(r => {
            console.log(r)
            setNewImg(r)
            chrome.storage.local.set({ url: r })
          })
      } else {
        console.log("there is a url")
        let { url } = result

        setNewImg(url)
      }
  });

  chrome.storage.local.get(['showedWelcome'], function({ showedWelcome }) {
    console.log(showedWelcome)
    if (!showedWelcome) {
      // open them up to a new page
      window.open('/newupdate.html', '_blank');

      chrome.storage.local.set({showedWelcome: true }, function() {
        console.log('showedWelcome is set to true');
      });
    }
  })
});