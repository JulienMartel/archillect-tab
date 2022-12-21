// @ts-nocheck
const $ = (query) => document.querySelector(query);

const setNewImg = (src) => {
  document.body.style.backgroundImage = `url(${src})`;
  $(".bg").src = src;
  $(".logo").style.display = "block";
};

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

chrome.storage.local.get(["src"], async ({ src }) => {
  if (src) setNewImg(src);
  else {
    const key = await getKey();

    if (!key) return;

    try {
      const res = await fetch("https://api.aw.jubag.dev/recent/1?b64=true", {
        headers: { "x-api-key": key },
      });
      const json = await res.json();

      const [{ src }] = json;

      setNewImg(src);
      chrome.storage.local.set({ src });
    } catch (err) {
      console.log(err);
    }
  }
});

fetch(chrome.runtime.getURL("../updates.json"))
  .then((response) => response.json())
  .then(({ updates }) => {
    const { version = "0.0.0" } = updates[0];
    $("a.version").textContent = version;
  });
