const setVersionTag = (version) => {
  document.querySelector(".version").textContent = version;
};

const url = chrome.runtime.getURL("./data.json");
fetch(url)
  .then((response) => response.json())
  .then(({ updates }) => {
    renderInfo(updates);
    setVersionTag(updates[0].version);
  });

const renderInfo = (updates) => {
  const cont = document.querySelector(".cont");
  updates.forEach(({ version, whatsNew, means }, i) => {
    const h2 = document.createElement("H2");
    h2.innerText = `Version ${version + (i == 0 ? " 🎊" : "")}`;
    const h3 = document.createElement("H3");
    h3.innerText = "Whats new?";
    const ul = document.createElement("UL");

    whatsNew.forEach((n) => {
      const x = document.createElement("LI");
      x.innerText = n;
      ul.appendChild(x);
    });
    cont.appendChild(h2);
    cont.appendChild(h3);
    cont.appendChild(ul);

    if (means?.length) {
      const h3_2 = document.createElement("H3");
      h3_2.innerText = "What does this mean?";
      const ul2 = document.createElement("UL");

      means.forEach((m) => {
        const x = document.createElement("LI");
        x.innerText = m;
        ul2.appendChild(x);
      });
      cont.appendChild(h3_2);
      cont.appendChild(ul2);
    }

    const div = document.createElement("DIV");
    div.className = "divider";

    if (i !== updates.length - 1) cont.appendChild(div);
  });
};
