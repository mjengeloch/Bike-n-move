class Minuteur {
    constructor() {
        this.dureeRestante = 20 * 60;
        this.intervalId = null;
        this.formatteur = new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 });

    }

    demarrerCompteur() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.dureeRestante = 20 * 60;
        let t = this;
        this.intervalId = setInterval(function () { t.diminuerCompteur(); }, 1000);
    }

    diminuerCompteur() {
        this.dureeRestante--;

        let minutes = Math.floor(this.dureeRestante / 60);
        let secondes = this.dureeRestante % 60;

        let compteurTexte = this.formatteur.format(minutes) + ':' + this.formatteur.format(secondes);

        $('#minuteur').text(compteurTexte);
        sessionStorage.setItem('minuteur', document.getElementById('minuteur').textContent);

        if (this.dureeRestante === 0) {
            clearInterval(this.intervalId);
            sessionStorage.clear();
            $('#EtatReserve').text('Pas de réservation en cours');
        }
    }
}