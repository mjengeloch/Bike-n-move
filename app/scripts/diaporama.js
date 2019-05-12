class Diaporama {
    constructor(diapos, selecteur) {
        this.diapos = diapos;
        this.selecteur = selecteur;
        this.indexDiapoCourant = 0;
        this.timer = null;

        this.afficheElementCourant();
    }

    afficheElementCourant() {
        let currentDiapo = this.diapos.eq(this.indexDiapoCourant);
        let currentSelecteur = this.selecteur.eq(this.indexDiapoCourant);
        this.diapos.css("display", "none");
        this.selecteur.css("color", "#f5625886");
        currentDiapo.css("display", "block");
        currentSelecteur.css("color", "#f56358");
    }

    demarrerDiaporama() {
        let t = this;
        this.timer = setInterval(function () { t.diapositiveSuivante(); }, 5000);
    }

    pauseDiaporama() {
        clearInterval(this.timer);
    }

    diapositiveSuivante() {
        this.indexDiapoCourant++;
        if (this.indexDiapoCourant > this.diapos.length - 1) {
            this.indexDiapoCourant = 0;
        }
        this.afficheElementCourant();
    }

    diapositivePrecedente() {
        this.indexDiapoCourant--;
        if (this.indexDiapoCourant < 0) {
            this.indexDiapoCourant = this.diapos.length - 1;
        }
        this.afficheElementCourant();
    }
}