// @ts-nocheck

//make sure the alarm is set
chrome.alarms.get("getNewImg", (alarm) => {
  if (alarm) return;

  chrome.alarms.create("getNewImg", {
    periodInMinutes: 10,
    when: Date.now() + 1,
  });
});

//show new updates
chrome.runtime.onInstalled.addListener(({ reason }) => {
  const { UPDATE, INSTALL } = chrome.runtime.OnInstalledReason;

  if (reason === UPDATE) {
    chrome.tabs.create({
      url: "../pages/newupdate.html",
    });
  } else if (reason === INSTALL) {
    chrome.tabs.create({
      url: "../pages/popup.html",
    });
  }
});

// for fast-updating
chrome.runtime.onUpdateAvailable.addListener(() => chrome.runtime.reload());

const getKey = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["key"], ({ key }) => {
      if (key) resolve(key);
      else {
        console.log("no key");
        resolve(false);
      }
    });
  });
};

chrome.alarms.onAlarm.addListener(async () => {
  const key = await getKey();

  if (!key) return;

  try {
    const res = await fetch("https://api.aw.jubag.dev/random/1?b64=true", {
      headers: { "x-api-key": key },
    });
    const [{ src }] = await res.json();

    chrome.storage.local.set({ src });
  } catch (err) {
    console.log(err);
  }
});
