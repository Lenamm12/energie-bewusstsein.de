// Rechner für Energiebedarf von Geräten
document.getElementById("berechnen1").addEventListener("click", function () {
  // Eingaben holen
  let leistung = parseFloat(document.getElementById("leistung").value); // Watt
  let dauer = parseFloat(document.getElementById("betriebsdauer").value);
  let einheit = document.getElementById("betriebsdauerEinheit").value;
  let kosten = parseFloat(document.getElementById("stromkosten").value); // Cent/kWh

  // Validierung
  if (isNaN(leistung) || isNaN(dauer) || isNaN(kosten)) {
    document.getElementById("ergebnis1").value =
      "Bitte alle Felder korrekt ausfüllen!";
    return;
  }

  // Zeit in Stunden umrechnen
  let stunden = dauer;

  switch (einheit) {
    case "minuten":
      stunden = dauer / 60;
      break;
    case "stunden":
      stunden = dauer;
      break;
    case "tage":
      stunden = dauer * 24;
      break;
    case "wochen":
      stunden = dauer * 24 * 7;
      break;
    case "monate":
      stunden = dauer * 24 * 30;
      break;
    case "jahre":
      stunden = dauer * 24 * 365;
      break;
  }

  // Energieverbrauch berechnen (kWh)
  let verbrauch = (leistung / 1000) * stunden;

  // Kosten berechnen (Euro)
  let gesamtKosten = (verbrauch * kosten) / 100;

  // Ergebnis ausgeben
  document.getElementById("ergebnis1").value =
    verbrauch.toFixed(2) + " kWh | " + gesamtKosten.toFixed(2) + " €";
});

// Rechner für momentane Leistungsaufnahme mittels Stromzähler
document.getElementById("berechnen2").addEventListener("click", function () {
  // Eingaben holen
  let zaehler = parseFloat(document.getElementById("zaehler").value); // U/kWh
  let umdrehungen = parseFloat(document.getElementById("umdrehungen").value);

  let stunden = parseFloat(document.getElementById("stunden").value) || 0;
  let minuten = parseFloat(document.getElementById("minuten").value) || 0;
  let sekunden = parseFloat(document.getElementById("sekunden").value) || 0;

  // Validierung
  if (
    isNaN(zaehler) ||
    isNaN(umdrehungen) ||
    (stunden === 0 && minuten === 0 && sekunden === 0)
  ) {
    document.getElementById("ergebnis2").value =
      "Bitte alle Felder korrekt ausfüllen!";
    return;
  }

  // Zeit in Stunden umrechnen
  let zeitInStunden = stunden + minuten / 60 + sekunden / 3600;

  // Verbrauch in kWh für die gemessenen Umdrehungen
  let energie = umdrehungen / zaehler;

  // Leistung in kW
  let leistung = energie / zeitInStunden;

  // Ergebnis ausgeben
  document.getElementById("ergebnis2").value = leistung.toFixed(2) + " kW";
});

// Amortisationsrechner
document.getElementById("berechnen3").addEventListener("click", function () {
  let alt = parseFloat(document.getElementById("altVerbrauch").value);
  let neu = parseFloat(document.getElementById("neuVerbrauch").value);
  let preis = parseFloat(document.getElementById("preis").value);
  let strompreis = parseFloat(document.getElementById("strompreis").value);
  let herstellung =
    parseFloat(document.getElementById("herstellung").value) || 0;

  // Validierung
  if (isNaN(alt) || isNaN(neu) || isNaN(preis) || isNaN(strompreis)) {
    document.getElementById("ergebnis3").value =
      "Bitte alle Pflichtfelder ausfüllen!";
    return;
  }

  if (neu >= alt) {
    document.getElementById("ergebnis3").value =
      "Neugerät spart keine Energie!";
    return;
  }

  // jährliche Ersparnis (kWh)
  let ersparnisKwh = alt - neu;

  // jährliche Kostenersparnis (€)
  let ersparnisEuro = (ersparnisKwh * strompreis) / 100;

  // zusätzliche "Kosten" durch Herstellungsenergie (in € umgerechnet)
  let herstellungKosten = (herstellung * strompreis) / 100;

  // Gesamtinvestition
  let gesamtKosten = preis + herstellungKosten;

  // Amortisationszeit
  let jahre = gesamtKosten / ersparnisEuro;

  // Ergebnis
  document.getElementById("ergebnis3").value =
    "Ersparnis: " +
    ersparnisEuro.toFixed(2) +
    " €/Jahr | Amortisation: " +
    jahre.toFixed(1) +
    " Jahre";
});
