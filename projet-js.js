const apiKey = "9f412309bd6e72eefbbbc660";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function chargerDevises() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const devises = Object.keys(data.conversion_rates);

        const sourceSelect = document.getElementById("source");
        const cibleSelect = document.getElementById("cible");

        devises.forEach(code => {
            const option1 = document.createElement("option");
            option1.value = code;
            option1.textContent = code;
            sourceSelect.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = code;
            option2.textContent = code;
            cibleSelect.appendChild(option2);
        });

        sourceSelect.value = "USD";
        cibleSelect.value = "EUR";
    } catch (error) {
        console.error("Erreur lors du chargement des devises :", error);
    }
}
chargerDevises();

async function convertir() {
    const source = document.getElementById("source").value;
    const cible = document.getElementById("cible").value;
    const montant = document.getElementById("montant").value;

    if (source === cible) {
        document.getElementById("resultat").textContent = "Le taux de conversion est 1:1";
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const tauxS = data.conversion_rates[source];
        const tauxC = data.conversion_rates[cible];
        const result = (montant * (tauxC / tauxS)).toFixed(2);

        document.getElementById("resultat").textContent = `${montant} ${source} vaut ${result} ${cible}`;

        enregistrerHistorique(montant, source, cible, result);
    } catch (error) {
        document.getElementById("resultat").textContent = "Erreur lors de la conversion.";
        console.error("Erreur de conversion :", error);
    }
}

function enregistrerHistorique(montant, source, cible, conversion) {
    const date = new Date().toLocaleString();
    const ligne = `Date : ${date} : ${montant} ${source} = ${conversion} ${cible}`;

    let historiqueData = JSON.parse(localStorage.getItem("historiqueConversions")) || [];
    historiqueData.unshift(ligne);
    historiqueData = historiqueData.slice(0, 10); // Garde les 10 dernières
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

// Affiche l'historique au chargement
afficherHistorique();
