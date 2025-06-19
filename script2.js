// 🔹 Fonction pour récupérer les dépenses enregistrées dans le navigateur
function getDepenses() {
  return JSON.parse(localStorage.getItem("depenses")); // On lit la valeur depuis localStorage et on la convertit en tableau JavaScript
}

// 🔹 Fonction pour enregistrer les dépenses dans le navigateur
function setDepenses(depenses) {
  localStorage.setItem("depenses", JSON.stringify(depenses)); // On transforme le tableau en texte et on le stocke
}
function getRevenues() {
  return JSON.parse(localStorage.getItem("revenues"));
}
// 🔹 Fonction pour enregistrer les dépenses dans le navigateur

function setRevenues(revenues) {
  localStorage.setItem("revenues", JSON.stringify(revenues)); // On transforme le tableau en texte et on le stocke
  // JSON.stringify(contacts) permet de convertir le tableaux en chaine de caractere
}
let revenues = getRevenues() || [];
// 🔹 Initialisation de la liste des dépenses
let depenses = getDepenses() || []; // Si aucune dépense n’est trouvée, on utilise une liste vide

// 🔹 Récupération de l’élément HTML où on va afficher la table
let tableauDepense = document.getElementById("tableauDepense");

// 🔹 Création du titre "Liste des dépenses"
let title = document.createElement("h2");
title.textContent = "Liste des dépenses";
title.setAttribute("class", "title-tableau"); // Ajoute une classe CSS
tableauDepense.appendChild(title); // Ajoute le titre dans la page

// 🔹 Sélection des éléments de la table HTML
let table = document.querySelector(".table");
let tbody = document.querySelector(".tbody");

// 🔹 Fonction pour calculer et afficher le total des dépenses
function totalDepense() {
  let somme = 0;
  for (let i = 0; i < depenses.length; i++) {
    // somme += parseInt(depenses[i].montantValue);
    somme = somme + parseInt(depenses[i].montantValue); // On additionne chaque montant
  }
  let totalElement = document.getElementById("totalDepense"); // Où on affiche le total
  totalElement.textContent = somme + " FCFA";
  localStorage.setItem("totalDepense", somme); // On garde aussi le total dans localStorage
  return somme;
}

// 🔹 Fonction pour afficher les dépenses sous forme de tableau
function createTable() {
  for (let index = 0; index < depenses.length; index++) {
    let row = document.createElement("tr");
    row.setAttribute("id", depenses[index].id); // ID pour pouvoir la supprimer

    // Colonne 1 : nom de la dépense
    let cell1 = document.createElement("td");
    cell1.textContent = depenses[index].ajoutDepenseValue;
    row.appendChild(cell1);

    // Colonne 2 : montant
    let cell2 = document.createElement("td");
    cell2.textContent = depenses[index].montantValue;
    row.appendChild(cell2);

    // Colonne 3 : bouton de suppression
    let cellButton = document.createElement("td");
    let deletButton = document.createElement("button");
    deletButton.textContent = "Supprimer";
    deletButton.setAttribute("class", "btn");
    deletButton.setAttribute("depenseId", depenses[index].id); // Attribut pour identifier la dépense
    cellButton.appendChild(deletButton);
    row.appendChild(cellButton);

    // Ajoute la ligne à la table
    tbody.appendChild(row);
  }

  // 🔹 Création d’une ligne spéciale pour le bouton "Ajouter dépenses"
  let rowAjout = document.createElement("tr");
  let cellAjout = document.createElement("td");
  let span = document.createElement("span");
  span.textContent = "Ajouter dépenses";
  span.setAttribute("class", "ajout-rv");

  // Bouton + pour ouvrir la modale
  let boutonAjoutDepense = document.createElement("button");
  boutonAjoutDepense.setAttribute("class", "btn2");
  boutonAjoutDepense.setAttribute("id", "addContactModalButton");

  let link = document.createElement("a");
  let icone = document.createElement("i");
  icone.setAttribute("class", "fa-solid fa-plus icone"); // Icône plus
  link.appendChild(icone);
  boutonAjoutDepense.appendChild(link);

  span.appendChild(boutonAjoutDepense);
  cellAjout.appendChild(span);
  rowAjout.appendChild(cellAjout);
  // tbody.appendChild(rowAjout);
  table.appendChild(rowAjout);

  // 🔹 Ajouter les événements "click" pour supprimer chaque dépense
  document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = this.getAttribute("depenseId"); // Récupère l’ID à supprimer
      const row = document.getElementById(id);
      row.parentNode.removeChild(row); // Supprime la ligne
      depenses = depenses.filter((depense) => depense.id !== id); // Supprime du tableau
      totalDepense(); // Recalcule le total
      setDepenses(depenses); // Met à jour le localStorage
      solde();
    });
  });
}

// 🔹 On affiche la table et le total dès que la page charge
createTable();
totalDepense();

// 🔹 GESTION DE LA MODALE (boîte pop-up pour ajouter une dépense)
let modal = document.getElementById("modalContact");
let modalButton = document.getElementById("addContactModalButton");
let close = document.querySelector(".close");

modalButton.addEventListener("click", function () {
  modal.style.display = "block"; // Affiche la modale
});
close.addEventListener("click", function () {
  modal.style.display = "none"; // Ferme la modale
});
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// 🔹 AJOUT D’UNE NOUVELLE DÉPENSE
let errorEnvoie = document.getElementById("errorEnvoie");
let boutonAjout = document.getElementById("boutonAjout");
let ajoutDepense = document.getElementById("ajoutDepense");
let montant = document.getElementById("montant");
let errorMontant = document.getElementById("errorMontant");
let errorDepense = document.getElementById("errorDepense");

boutonAjout.addEventListener("click", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page
  let valideDepense = true;

  let ajoutDepenseValue = ajoutDepense.value.trim(); // Récupère le nom
  let montantValue = montant.value.trim(); // Récupère le montant
  if (!ajoutDepenseValue || !montantValue) {
    errorEnvoie.textContent = "Veuillez remplir les champs";
    valideDepense=false;
      if(!valideDepense){
    return;

    } // Si vide, affiche une erreur

  } else {
    errorEnvoie.textContent = ""; // Sinon, efface l'erreur
  }

  // 🔹 Création de la nouvelle dépense
  const id = Date.now().toString(); // Identifiant unique basé sur le temps
  const newDepense = { id, ajoutDepenseValue, montantValue };
  depenses.push(newDepense); // Ajoute au tableau
  setDepenses(depenses); // Sauvegarde
  totalDepense(); // Met à jour le total
  solde();

  // 🔹 Ajoute visuellement la dépense à la table
  let row = document.createElement("tr");
  row.setAttribute("id", id);

  let cell1 = document.createElement("td");
  cell1.textContent = ajoutDepenseValue;
  row.appendChild(cell1);

  let cell2 = document.createElement("td");
  cell2.textContent = montantValue;
  row.appendChild(cell2);

  let cellButton = document.createElement("td");
  let deletButton = document.createElement("button");
  deletButton.textContent = "Supprimer";
  deletButton.setAttribute("class", "btn");
  deletButton.setAttribute("depenseId", id);
  cellButton.appendChild(deletButton);
  row.appendChild(cellButton);

  tbody.appendChild(row); // Ajoute la ligne dans la table

  // 🔹 Ajoute la suppression aussi à ce bouton
  deletButton.addEventListener("click", function () {
    const id = this.getAttribute("depenseId");
    const row = document.getElementById(id);
    row.parentNode.removeChild(row);
    depenses = depenses.filter((depense) => depense.id !== id);
    totalDepense();
    setDepenses(depenses);
    solde();
  });

  // 🔹 Nettoyage du formulaire
  ajoutDepense.value = "";
  montant.value = "";
  modal.style.display = "none"; // Ferme la modale
});

// 🔹 Vérification en temps réel du champ "nom de la dépense"
ajoutDepense.addEventListener("input", function () {
  errorDepense.textContent =
    ajoutDepense.value.length < 5 ? "Nom trop court" : "";
});

// 🔹 Vérification en temps réel du champ "montant"
montant.addEventListener("input", function () {
  if (montant.value.length > 9) {
    errorMontant.textContent = "Le montant ne doit pas dépasser 9 chiffres";
  } 
  else if (montant.value.length < 3) {
    errorMontant.textContent = "Ajouter au moins 3 chiffres";
  } 
  
  
  
  
  
  
  
  
  
  
  
  else {
    errorMontant.textContent = "";
  }
});

function afficherRevenus() {
  revenues.forEach((revenu) => {
    let row = document.createElement("tr");
    row.setAttribute("id", revenu.id);

    // Titre
    let cell1 = document.createElement("td");
    cell1.textContent = revenu.ajoutRevenuValue;
    row.appendChild(cell1);

    // Montant
    let cell2 = document.createElement("td");
    cell2.textContent = revenu.montantValueRevenu;
    row.appendChild(cell2);

    // Bouton supprimer
    let cell3 = document.createElement("td");
    let btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.setAttribute("class", "btn");
    btn.setAttribute("revenuId", revenu.id);
    btn.addEventListener("click", function () {
      let revenuId = this.getAttribute("revenuId");
      let ligne = document.getElementById(revenuId);
      ligne.remove();
      revenues = revenues.filter((r) => r.id !== revenuId);
      totalRevenu();
      setRevenues(revenues);

      solde();
    });
    cell3.appendChild(btn);
    row.appendChild(cell3);

    tbodyRevenu.appendChild(row);
  });
}

// 🔹 Fonction pour récupérer les dépenses enregistrées dans le navigateur

let tableRevenu = document.querySelector(".tableRevenu");
let tbodyRevenu = document.querySelector(".tbodyRevenu");
console.log("revenues", revenues.length);

let tableauRevenu = document.getElementById("tableauRevenu");
let titleRevenu = document.createElement("h2");
titleRevenu.textContent = "Liste des revenues";
titleRevenu.setAttribute("class", "title-tableau");
tableauRevenu.appendChild(titleRevenu);

function totalRevenu() {
  let somme = 0;
  for (let i = 0; i < revenues.length; i++) {
    // somme += parseInt(depenses[i].montantValue);
    somme = somme + parseInt(revenues[i].montantValueRevenu); // On additionne chaque montant
  }
  let totalBudget = document.getElementById("totalBudget"); // Où on affiche le total
  totalBudget.textContent = somme + " FCFA";
  localStorage.setItem("totalBudget", somme); // On garde aussi le total dans localStorage
  return somme;
}

function solde() {
  let difference = 0;
  difference = totalRevenu() - totalDepense();
  let solde = document.getElementById("solde");
  solde.textContent = difference + "FCFA";
  localStorage.setItem("solde", difference);
}

function createTableRevenue() {
  // Vider le contenu existant
  tbodyRevenu.innerHTML = "";

  for (let index = 0; index < revenues.length; index++) {
    let rowRevenu = document.createElement("tr");
    rowRevenu.setAttribute("id", revenues[index].id); // ID unique pour suppression

    // Colonne 1 : titre du revenu
    let cell1 = document.createElement("td");
    cell1.textContent = revenues[index].ajoutRevenuValue;
    rowRevenu.appendChild(cell1);

    // Colonne 2 : montant
    let cell2 = document.createElement("td");
    cell2.textContent = revenues[index].montantValueRevenu;
    rowRevenu.appendChild(cell2);

    // Colonne 3 : bouton de suppression
    let deletCellRevenu = document.createElement("td");
    let deletButtonRevenu = document.createElement("button");
    deletButtonRevenu.textContent = "Supprimer";
    deletButtonRevenu.setAttribute("class", "btn");
    deletButtonRevenu.setAttribute("revenuId", revenues[index].id);
    deletCellRevenu.appendChild(deletButtonRevenu);
    rowRevenu.appendChild(deletCellRevenu);

    // Ajouter la ligne à la table
    tbodyRevenu.appendChild(rowRevenu);
  }

  // 🔹 Ligne spéciale pour le bouton "Ajouter revenu"
  let rowAjoutRevenu = document.createElement("tr");
  let cellAjoutRevenu = document.createElement("td");
  let span = document.createElement("span");
  span.textContent = "Ajouter revenu";
  span.setAttribute("class", "ajout-rv");

  let boutonAjoutRevenu = document.createElement("button");
  boutonAjoutRevenu.setAttribute("class", "btn2");
  boutonAjoutRevenu.setAttribute("id", "addRevenuModalButton");

  let link = document.createElement("a");
  let icone = document.createElement("i");
  icone.setAttribute("class", "fa-solid fa-plus icone");
  link.appendChild(icone);
  boutonAjoutRevenu.appendChild(link);

  span.appendChild(boutonAjoutRevenu);
  cellAjoutRevenu.appendChild(span);
  rowAjoutRevenu.appendChild(cellAjoutRevenu);
  tbodyRevenu.appendChild(rowAjoutRevenu);
  

  // 🔹 Événements "click" pour supprimer les revenus
  document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = this.getAttribute("revenuId");
      const row = document.getElementById(id);
      if (row) row.remove(); // Supprime la ligne dans le DOM
      revenues = revenues.filter((revenu) => revenu.id !== id); // Supprime du tableau
      totalRevenu(); // Recalcule le total
      setRevenues(revenues); // Met à jour le localStorage
      solde();
    });
  });

  // 🔹 Ouvre la modale ajout revenu
  boutonAjoutRevenu.addEventListener("click", () => {
    document.getElementById("modalRevenu").style.display = "block";
  });
}

createTableRevenue();
totalRevenu();
let modalRevenu = document.getElementById("modalRevenu");
//RECUPERONS LE BUTTON QUI PERMET D'AFFICHER LE MODAL
let modalButtonRevenu = document.getElementById("addRevenuModalButton");
let closeRevenu = document.getElementById("closeModalRevenu");
// FONCTION QUI PERMET D'AFFICHER LE MODAL
modalButtonRevenu.addEventListener("click", function () {
  // console.log('modal cliquer');
  modalRevenu.style.display = "block";
});
// FONCTION QUI PERMET DE MASQUER LE MODAL
closeRevenu.addEventListener("click", function () {
  modalRevenu.style.display = "none";
});
// FONCTION QUI PERMET DE MASQUER LE MODAL QUAND ON CLIQUE SUR N'IMPORTE OU SUR LA PAGE
window.onclick = function (event) {
  if (event.target == modalRevenu) {
    modalRevenu.style.display = "none";
  }
};
// =====================CREONS LA SUPPRESSION LORS D'UN CLIC============================
let deletButtonRevenu = document.querySelectorAll(".btn");
deletButtonRevenu.forEach(function (button) {
  button.addEventListener("click", function () {
    // this représente le bouton cliqué
    //  Je récupère la valeur de l’attribut depenseType du bouton
    //  qui a été cliqué et je la stocke dans la variable depenseType
    const typeRevenu = this.getAttribute("revenuType");
    console.log("revenuType", typeRevenu);
    const rowRevenu = document.getElementById(typeRevenu);
    console.log("row", rowRevenu);

    rowRevenu.parentNode.removeChild(rowRevenu);
    // Enlever l'element supprimer dans totalDepenses()
    let filteredRevenu = revenues.filter(
      (revenu) => revenu.ajoutRevenu !== ajoutRevenu
    );
    revenues = filteredRevenu;
    totalRevenu();

    setRevenues(revenues);
    solde();
  });
});
// ==========================CREONS LA SUPPRESSION LORS D'UN CLIC=====================

// =================================AJOUTER DEPENSE====================================

// let errorEnvoie = document.getElementById("errorEnvoie");
let boutonAjoutRevenu = document.getElementById("boutonAjoutRevenu");
let ajoutRevenu = document.getElementById("ajoutRevenu");
let montantRevenu = document.getElementById("montantRevenu");
let errorMontantRevenu = document.getElementById("errorMontantRevenu");
let errorRevenu = document.getElementById("errorRevenu");
let errorTitleRevenu = document.getElementById("errorTitle");
// CREEONS UNE FONCTION QUI PERMET DE CONCATENER LA DEPENSE

// Met à jour le texte de la carte avec la somme
// let totalElement = document.getElementById("totalDepense");
// totalElement.textContent = somme + " FCFA";
// localStorage.setItem('totalDepense',somme);

// Écoute de l'événement sur le bouton d'ajout
// Écoute de l'événement sur le bouton d'ajout
// Event listener pour le bouton d'ajout de revenu
boutonAjoutRevenu.addEventListener("click", function (event) {
  event.preventDefault();

  // Initialiser un drapeau de validation
  let isValid = true; // On suppose que c'est valide au départ

  let ajoutRevenuValue = ajoutRevenu.value.trim();
  let montantValueRevenu = montantRevenu.value.trim();

  // Réinitialisation des messages d'erreur
  errorRevenu.textContent = "";
  errorTitleRevenu.textContent = "";
  errorMontantRevenu.textContent = "";

  // Vérification si les champs sont vides
  if (!ajoutRevenuValue || !montantValueRevenu) {
    errorRevenu.textContent = "Veuillez remplir les champs";
    isValid = false;
  }

  // Si une erreur est présente, on arrête l'ajout
  if (!isValid) {
    return;
  }

  // Vérification supplémentaire pour le titre
  if (ajoutRevenuValue.length < 3) {
    errorTitleRevenu.textContent = "Titre trop court";
    isValid = false;
  } else if (ajoutRevenuValue.length > 6) {
    errorTitleRevenu.textContent = "Titre trop long";
    isValid = false;
  } else if (/\d/.test(ajoutRevenuValue)) {
    errorTitleRevenu.textContent = "Veuillez entrer des lettres uniquement";
    isValid = false;
    ajoutRevenu.value = ajoutRevenu.value.replace(/\d/g, ""); // Supprimer les chiffres
  } else {
    errorTitleRevenu.textContent = "";
  }

  // Vérification pour le montant
  if (montantValueRevenu.length < 3) {
    errorMontantRevenu.textContent = "Ajouter au moins 3 chiffres";
    isValid = false;
  } else if (montantValueRevenu.length > 9) {
    errorMontantRevenu.textContent = "N'ajoutez pas plus de 9 chiffres";
    isValid = false;
  } else if (isNaN(montantValueRevenu)) {
    errorMontantRevenu.textContent = "Veuillez entrer un nombre valide";
    isValid = false;
  } else {
    errorMontantRevenu.textContent = "";
  }

  // Si toutes les validations sont réussies, on ajoute le revenu au tableau
  if (isValid) {
    const id = Date.now().toString();
    const newRevenues = { id, ajoutRevenuValue, montantValueRevenu };
    revenues.push(newRevenues);
    totalRevenu();
    setRevenues(revenues);
    solde();

    // Création de la ligne de tableau
    let rowRevenu = document.createElement("tr");

    // Ajout du titre
    let cell0Revenu = rowRevenu.insertCell(0);
    let cell0TextRevenu = document.createTextNode(ajoutRevenuValue);
    cell0Revenu.appendChild(cell0TextRevenu);
    rowRevenu.appendChild(cell0Revenu);
    rowRevenu.setAttribute("id", ajoutRevenuValue);
    tbodyRevenu.appendChild(rowRevenu);

    // Ajout du montant
    let cell1Revenu = rowRevenu.insertCell(1);
    let cell1TextRevenu = document.createTextNode(montantValueRevenu);
    cell1Revenu.appendChild(cell1TextRevenu);
    rowRevenu.appendChild(cell1Revenu);

    // Ajout du bouton de suppression
    let cellButtonRevenu = document.createElement("td");
    let deletButtonRevenu = document.createElement("button");
    let textButtonRevenu = document.createTextNode("supprimer");
    deletButtonRevenu.setAttribute("class", "btn");
    deletButtonRevenu.setAttribute("depenseType", ajoutRevenuValue);
    deletButtonRevenu.appendChild(textButtonRevenu);
    cellButtonRevenu.appendChild(deletButtonRevenu);
    rowRevenu.appendChild(cellButtonRevenu);

    deletButtonRevenu.addEventListener("click", function () {
      const ajoutRevenuValue = this.getAttribute("depenseType");
      const row = document.getElementById(ajoutRevenuValue);
      row.parentNode.removeChild(row);

      // Filtrage et mise à jour de revenues
      let filteredRevenu = revenues.filter(
        (revenu) => revenu.ajoutRevenuValue !== ajoutRevenuValue
      );
      revenues = filteredRevenu;
      totalRevenu();
      setRevenues(revenues);
      solde();
    });

    // Vider les champs après ajout
    ajoutRevenu.value = "";
    montantRevenu.value = "";

    // Masquer le modal après ajout
    modalRevenu.style.display = "none";
  }
});

// Validation en temps réel du titre
ajoutRevenu.addEventListener("input", function () {
  let isValidTitle = true;

  if (ajoutRevenu.value.length < 3) {
    errorTitleRevenu.textContent = "Titre trop court";
    isValidTitle = false;
  } else if (ajoutRevenu.value.length > 6) {
    errorTitleRevenu.textContent = "Titre trop long";
    isValidTitle = false;
  } else if (/\d/.test(ajoutRevenu.value)) {
    errorTitleRevenu.textContent = "Veuillez entrer des lettres uniquement";
    isValidTitle = false;
    ajoutRevenu.value = ajoutRevenu.value.replace(/\d/g, ""); // Supprimer les chiffres
  } else {
    errorTitleRevenu.textContent = "";
  }

  // Si titre valide, on ajuste l'état global de validation
  if (!isValidTitle) {
    isValid = false;
  }
});

// Validation en temps réel du montant
montantRevenu.addEventListener("input", function () {
  let isValidMontant = true;

  if (montantRevenu.value.length < 3) {
    errorMontantRevenu.textContent = "Ajouter au moins 3 chiffres";
    isValidMontant = false;
  } else if (montantRevenu.value.length > 9) {
    errorMontantRevenu.textContent = "N'ajoutez pas plus de 9 chiffres";
    isValidMontant = false;
  } else if (montantRevenu.value) {
    errorMontantRevenu.textContent = "Veuillez entrer un nombre valide";
    isValidMontant = false;
  } else {
    errorMontantRevenu.textContent = "";
  }

  // Si montant valide, on ajuste l'état global de validation
  if (!isValidMontant) {
    isValid = false;
  }
});

// =================CONTROLONS LE INPUT TITRE DEPENSE==============
