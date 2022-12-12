// @ts-nocheck
// for versions, loaded by newtab.html

const setVersionTag = (version) => {
  $("a.version").textContent = version;
};
const checkVersion = (version) => {
  chrome.storage.local.get(["version"], ({ version: currentVersion }) => {
    if (currentVersion != version) {
      // open them up to a new page
      const current = window.location.href;

      window.close();
      window.open("../pages/newupdate.html", "_blank");
      window.open(current, "_blank");
      chrome.storage.local.set({ version });
    }
  });
};
const url = chrome.runtime.getURL("../updates.json");
fetch(url)
  .then((response) => response.json())
  .then(({ updates }) => {
    checkVersion(updates[0].version);
    setVersionTag(updates[0].version);
  });
