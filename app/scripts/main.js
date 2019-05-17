$(document).ready(function () {

    let diaporama = new Diaporama($(".diapositive"), $(".point"));

    /*---HEADER---*/

    $("header").click(function () {
        $("header").animate({
            bottom: "100%",
            opacity: "0.1",
        }, 2000)
        $("body").css("overflow-y", "visible")
        diaporama.demarrerDiaporama();
    })


    /*---Diapositive---*/

    $(".next").click(function () {
        diaporama.diapositiveSuivante();
    });

    $(".prev").click(function () {
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

    $("#play").hide()

    $('#play').click(function () {
        $("#play").hide()
        $("#pause").show()
        diaporama.demarrerDiaporama();
    });
    $('#pause').click(function () {
        $("#play").show()
        $("#pause").hide()
        diaporama.pauseDiaporama();
    });

    /*---Map---*/

    let mymap = L.map('mapid').setView([47.218371, -1.553621], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWlyaW1hZ2ljIiwiYSI6ImNqdm1jOXd2dzE3d2w0OWwycXExd29pdjcifQ.4PPbOhOYwIqe9Zhp8LzY6A', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
    }).addTo(mymap);

    ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=nantes&apiKey=c05f61c194281ba2e1e2e03cb7d62ed92e991968", function (reponse) {
        let stations = JSON.parse(reponse);
        stations.forEach(function (station) {
            let marker = L.marker([station.position.latitude, station.position.longitude]).addTo(mymap);
            marker.addEventListener("click", function () {
                $("#status").text(station.status);

                if ($("#status").text() === "OPEN") {
                    $("#status").css("display", "inline-block");
                    $("#status").css("background-color", "green");

                } else if ($("status").text() === "CLOSED") {
                    $("#status").css("display", "inline-block");
                    $("#status").css("background-color", "red");

                } else {
                    $("#status").css("display", "inline-block");
                    $("#status").css("background-color", "lightgray");
                    $("#status").text("Inconnu");
                }

                $("#station").text(station.name);
                $("#adresse").text(station.address);
                $("#velo").text(station.totalStands.availabilities.bikes);
                $("#place").text(station.totalStands.availabilities.stands);
            })
        })
    })

    /*---Local Storage---*/

    if (!localStorage.getItem("prenom")) {
        populateStorage();
    } else {
        setStyles();
    }

    document.getElementById("prenom").onchange = populateStorage;
    document.getElementById("nom").onchange = populateStorage;

    /*---Signature---*/

    const canvas = document.querySelector("#zoneSignature");
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = 100;

    ctx.strockStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let singnatureBoxWidth = canvas.parentNode.clientWidth;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(x, y) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y]
    }

    canvas.addEventListener("mousedown", e => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    })
    canvas.addEventListener("touchstart", e => {
        if (e.touches && e.touches.length == 1) {
            isDrawing = true;
            let touch = e.touches[0]
            let touchX = touch.pageX - touch.target.offsetleft;
            let touchY = touch.pageY - touch.target.offsetTop;
            [lastX, lastY] = [touchX, touchY];
            e.preventDefault();
        }
    });

    canvas.addEventListener("mousemove", function (e) {
        draw(e.offsetX, e.offsetY);
    });
    canvas.addEventListener("touchmove", e => {
        if (e.touches && e.touches.length == 1) {
            let touch = e.touches[0];
            let touchX = touch.pageX - touch.target.offsetleft;
            let touchY = touch.pageY - touch.target.offsetTop;
            draw(touchX, touchY);
        }
    });

    canvas, addEventListener("mouseup", () => (isDrawing = false));
    canvas, addEventListener("mouseout", () => (isDrawing = false));
    canvas, addEventListener("touchend", () => (isDrawing = false));

    let clearButton = document.getElementById("clear");

    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clearButton.addEventListener("click", clearSignature);

});