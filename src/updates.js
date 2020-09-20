const updates = [
  {
    version: "0.0.4",
    whatsNew: [
      "Caching server stays more up to date w/ Archillect",
      "Fixed a bug that would make popup menu flash on startup on certain browsers",
      "Made myself a pipeline to deploy updates more easily from my end",
    ],
    means: [
      "Less calls from your end, same great speeds",
      "Less work to update for me🙂",
    ]
  },
  {
    version: "0.0.3",
    whatsNew: [
      "Timer to fetch new image runs more often",
      "Small UI changes",
    ],
    means: [
      "More up-to-date with the most recent image⏲️"
    ]
  },
  {
    version: "0.0.2",
    whatsNew: [
      "Images are fetched in a background script on a timer",
      "Images are being saved to & pulled from local storage for use",
      "Created a middleware server for caching, between Archillect API & the extention",
    ],
    means: [
      "Much faster speeds🔥",
      "Can support many more users before hitting the Archillect API rate limit, thanks to middleware server"
    ]
  },
]

const cont = document.querySelector(".cont")

updates.forEach(({version, whatsNew, means}, i) => {
  const h2 = document.createElement("H2")
  h2.innerText = `Version ${version + (i == 0 ? " 🎊" : "")}`
  const h3 = document.createElement("H3")
  h3.innerText = "Whats new?"
  const ul = document.createElement("UL")
  const h3_2 = document.createElement("H3")
  h3_2.innerText = "What does this mean?"
  const ul2 = document.createElement("UL")

  whatsNew.forEach(n => {
    const x = document.createElement("LI")
    x.innerText = n
    ul.appendChild(x)
  })
  means.forEach(m => {
    const x = document.createElement("LI")
    x.innerText = m
    ul2.appendChild(x)
  })

  cont.appendChild(h2)
  cont.appendChild(h3)
  cont.appendChild(ul)
  cont.appendChild(h3_2)
  cont.appendChild(ul2)

  const div = document.createElement("DIV")
  div.className = "divider"

  if (i !== updates.length - 1) cont.appendChild(div)
})