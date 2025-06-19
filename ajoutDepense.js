function getDepenses() {
  return JSON.parse(localStorage.getItem("depenses"));
}

// CREEONS LA TABLE CONTENANT LA LISTE DES DEPENSE
let depenses = getDepenses() || [];

let tableauDepense = document.getElementById("tableauDepense");
let title = document.createElement("h2");
title.textContent = "Liste des depenses";
title.setAttribute("class", "title-tableau");
tableauDepense.appendChild(title);
console.log("depenses", depenses.length);

// ===============================LOCALSTORAGE==============================

let table = document.querySelector(".table");
let tbody = document.querySelector(".tbody");

function setDepenses(depenses) {
  localStorage.setItem("depenses", JSON.stringify(depenses));
  // JSON.stringify(contacts) permet de convertir le tableaux en chiane de caractere
}
setDepenses(depenses);
let depense = getDepenses();

// RECUPERONS LA LISTE DES CONTACTS AJOUTER DANS LOCALSTORAGE

// CREEONS UNE FONCTION DANS LAQUELLE NOUS CREEONS LA TABLE
function createTable() {
  // CREEONS LA LIGNE DE LA TABLE
  // CREEONS LE BOUTON AJOUTER DEPENSE

  for (let index = 0; index < depenses.length; index++) {
    let row = document.createElement("tr");
    // CREONS LE BOUTON DE SUPPRESSION
    let deletCell = document.createElement("td");
    let deletButton = document.createElement("button");
    deletButton.textContent = "Supprimer";
    deletButton.setAttribute("class", "btn");
    // CREONS UN BOUCLE DANS LE QUEL ON AURA NOS TD
    // let values = Object.values(depenses[index]);
    // console.log("values", values.length);
    for (let element = 0; element <Object.keys(depenses[0]).length; element++) {
      // CREEONS LES TD CELLULE
      let cellTable = document.createElement("td");
      // LE TEXTE QUE VA CONTENIR LES TD
      let cellTableText = document.createTextNode(
        Object.values(depenses[index])[element]
      );
      deletButton.setAttribute("depenseType", depenses[index].titre);
      deletCell.appendChild(deletButton);
      row.setAttribute("id", depenses[index].titre);
      row.appendChild(cellTable);

      row.appendChild(deletCell);
      cellTable.appendChild(cellTableText);
    }
    tbody.appendChild(row);
    table.appendChild(tbody);
    // document.body.appendChild(table);
  }

  //==============================   LE BOUTON AJOUTERTER DEPENSE==========================
  let rowBoutonAjout = document.createElement("tr");
  let cellBoutonAjout = document.createElement("td");
  let span = document.createElement("span");
  span.textContent = "Ajouter dépenses";
  span.setAttribute("class", "ajout-rv");
  let boutonAjoutDepense = document.createElement("button");
  boutonAjoutDepense.setAttribute("class", "btn2");
  boutonAjoutDepense.setAttribute("id", "addContactModalButton");
  span.appendChild(boutonAjoutDepense);
  let link = document.createElement("a");
  // link.href = "./ajout_depense.html";
  let icone = document.createElement("i");
  icone.setAttribute("class", "fa-solid fa-plus icone");
  link.appendChild(icone);
  boutonAjoutDepense.appendChild(link);
  cellBoutonAjout.appendChild(span);
  rowBoutonAjout.appendChild(cellBoutonAjout);
  tbody.appendChild(rowBoutonAjout);

  table.appendChild(tbody);
  // document.body.appendChild(table);
}
createTable();
let modal = document.getElementById("modalContact");
//RECUPERONS LE BUTTON QUI PERMET D'AFFICHER LE MODAL
let modalButton = document.getElementById("addContactModalButton");
let close = document.querySelector(".close");
// FONCTION QUI PERMET D'AFFICHER LE MODAL
modalButton.addEventListener("click", function () {
  // console.log('modal cliquer');
  modal.style.display = "block";
});
// FONCTION QUI PERMET DE MASQUER LE MODAL
close.addEventListener("click", function () {
  modal.style.display = "none";
});
// FONCTION QUI PERMET DE MASQUER LE MODAL QUAND ON CLIQUE SUR N'IMPORTE OU SUR LA PAGE
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// =====================CREONS LA SUPPRESSION LORS D'UN CLIC============================
let deletButton = document.querySelectorAll(".btn");
deletButton.forEach(function (button) {
  button.addEventListener("click", function () {
    // this représente le bouton cliqué
    //  Je récupère la valeur de l’attribut depenseType du bouton
    //  qui a été cliqué et je la stocke dans la variable depenseType
    const typeDepense = this.getAttribute("depenseType");
    console.log("depenseType", typeDepense);
    const row = document.getElementById(typeDepense);
    console.log("row", row);

    row.parentNode.removeChild(row);
    // Enlever l'element supprimer dans totalDepenses()
    let filteredDepenses = depenses.filter(
      (depense) => depense.ajoutDepenseValue !== ajoutDepense
    );
    depenses = filteredDepenses;
    totalDepense();
    setDepenses(depenses);
    solde();
  });
});
// ==========================CREONS LA SUPPRESSION LORS D'UN CLIC=====================

// =================================AJOUTER DEPENSE====================================

let errorEnvoie = document.getElementById("errorEnvoie");
let boutonAjout = document.getElementById("boutonAjout");
let ajoutDepense = document.getElementById("ajoutDepense");
let montant = document.getElementById("montant");
let errorMontant = document.getElementById("errorMontant");
let errorDepense = document.getElementById("errorDepense");
// CREEONS UNE FONCTION QUI PERMET DE CONCATENER LA DEPENSE
function totalDepense() {
  let somme = 0;
  for (let i = 0; i < depenses.length; i++) {
    somme += parseInt(depenses[i].montantValue); // on convertit ici
  }

  // Met à jour le texte de la carte avec la somme
  let totalElement = document.getElementById("totalDepense");
  totalElement.textContent = somme + " FCFA";
  localStorage.setItem("totalDepense", somme);
}

boutonAjout.addEventListener("click", function (event) {
  event.preventDefault();
  let ajoutDepenseValue = ajoutDepense.value.trim();
  let montantValue = montant.value.trim();

  console.log("depense", ajoutDepense);
  if (!ajoutDepenseValue.trim() || !montantValue.trim()) {
    errorEnvoie.textContent = "Veuillez remplir les champs";
    // alert('Veuillez remplir les champs');
    // return;
  } else {
    errorEnvoie.textContent = "";
  }

  const newDepenses = { ajoutDepenseValue, montantValue };
  depenses.push(newDepenses);
  setDepenses(depenses);
  totalDepense();
  solde();

  let row = document.createElement("tr");
  // ==========================LE PREMIER TD CONTENANT LE NOM============

  let cell0 = row.insertCell(0);
  let cell0Text = document.createTextNode(ajoutDepenseValue);
  cell0.appendChild(cell0Text);
  row.appendChild(cell0);
  row.setAttribute("id", ajoutDepenseValue);
  tbody.appendChild(row);
  // ==========================LE DEUXIEME TD CONTENANT L'EMAIL==================
  let cell1 = row.insertCell(1);
  let cell1Text = document.createTextNode(montantValue);
  cell1.appendChild(cell1Text);
  row.appendChild(cell1);
  // ======================AJOUTONS LE BOUTON DE SUPPRESSION================
  let cellButton = document.createElement("td");

  let deletButton = document.createElement("button");
  let textButton = document.createTextNode("supprimer");
  deletButton.setAttribute("class", "btn");
  deletButton.setAttribute("depenseType", ajoutDepenseValue);
  deletButton.appendChild(textButton);
  cellButton.appendChild(deletButton);
  row.appendChild(cellButton);

  deletButton.addEventListener("click", function () {
    const ajoutDepenseValue = this.getAttribute("depenseType");
    console.log("depenseType", ajoutDepenseValue);
    // RECUPERONS LE ROW A PARTIR DE L'ID TELEPHONE
    const row = document.getElementById(ajoutDepenseValue);
    console.log("row", row);
    // parentNode permet de supprimer le row
    //  quand je clique sur le bouton qui est a l'interieur du row
    row.parentNode.removeChild(row);
    // Enlever l'element supprimer dans totalDepense()
    let filteredDepenses = depenses.filter(
      (depense) => depense.ajoutDepense !== ajoutDepense
    );
    depenses = filteredDepenses;
    totalDepense();
    setDepenses(depenses);
    solde();
  });

  // =================VIDONS LES INPUT============================
  ajoutDepense.value = "";
  montant.value = "";
  // =====================MASQUER LE MODAL QUAND LE CONTACT EST AJOUTER========
  modal.style.display = "none";
});

// =================CONTROLONS LE INPUT TITRE DEPENSE==============
ajoutDepense.addEventListener("input", function () {
  if (ajoutDepense.value.length < 5) {
    errorDepense.textContent = "nom court";
  } else {
    errorDepense.textContent = "";
  }
});

montant.addEventListener("input", function () {
  if (montant.value.length < 3) {
    errorMontant.textContent = "ajouter au moins 3 chiffres";
  } else {
    errorMontant.textContent = "";
  }
});
// ====================================LISTE REVENU==========================

// ECUPERONS LA LISTE DES CONTACTS AJOUTER DANS LOCALSTORAGE

// CREEONS UNE FONCTION DANS LAQUELLE NOUS CREEONS LA TABLE
