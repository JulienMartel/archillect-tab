const $ = query => document.querySelector(query)


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


chrome.storage.local.get(['tv'], ({tv}) => {
  if (tv) {
    chrome.alarms.get("tv", alarm => {
      if (!alarm) {
        chrome.alarms.create("tv", {periodInMinutes: 1, when: Date.now() + 1})
      }
    })
  } else {
    chrome.alarms.get("getNewImg", alarm => {
      if (!alarm) {
        chrome.alarms.create("getNewImg", {periodInMinutes: 3, when: Date.now() + 1})
      }
    })
  }
});

const bg = $(".bg")
const logo = $(".logo")
const setNewImg = url => {
  document.body.style.backgroundImage = `url(${url})`
  bg.src = url
  logo.style.display = "block"
  $(".overlay").style.transition = "opacity 500ms"
}

const setTvTimer = () => {
  setInterval(() => {
    fetch("https://sheltered-ravine-15012.herokuapp.com/tv").then(res => res.text())
      .then(tvUrl => {
        setNewImg(tvUrl)
        chrome.storage.local.set({ tvUrl })
      })
  }, 6000);
}

document.addEventListener('DOMContentLoaded', () => {
  //check which one to do here,
  // if tv: get tv from storage => and set a timer to go get new one every 6 secs
  // if none in storage, get new one and set timer to go get new one every 6 secs

  chrome.storage.local.get(['tv'], ({tv}) => {
    $('#option').checked = tv
    if (tv) {
      chrome.storage.local.get("tvUrl", ({tvUrl}) => {
        if (!tvUrl) {
          fetch("https://sheltered-ravine-15012.herokuapp.com/tv").then(res => res.text())
          .then(tvUrl => {
            setNewImg(tvUrl)
            chrome.storage.local.set({ tvUrl })
          })
        } else {
          setNewImg(tvUrl)
        }
        setTvTimer()
      })
    } else {
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
    }
  });



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

  $('#option').addEventListener('change', ({target: { checked }}) => {
    chrome.storage.local.set({ tv: checked })
  });
});