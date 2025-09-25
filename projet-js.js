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
    const  source = document.getElementById("source").value
    const cible = document.getElementById("cible").value
    const montant = document.getElementById("montant").value

    if (source == cible) {
        document.getElementById("resultat").textContent = "Le taux de convertion est 1:1";
        return;
    }
    else {
        const response = await fetch(url);
        const data = await response.json(); 
        const tauxS = data.conversion_rates[source]; 
        const tauxC = data.conversion_rates[cible];
        const result = montant * (tauxC/tauxS);
        document.getElementById("resultat").textContent = `${montant} ${source} vaut ${result} ${cible}`;

    }
    enregistrerHistorique()
}

function enregistrerHistorique(conversion) {
            let historique = JSON.parse(localStorage.getItem("historique")) || [];
            historique.push(conversion);
            localStorage.setItem("historique", JSON.stringify(historique));
            afficherHistorique();
        }

        function afficherHistorique() {
            const historique = JSON.parse(localStorage.getItem("historique")) ||  [];
            const ul = document.getElementById("historique");
            ul.innerHTML = "";
            historique.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                ul.appendChild(li);
            });
        }