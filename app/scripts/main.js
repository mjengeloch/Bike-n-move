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

})