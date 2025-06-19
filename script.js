// const tableau = [
//   { titre: "nourriture", montant: 10.0 },
//   { titre: "loyer", montant: 20.0 },
//   { titre: "electriciter", montant: 30.0 },
// ];

// let table = document.getElementById("table");
// let tbody = document.getElementById("tbody");

// function createTable() {
//   depenses.forEach((depense, index) => {
//     let row = document.createElement("tr");
//     let cell = document.createAttribute("td");
//     cell.textContent = depense.titre;
//     row.appendChild(cell);
//     tbody.appendChild(row);
//     table.appendChild(tbody);
//   });
// }
// createTable();
// Ton tableau de données
const tableau = [
  { titre: 'nourriture', montant: 10000 },
  { titre: 'loyer', montant: 20000 },
  { titre: 'electricite', montant: 30000 }
];

// Fonction pour sauvegarder dans localStorage
function setDepenses(depenses) {
  localStorage.setItem('depenses', JSON.stringify(depenses));
}

// Fonction pour récupérer depuis localStorage
function getDepenses() {
  const depenses = localStorage.getItem('depenses');
  return depenses ? JSON.parse(depenses) : [];
}

// Fonction pour afficher les dépenses dans le tableau HTML
function afficherDepenses(depenses) {
  const tbody = document.getElementById('tbodyDepenses');
  tbody.innerHTML = ''; // vider avant affichage

  depenses.forEach((depense, index) => {
    const tr = document.createElement('tr');

    // Colonne titre
    const tdTitre = document.createElement('td');
    tdTitre.textContent = depense.titre;
    tr.appendChild(tdTitre);

    // Colonne montant
    const tdMontant = document.createElement('td');
    tdMontant.textContent = depense.montant.toLocaleString(); // affiche 10 000
    tr.appendChild(tdMontant);

    tbody.appendChild(tr);
  });
}

// Au chargement, on vérifie si localStorage a des données, sinon on met le tableau initial
let depenses = getDepenses();
if (depenses.length === 0) {
  depenses = tableau;
  setDepenses(depenses);
}

// Affichage
afficherDepenses(depenses);
