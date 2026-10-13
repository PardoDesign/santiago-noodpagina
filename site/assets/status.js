// Toont "nu open" of de tijden van vandaag, in Nederlandse tijd, en markeert vandaag in de tabel.
(function () {
  // 0 = zondag ... 6 = zaterdag; null = gesloten. Bron: santiagotiel.nl, gelezen 11-10-2026.
  var tijden = { 0: [13, 21], 1: null, 2: [14, 21], 3: [14, 21], 4: [14, 21], 5: [13, 21], 6: [13, 21] };
  var namen = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

  var delen = {};
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(new Date()).forEach(function (d) { delen[d.type] = d.value; });
  var dag = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(delen.weekday);
  if (dag < 0) return;
  var uur = parseInt(delen.hour, 10) + parseInt(delen.minute, 10) / 60;

  var rij = document.querySelector('.tijden tr[data-dag="' + dag + '"]');
  if (rij) rij.classList.add("is-vandaag");

  function tijd(u) { return (u < 10 ? "0" : "") + u + ":00"; }
  function volgende() {
    for (var i = 1; i <= 7; i++) {
      var d = (dag + i) % 7;
      if (tijden[d]) return (i === 1 ? "morgen" : namen[d]) + " vanaf " + tijd(tijden[d][0]);
    }
    return "";
  }

  var vandaag = tijden[dag];
  var tekst, open = false;
  if (vandaag && uur >= vandaag[0] && uur < vandaag[1]) {
    tekst = "Nu open tot " + tijd(vandaag[1]);
    open = true;
  } else if (vandaag && uur < vandaag[0]) {
    tekst = "Vandaag open van " + tijd(vandaag[0]) + " tot " + tijd(vandaag[1]);
  } else {
    tekst = "Nu gesloten, weer open " + volgende();
  }

  var el = document.getElementById("status");
  el.textContent = tekst;
  if (!open && !(vandaag && uur < vandaag[0])) el.classList.add("is-dicht");
  el.hidden = false;
})();
