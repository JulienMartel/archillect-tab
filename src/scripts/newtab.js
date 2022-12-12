// @ts-nocheck
const $ = (query) => document.querySelector(query);

const bg = $(".bg");
const logo = $(".logo");

const setNewImg = (src) => {
  document.body.style.backgroundImage = `url(${src})`;
  bg.src = src;
  logo.style.display = "block";
};

const getKey = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["key"], ({ key }) => {
      if (key) resolve(key);
      else {
        chrome.tabs.create({ url: "../pages/popup.html" });
        resolve(false);
      }
    });
  });
};

chrome.storage.local.get(["src"], async ({ src }) => {
  if (src) setNewImg(src);
  else {
    const key = await getKey();

    try {
      const res = await fetch(
        "https://api.aw.jubag.dev/recent/1?b64=true",
        // "https://archillect-tab-m4di9eizm-jubag.vercel.app/recent/1?b64=true",
        {
          headers: { "x-api-key": key || "" },
        }
      );
      const json = await res.json();

      const [{ src }] = json;

      setNewImg(src);
      chrome.storage.local.set({ src });
    } catch (err) {
      console.log(err);
    }
  }
});
