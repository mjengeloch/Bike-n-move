function populateStorage() {
    localStorage.setItem("prenom", document.getElementById("prenom").value);
    localStorage.setItem("nom", document.getElementById("nom").value);
    setStyles();
}

function setStyles() {
    let currentPrenom = localStorage.getItem("prenom");
    let currentNom = localStorage.getItem("nom");
    document.getElementById("prenom").value = currentPrenom;
    document.getElementById("nom").value = currentNom;
}