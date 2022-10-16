const $ = query => document.querySelector(query)

// for versions
const setVersionTag = version => {
  $("a.version").textContent = version
}
const checkVersion = version => {
  chrome.storage.local.get(["version"], ({ version: currentVersion }) => {
    if (currentVersion != version) {
      // open them up to a new page
      const current = window.location.href

      window.close();
      window.open('/newupdate.html', '_blank');
      window.open(current, '_blank');
      chrome.storage.local.set({ version })
    }
  })
}
const url = chrome.runtime.getURL('./data.json');
fetch(url)
  .then((response) => response.json())
  .then(({updates}) => {
    checkVersion(updates[0].version)
    setVersionTag(updates[0].version)
  })



const bg = $(".bg")
const logo = $(".logo")
const setNewImg = url => {
  document.body.style.backgroundImage = `url(${url})`
  bg.src = url
  logo.style.display = "block"
}

chrome.storage.local.get(['src'], ({src}) => {
  if (src) {
    setNewImg(src)
  } else {
    fetch("https://archillect-recent.vercel.app")
      .then(res => res.json())
      .then(({ src }) => {
        setNewImg(src)
        chrome.storage.local.set({ src })
      })
  }
})