/**
 * Created by HaCiO on 2017-06-29.
 */

var hasla = [];
var haslo ="";
hasla[0] = ["Lama", "Koza", "Aligator", "Krokodyl"];
hasla[1] = ["Słonecznik", "Dąb", "Stokrotka", "Magnolia"];
hasla[2] = ["Gra o tron", "Skazany na śmierć", "Zagubieni", "Na dobre i na złe"];

var kat = new Array(hasla.length);
kat[0] = "ZWIERZĘTA";
kat[1] = "ROŚLINY";
kat[2] = "SERIALE";


var yes = new Audio("audio/yes.wav");
var no = new Audio("audio/no.wav");
var win = new Audio("audio/win.wav");
var lose = new Audio("audio/lose.wav");

var haslo1="";
var ile_skuch = 0;

function odtworz_litery() {
    var audio = document.getElementsByTagName("audio")[0];
    audio.play();
}

function odtworz_restart() {
    var audio = document.getElementsByTagName("audio")[1];
    audio.play();
}

function wybierz(nr) {
    haslo = hasla[nr][Math.floor(Math.random()* 4)];
    haslo = haslo.toUpperCase();
    for (var i=0; i<haslo.length; i++){
        if(haslo.charAt(i)==" ") haslo1 =haslo1 + " ";
        else haslo1 = haslo1 + "-";
    }
    zaladuj();
}

window.onload = start;

function start() {
    var kategorie ="";
    for(i=0; i<hasla.length; i++) {
        var element = "kat" + i;
        kategorie = kategorie + '<div class="kategoria" onclick="wybierz('+i+')" id="' + element + '" onmouseover="odtworz_litery();">' + kat[i] + ' </div>';
    }
    document.getElementById("plansza").innerHTML = kategorie;


}

function zaladuj() {
    var literki ="";
    wypisz_haslo();
    for(i=0; i<35; i++){
        var element ="lit" + i;
        literki = literki + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'" onmouseover="odtworz_litery();">'+litery[i]+' </div>';
        if((i+1)% 7 == 0) literki = literki + '<div style="clear: both;"></div>';
    }


    document.getElementById("alfabet").innerHTML = literki;


}

function wypisz_haslo(){
    document.getElementById("plansza").innerHTML = haslo1;
}



var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";



String.prototype.ustawZnak = function(miejsce, znak){
    if(miejsce >this.length - 1) return this.toString();
    else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
}

function sprawdz(nr) {

    var trafiona = false;

    for(i=0; i<haslo.length; i++){
        if(haslo.charAt(i)== litery[nr]){
            haslo1 = haslo1.ustawZnak(i,litery[nr]);
            trafiona = true;
        }

    }

    if(trafiona == true){
        yes.play();
        var element ="lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor ="default";
        wypisz_haslo();
    }
    else {
        no.play();
        var element ="lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor ="default";
        document.getElementById(element).setAttribute("onclick",";");

        ile_skuch++;
        var obraz = "img/s"+ ile_skuch + ".jpg";
        document.getElementById("wisielec").innerHTML = '<img src="'+obraz+'" alt=""/>';
    }

    //wygrana
    if (haslo == haslo1) {
        win.play();
        document.getElementById("alfabet").innerHTML = "Wygrana! Podano prawidłowe hasło: " + haslo + '<br /><br /><span onmouseover="odtworz_restart();" class="reset" onclick="location.reload()" >ZAGRAJ PONOWNIE</span>';
    }
    //przegrana
    if (ile_skuch>=9) {
        lose.play();
        document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: " + haslo + '<br /><br /><span onmouseover="odtworz_restart();" class="reset" onclick="location.reload()" >ZAGRAJ PONOWNIE</span>';

    }
}


