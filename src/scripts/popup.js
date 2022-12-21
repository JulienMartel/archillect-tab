// @ts-nocheck
const checkForKey = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["key"], ({ key }) => {
      resolve(key);
    });
  });
};

const saveKey = () => {
  const input = document.getElementById("key_input");

  if (input) {
    const { value: key } = input;

    chrome.storage.local.set({ key }, () => {
      document.getElementById("key_needed").style.display = "none";
      document.getElementById("key_entered").style.display = "block";
    });
  }
};

const toggleChangeKey = () => {
  document.getElementById("key_needed").style.display = "block";
  document.getElementById("key_entered").style.display = "none";
};

document.getElementById("save_key_button").addEventListener("click", saveKey);
document
  .getElementById("change_key_button")
  .addEventListener("click", toggleChangeKey);

checkForKey().then((response) => {
  if (response) {
    document.getElementById("key_needed").style.display = "none";
    document.getElementById("key_entered").style.display = "block";
  }
});
