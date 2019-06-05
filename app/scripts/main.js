$(document).ready(function () {

    let diaporama = new Diaporama($('.diapositive'), $('.point'));
    let minuteur = new Minuteur();
    let storage = new Storage();
    let signatureCanvas = new Canvas($('#zoneSignature'));

    /*---HEADER---*/

    $('header').click(function () {
        $('header').animate({
            bottom: '100%',
            opacity: '0.1',
        }, 2000)
        $('body').css('overflow-y', 'visible')
        diaporama.demarrerDiaporama();
    })


    /*---Diapositive---*/

    $('.next').click(function () {
        diaporama.diapositiveSuivante();
    });

    $('.prev').click(function () {
        diaporama.diapositivePrecedente();
    });

    $(document).keydown(function (e) {
        switch (e.which) {
            case 39:
                diaporama.diapositiveSuivante();
                break;
            case 37:
                diaporama.diapositivePrecedente();
                break;
        }
    })

    $('#play').hide()

    $('#play').click(function () {
        $('#play').hide()
        $('#pause').show()
        diaporama.demarrerDiaporama();
    });
    $('#pause').click(function () {
        $('#play').show()
        $('#pause').hide()
        diaporama.pauseDiaporama();
    });

    /*---Map---*/

    let mymap = L.map('mapid').setView([47.218371, -1.553621], 14);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWlyaW1hZ2ljIiwiYSI6ImNqdm1jOXd2dzE3d2w0OWwycXExd29pdjcifQ.4PPbOhOYwIqe9Zhp8LzY6A', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
    }).addTo(mymap);

    let markerMap = L.icon({
        iconUrl: 'images/marker.png',

        iconSize: [33, 52],
        iconAnchor: [15, 51]
    });

    let markerMapSelected = L.icon({
        iconUrl: 'images/markerSelec.png',

        iconSize: [33, 52],
        iconAnchor: [15, 51]
    });

    let markerList = [];
    ajaxGet('https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=c05f61c194281ba2e1e2e03cb7d62ed92e991968', function (reponse) {
        let stations = JSON.parse(reponse);
        stations.forEach(function (station) {
            let marker = L.marker([station.position.latitude, station.position.longitude], { icon: markerMap }).addTo(mymap);
            markerList.push(marker);
            marker.on('click', function () {
                markerList.forEach(marker => marker.setIcon(markerMap));
                this.setIcon(markerMapSelected);
                $('#status').text(station.status);

                if ($('#status').text() === 'OPEN') {
                    $('#status').css('display', 'inline-block');
                    $('#status').css('background-color', 'green');

                } else if ($('status').text() === 'CLOSED') {
                    $('#status').css('display', 'inline-block');
                    $('#status').css('background-color', 'red');

                } else {
                    $('#status').css('display', 'inline-block');
                    $('#status').css('background-color', 'lightgray');
                    $('#status').text('Inconnu');
                }

                $('#station').text(station.name);
                $('#adresse').text(station.address);
                $('#velo').text(station.totalStands.availabilities.bikes);
                $('#place').text(station.totalStands.availabilities.stands);

                if ($("#velo").text() != "0" && $("#prenom").val() != "" && $("#nom").val() != "") {
                    $('#buttonReserver').removeAttr('disabled');
                } else {
                    $('#buttonReserver').attr('disabled', 'disabled');
                }
            })
        })
    })

    $('#buttonReserver').click(function (e) {
        e.preventDefault();
        $('#formulaire').hide();
        $('#signature').show();
    });

    $(".formLabel").on("keyup", function () {
        if ($("#velo").text() != "0" && $("#prenom").val() != "" && $("#nom").val() != "") {
            $('#buttonReserver').removeAttr('disabled');
        } else {
            $('#buttonReserver').attr('disabled', 'disabled');
        }
    })

    /*---Signature---*/
    $('#signature').hide();

    $('#valider').click(function (e) {
        e.preventDefault();
        $('#formulaire').show();
        $('#signature').hide();
        $('#EtatReserve').text('Réservation en cours');
        $('#stationReserve').text($('#adresse').text());
        $('#minuteur').text('20:00');
        minuteur.demarrerCompteur();
        storage.populateSessionStorage();
    });

    $('#clearButton').click(function () {
        signatureCanvas.clearSignature();
        $('#valider').attr('disabled', 'disabled');
    });


    /*---Local Storage---*/

    if (!localStorage.getItem('prenom') || !localStorage.getItem('nom')) {
        storage.populateLocalStorage();
    } else {
        storage.chargeLocalStorage();
    }

    document.getElementById('prenom').onchange = storage.populateLocalStorage;
    document.getElementById('nom').onchange = storage.populateLocalStorage;

    /*---Session Storage---*/

    if (!sessionStorage.getItem('stationReserve') || !sessionStorage.getItem('minuteur')) {
        storage.populateSessionStorage();
    } else {
        storage.chargeSessionStorage();
    }

    document.getElementById('stationReserve').onchange = storage.populateSessionStorage;
    document.getElementById('minuteur').onchange = storage.populateSessionStorage;
});