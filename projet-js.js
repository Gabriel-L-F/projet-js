const apiKey = "9f412309bd6e72eefbbbc660";
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

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