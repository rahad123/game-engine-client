let frm = document.querySelector("form");

frm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fromData = new FormData(frm);
  const res = Object.fromEntries(fromData);
  const payload = JSON.stringify(res);
  await fetch("http://localhost:3000/games", {
    method: "POST",
    body: payload,
    headers: {
      "content-type": "application/json",
    },
  });

  let getResponse = await fetch("http://localhost:3000/games");
  let data = await getResponse.json();
  let placeHolder = document.querySelector("#data-output");
  let out = "";
  for (let game of data.games) {
    out += `
        <tr>
            <td>${game.name}</td>
            <td>${game.image}</td>
            <td>${game.url}</td>
            <td>${game.backgroundImage}</td>
            <td>${game.header}</td>
            <td>${game.ad}</td>
            <td>${game.startButton}</td>
            <td>${game.termsAndConditions}</td>

        </tr>
    `;
  }
  placeHolder.innerHTML = out;
});
