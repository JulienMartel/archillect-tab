chrome.alarms.get("getNewImg", alarm => {
  if (!alarm) {
    chrome.alarms.create("getNewImg", {periodInMinutes: 4, when: Date.now() + 1})
  }
})

const changeSetting = e => console.log(e.target.checked)

const setNewImg = url => {
  document.querySelector(".bg").src = url
  document.querySelector(".logo").style.display = "block"
  document.body.style.backgroundImage = `url(${url})`
  document.querySelector(".overlay").style.transition = "opacity 500ms"
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['url'], ({url}) => {
      if (url) {
        setNewImg(url)
      } else {
        fetch("https://sheltered-ravine-15012.herokuapp.com/recent").then(res => res.text())
          .then(url => {
            setNewImg(url)
            chrome.storage.local.set({ url })
          })
      }
  });

  chrome.storage.local.get(['v4'], ({ v4 }) => {
    if (!v4) {
      // open them up to a new page
      window.open('/newupdate.html', '_blank');
      chrome.storage.local.set({v4: true })
    }
  })

  document.querySelector('#option').addEventListener('change', changeSetting);
});