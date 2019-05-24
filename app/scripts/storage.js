class Storage {
    constructor() {
        this.currentPrenom = localStorage.getItem("prenom");
        this.currentNom = localStorage.getItem("nom");
        this.currentLieu = sessionStorage.getItem("stationReserve");
        this.currentMinuteur = sessionStorage.getItem("minuteur");

    }

    populateLocalStorage() {
        localStorage.setItem("prenom", document.getElementById("prenom").value);
        localStorage.setItem("nom", document.getElementById("nom").value);
    }

    chargeLocalStorage() {
        document.getElementById("prenom").value = this.currentPrenom;
        document.getElementById("nom").value = this.currentNom;
    }

    populateSessionStorage() {
        sessionStorage.setItem("lieu", document.getElementById("stationReserve").textContent);
        sessionStorage.setItem("minuteur", document.getElementById("minuteur").textContent);
    }

    chargeSessionStorage() {
        document.getElementById("stationReserve").textContent = this.currentLieu;
        document.getElementById("minuteur").textContent = this.currentMinuteur;
    }
}