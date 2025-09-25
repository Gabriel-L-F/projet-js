const apiKey = "9f412309bd6e72eefbbbc660";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

function enregistrerHistorique(montant, source, cible, conversion) {
  const date = new Date().toLocaleString(); 
  const ligne = `Date : ${date} : ${montant} ${source} = ${conversion} ${cible}`;

  let historiqueData = JSON.parse(localStorage.getItem("historiqueConversions")) || [];
  historiqueData.unshift(ligne); 
  historiqueData = historiqueData.slice(0, 10); 
  localStorage.setItem("historiqueConversions", JSON.stringify(historiqueData));

  afficherHistorique();
}

function afficherHistorique() {
  const historique = document.getElementById("historique");
  historique.innerHTML = "";

  const historiqueData = JSON.parse(localStorage.getItem("historiqueConversions")) || [];
  historiqueData.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historique.appendChild(li);
  });
}

afficherHistorique();

