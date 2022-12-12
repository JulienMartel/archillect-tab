// @ts-nocheck

//make sure the alarm is set
chrome.alarms.get("getNewImg", (alarm) => {
  if (alarm) return;

  chrome.alarms.create("getNewImg", {
    periodInMinutes: 10,
    when: Date.now() + 1,
  });
});

const getKey = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["key"], ({ key }) => {
      if (key) resolve(key);
      else {
        console.log("no key");
      }
    });
  });
};

chrome.alarms.onAlarm.addListener(async () => {
  const key = await getKey();

  try {
    const res = await fetch(
      "https://api.aw.jubag.dev/recent/1?b64=true",
      // "https://archillect-tab-m4di9eizm-jubag.vercel.app/recent/1?b64=true",
      {
        headers: { "x-api-key": key || "" },
      }
    );
    const [{ src }] = await res.json();

    chrome.storage.local.set({ src });
  } catch (err) {
    console.log(err);
  }
});
