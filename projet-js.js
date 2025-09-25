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