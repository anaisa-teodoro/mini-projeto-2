const addList = document.getElementById("add-list");
const includeInput = document.getElementById("input-include");
const newsToday = document.getElementById("newsToday");

let listaInteresses = [];

function include() {
  const addInput = document.getElementById("input-include").value;
  if (addInput.trim() !== "") {

    listaInteresses.push(addInput);
    localStorage.setItem("meusInteresses", JSON.stringify(listaInteresses));
    const addElement = document.createElement("li");
    addElement.className = "list-group-item";
    addElement.textContent = addInput; 
    addList.appendChild(addElement);
    includeInput.value = "";
  }
}

includeInput.addEventListener("keypress", function (event) {
  
  if (event.key === "Enter") {
  event.preventDefault();
  
    include();
  }
});

function listClear() {
  addList.innerHTML = "";
  localStorage.removeItem("meusInteresses");
  listaInteresses = []; 
}

function listLoad() {
  addList.innerHTML = "";
  if (localStorage.getItem("meusInteresses")) {
    listaInteresses = JSON.parse(localStorage.getItem("meusInteresses"));
    console.log(listaInteresses);
    listaInteresses.forEach((item) => {
      const addElement = document.createElement("li");
      addElement.className = "list-group-item";
      addElement.textContent = item; 
      addList.appendChild(addElement);
    });
  } else {
    console.log("Não há interesses salvos!");
  }
}
const updateList = setInterval(listLoad, 1000); 

async function getListApi() {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release"
  );
  const data = await response.json();

  const newsTodayElement = document.getElementById("newsToday");
  if (newsTodayElement) {
    const indexAleatorio = Math.floor(Math.random() * data.items.length);
    const NewsAleatoria = data.items[indexAleatorio];

    newsTodayElement.innerHTML = `<p>${NewsAleatoria.titulo}</p>`;
  }
}
function updateNews() {
  getListApi();
  setTimeout(updateNews, 10000);
}

getListApi();
updateNews();
