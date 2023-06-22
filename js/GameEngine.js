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

  loadTableData();
});

const handleDelete = async (id) => {
  const isConfirmed = confirm("Are you confirm to delete");
  if (isConfirmed) {
    await fetch(`http://localhost:3000/games/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    loadTableData();
  }
};

const updateData = (formModal, id) => {
  formModal.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fromData = new FormData(formModal);
    const res = Object.fromEntries(fromData);
    const payload = JSON.stringify(res);
    await fetch(`http://localhost:3000/games/${id}`, {
      method: "PUT",
      body: payload,
      headers: {
        "content-type": "application/json",
      },
    });
    location.reload();
    // loadTableData();
  });
};

const cancelButtonForUpdate = (formModal) => {
  formModal.addEventListener("submit", (e) => {
    e.preventDefault();
    location.reload();
  });
};

const handleUpdate = async (id) => {
  const isConfirmed = confirm("Are you confirm to update");
  if (isConfirmed) {
    let formModal = document.querySelector(".update-modal");

    formModal.classList.add("visible");
    let getResponse = await fetch(`http://localhost:3000/games/${id}`);
    let data = await getResponse.json();

    formModal.name.value = data.game.name;
    formModal.image.value = data.game.image;
    formModal.url.value = data.game.url;
    formModal.backgroundImage.value = data.game.backgroundImage;
    formModal.header.value = data.game.header;
    formModal.ad.value = data.game.ad;
    formModal.startButton.value = data.game.startButton;
    formModal.termsAndConditions.value = data.game.termsAndConditions;

    updateData(formModal, id);
    cancelButtonForUpdate(formModal);
  }
};

window.onload = () => loadTableData();

const loadTableData = async () => {
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
            <td><a href="www.facebook.com">Game</a></td>
            <td><button type="button" style="background-color:red; cursor: pointer" onClick="handleDelete('${game._id}')">Delete</button></td>
            <td><button type="button" id="myBtn" style="background-color:yellow; cursor: pointer" onClick="handleUpdate('${game._id}')">Update</button></td>
        </tr>
    `;
  }
  placeHolder.innerHTML = out;
};
