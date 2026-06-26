import { useState, useEffect } from "react";

const COUNTRIES = [
  // EINFACH – sehr bekannte Länder
  { name: "Deutschland", code: "de", capital: "Berlin", flag: "🇩🇪", continent: "Europa", difficulty: "einfach", funFact: "In Deutschland gibt es über 1.500 verschiedene Wurstsorten und mehr als 1.300 Brauereien." },
  { name: "Frankreich", code: "fr", capital: "Paris", flag: "🇫🇷", continent: "Europa", difficulty: "einfach", funFact: "Es ist in Frankreich erlaubt, einen Verstorbenen zu heiraten – mit Genehmigung des Präsidenten." },
  { name: "Japan", code: "jp", capital: "Tokio", flag: "🇯🇵", continent: "Asien", difficulty: "einfach", funFact: "In Japan gibt es mehr als 5 Millionen Verkaufsautomaten – sogar für frische Eier und heiße Ramen." },
  { name: "Brasilien", code: "br", capital: "Brasília", flag: "🇧🇷", continent: "Südamerika", difficulty: "einfach", funFact: "Brasilien hat über 60 Tage im Jahr offizielle Feiertage und Festivals irgendwo im Land." },
  { name: "Kanada", code: "ca", capital: "Ottawa", flag: "🇨🇦", continent: "Nordamerika", difficulty: "einfach", funFact: "Kanada hat mehr Seen als alle anderen Länder der Welt zusammen." },
  { name: "Australien", code: "au", capital: "Canberra", flag: "🇦🇺", continent: "Ozeanien", difficulty: "einfach", funFact: "In Australien gibt es mehr Kängurus als Menschen – etwa doppelt so viele." },
  { name: "Italien", code: "it", capital: "Rom", flag: "🇮🇹", continent: "Europa", difficulty: "einfach", funFact: "In Rom werfen Menschen jährlich über 1,5 Millionen Euro in den Trevi-Brunnen." },
  { name: "Spanien", code: "es", capital: "Madrid", flag: "🇪🇸", continent: "Europa", difficulty: "einfach", funFact: "Spanien hat keine offizielle Nationalhymne mit Text – sie wird nur instrumental gespielt." },
  { name: "Ägypten", code: "eg", capital: "Kairo", flag: "🇪🇬", continent: "Afrika", difficulty: "einfach", funFact: "Die alten Ägypter erfanden die Zahnpasta – und auch den ersten bekannten Friedensvertrag." },
  { name: "Indien", code: "in", capital: "Neu-Delhi", flag: "🇮🇳", continent: "Asien", difficulty: "einfach", funFact: "In Indien wurde die Zahl Null erfunden – ohne sie gäbe es keine moderne Mathematik." },
  { name: "Mexiko", code: "mx", capital: "Mexiko-Stadt", flag: "🇲🇽", continent: "Nordamerika", difficulty: "einfach", funFact: "Mexiko-Stadt sinkt jedes Jahr um bis zu 50 cm, weil sie auf einem ausgetrockneten See gebaut ist." },

  // MITTEL – bekannt, aber Hauptstadt/Details kniffliger
  { name: "Argentinien", code: "ar", capital: "Buenos Aires", flag: "🇦🇷", continent: "Südamerika", difficulty: "mittel", funFact: "In Argentinien ist der Tango entstanden – und Buenos Aires hat die meisten Buchläden pro Kopf weltweit." },
  { name: "Südafrika", code: "za", capital: "Pretoria", flag: "🇿🇦", continent: "Afrika", difficulty: "mittel", funFact: "Südafrika hat drei Hauptstädte: Pretoria, Kapstadt und Bloemfontein." },
  { name: "Norwegen", code: "no", capital: "Oslo", flag: "🇳🇴", continent: "Europa", difficulty: "mittel", funFact: "In Norwegen wurde ein Pinguin zum Ritter geschlagen – er ist Maskottchen der norwegischen Garde." },
  { name: "Thailand", code: "th", capital: "Bangkok", flag: "🇹🇭", continent: "Asien", difficulty: "mittel", funFact: "Der vollständige Zeremonienname von Bangkok ist mit 168 Buchstaben der längste Ortsname der Welt." },
  { name: "Portugal", code: "pt", capital: "Lissabon", flag: "🇵🇹", continent: "Europa", difficulty: "mittel", funFact: "Portugal ist eines der ältesten Länder Europas – seine Grenzen sind seit 1139 fast unverändert." },
  { name: "Griechenland", code: "gr", capital: "Athen", flag: "🇬🇷", continent: "Europa", difficulty: "mittel", funFact: "In Griechenland gibt es keinen Punkt im Land, der weiter als 137 km vom Meer entfernt ist." },
  { name: "Schweiz", code: "ch", capital: "Bern", flag: "🇨🇭", continent: "Europa", difficulty: "mittel", funFact: "In der Schweiz ist es verboten, nur ein einzelnes Meerschweinchen zu halten – sie gelten als zu sozial." },
  { name: "Niederlande", code: "nl", capital: "Amsterdam", flag: "🇳🇱", continent: "Europa", difficulty: "mittel", funFact: "In den Niederlanden gibt es mehr Fahrräder als Einwohner." },
  { name: "Schweden", code: "se", capital: "Stockholm", flag: "🇸🇪", continent: "Europa", difficulty: "mittel", funFact: "Schweden hat eine eigene Telefonnummer, unter der man mit einem zufälligen Schweden plaudern kann." },
  { name: "Polen", code: "pl", capital: "Warschau", flag: "🇵🇱", continent: "Europa", difficulty: "mittel", funFact: "In Polen steht der einzige Wald der Welt, in dem über 400 Kiefern rätselhaft krumm gewachsen sind." },
  { name: "Türkei", code: "tr", capital: "Ankara", flag: "🇹🇷", continent: "Asien", difficulty: "mittel", funFact: "Der Weihnachtsmann (St. Nikolaus) stammt aus der heutigen Türkei, nicht vom Nordpol." },
  { name: "Saudi-Arabien", code: "sa", capital: "Riad", flag: "🇸🇦", continent: "Asien", difficulty: "mittel", funFact: "Saudi-Arabien hat keinen einzigen natürlichen Fluss – das ganze Land kommt ohne aus." },
  { name: "Nigeria", code: "ng", capital: "Abuja", flag: "🇳🇬", continent: "Afrika", difficulty: "mittel", funFact: "Nigeria produziert so viele Filme, dass seine Industrie 'Nollywood' nach Bollywood die zweitgrößte der Welt ist." },
  { name: "Kenia", code: "ke", capital: "Nairobi", flag: "🇰🇪", continent: "Afrika", difficulty: "mittel", funFact: "Kenia hat den einzigen Nationalpark der Welt direkt am Rand einer Millionen-Hauptstadt." },
  { name: "Neuseeland", code: "nz", capital: "Wellington", flag: "🇳🇿", continent: "Ozeanien", difficulty: "mittel", funFact: "In Neuseeland leben rund 6 Schafe pro Mensch – früher waren es sogar über 20." },
  { name: "Chile", code: "cl", capital: "Santiago", flag: "🇨🇱", continent: "Südamerika", difficulty: "mittel", funFact: "In Chiles Atacama-Wüste hat es an manchen Orten seit Jahrhunderten nicht geregnet." },
  { name: "Vietnam", code: "vn", capital: "Hanoi", flag: "🇻🇳", continent: "Asien", difficulty: "mittel", funFact: "Vietnam ist der zweitgrößte Kaffeeproduzent der Welt – Eierkaffee ist dort eine Spezialität." },
  { name: "Marokko", code: "ma", capital: "Rabat", flag: "🇲🇦", continent: "Afrika", difficulty: "mittel", funFact: "In Marokko klettern Ziegen auf Arganbäume und fressen die Früchte – aus deren Kernen wird Arganöl gemacht." },
  { name: "Österreich", code: "at", capital: "Wien", flag: "🇦🇹", continent: "Europa", difficulty: "mittel", funFact: "Die Schneekugel wurde in Wien erfunden – eher zufällig bei einem Experiment mit OP-Lampen." },

  // SCHWER – weniger bekannte Länder & überraschende Hauptstädte
  { name: "Kasachstan", code: "kz", capital: "Astana", flag: "🇰🇿", continent: "Asien", difficulty: "schwer", funFact: "Kasachstan ist das größte Binnenland der Welt – größer als ganz Westeuropa." },
  { name: "Bhutan", code: "bt", capital: "Thimphu", flag: "🇧🇹", continent: "Asien", difficulty: "schwer", funFact: "Bhutan misst sein 'Bruttonationalglück' statt nur das Wirtschaftswachstum." },
  { name: "Eritrea", code: "er", capital: "Asmara", flag: "🇪🇷", continent: "Afrika", difficulty: "schwer", funFact: "Eritreas Hauptstadt Asmara gilt als eine der besterhaltenen Art-déco-Städte der Welt." },
  { name: "Suriname", code: "sr", capital: "Paramaribo", flag: "🇸🇷", continent: "Südamerika", difficulty: "schwer", funFact: "Suriname ist das am dichtesten bewaldete Land der Erde – über 90 % sind Regenwald." },
  { name: "Turkmenistan", code: "tm", capital: "Aschgabat", flag: "🇹🇲", continent: "Asien", difficulty: "schwer", funFact: "In Turkmenistan brennt seit 1971 ein Gaskrater – das 'Tor zur Hölle'." },
  { name: "Slowenien", code: "si", capital: "Ljubljana", flag: "🇸🇮", continent: "Europa", difficulty: "schwer", funFact: "Sloweniens Name enthält das Wort 'love' – und über die Hälfte des Landes ist Wald." },
  { name: "Paraguay", code: "py", capital: "Asunción", flag: "🇵🇾", continent: "Südamerika", difficulty: "schwer", funFact: "Paraguays Flagge sieht auf Vorder- und Rückseite unterschiedlich aus – einzigartig weltweit." },
  { name: "Laos", code: "la", capital: "Vientiane", flag: "🇱🇦", continent: "Asien", difficulty: "schwer", funFact: "Laos ist das am stärksten bombardierte Land der Geschichte – pro Kopf gerechnet." },
  { name: "Aserbaidschan", code: "az", capital: "Baku", flag: "🇦🇿", continent: "Asien", difficulty: "schwer", funFact: "Aserbaidschan heißt 'Land des Feuers' – aus dem Boden tretendes Gas brennt dort von selbst." },
  { name: "Sambia", code: "zm", capital: "Lusaka", flag: "🇿🇲", continent: "Afrika", difficulty: "schwer", funFact: "An den Victoriafällen in Sambia kann man im 'Devil's Pool' direkt am Abgrund baden." },
  { name: "Moldau", code: "md", capital: "Chișinău", flag: "🇲🇩", continent: "Europa", difficulty: "schwer", funFact: "Moldau hat den größten Weinkeller der Welt – mit über 200 km unterirdischen Gängen." },
  { name: "Brunei", code: "bn", capital: "Bandar Seri Begawan", flag: "🇧🇳", continent: "Asien", difficulty: "schwer", funFact: "Bruneis Sultan besitzt einen Palast mit fast 1.800 Zimmern – den größten Wohnpalast der Welt." },
];

const DIFFICULTY_META = {
  einfach: { label: "Einfach", color: "#22c55e", mult: 1 },
  mittel: { label: "Mittel", color: "#fbbf24", mult: 1.5 },
  schwer: { label: "Schwer", color: "#ef4444", mult: 2 },
};

// General-knowledge topics. Each question: { q, display, options, answer, difficulty, funFact }
const TOPIC_QUESTIONS = {
  wissenschaft: [
  // ── EINFACH (solides Schulwissen, nicht trivial) ─────────
  { q: "Welches Element hat das chemische Symbol 'Fe'?", options: ["Eisen", "Fluor", "Francium", "Kupfer"], answer: "Eisen", difficulty: "einfach", funFact: "'Fe' stammt vom lateinischen 'ferrum'." },
  { q: "Welcher Planet wird wegen seiner Farbe 'roter Planet' genannt?", options: ["Mars", "Jupiter", "Venus", "Merkur"], answer: "Mars", difficulty: "einfach", funFact: "Die Farbe stammt von Eisenoxid – also Rost." },
  { q: "Welches Organ entgiftet hauptsächlich den Körper?", options: ["Leber", "Herz", "Lunge", "Magen"], answer: "Leber", difficulty: "einfach", funFact: "Die Leber kann sich teilweise selbst regenerieren." },
  { q: "Welches Gas macht den größten Teil der Erdatmosphäre aus?", options: ["Stickstoff", "Sauerstoff", "Kohlendioxid", "Argon"], answer: "Stickstoff", difficulty: "einfach", funFact: "Rund 78 % der Luft sind Stickstoff." },
  { q: "Welcher Planet hat ein auffälliges Ringsystem?", options: ["Saturn", "Mars", "Merkur", "Venus"], answer: "Saturn", difficulty: "einfach", funFact: "Die Ringe bestehen vor allem aus Eis und Gestein." },
  { q: "Welches Tier nutzt Echoortung zur Orientierung?", options: ["Fledermaus", "Adler", "Hase", "Pferd"], answer: "Fledermaus", difficulty: "einfach", funFact: "Auch Delfine orientieren sich mit Echoortung." },
  { q: "Wie nennt man die Umwandlung von Raupe zu Schmetterling?", options: ["Metamorphose", "Mutation", "Symbiose", "Osmose"], answer: "Metamorphose", difficulty: "einfach" },
  { q: "Welcher Knochen ist der längste im menschlichen Körper?", options: ["Oberschenkelknochen", "Oberarmknochen", "Schienbein", "Elle"], answer: "Oberschenkelknochen", difficulty: "einfach" },
  { q: "Welcher Teil des Blutes transportiert Sauerstoff?", options: ["Rote Blutkörperchen", "Weiße Blutkörperchen", "Blutplättchen", "Plasma"], answer: "Rote Blutkörperchen", difficulty: "einfach", funFact: "Der rote Farbstoff Hämoglobin enthält Eisen." },
  { q: "Welche Tierklasse umfasst Frösche und Kröten?", options: ["Amphibien", "Reptilien", "Säugetiere", "Fische"], answer: "Amphibien", difficulty: "einfach" },
  { q: "Welcher Vorgang lässt Eisen rosten?", options: ["Oxidation", "Verdampfung", "Gärung", "Schmelzen"], answer: "Oxidation", difficulty: "einfach" },
  { q: "Was misst die Richterskala?", options: ["Erdbebenstärke", "Windgeschwindigkeit", "Temperatur", "Lautstärke"], answer: "Erdbebenstärke", difficulty: "einfach" },
  { q: "Was beschreibt der Begriff 'Fotosynthese'?", options: ["Energiegewinnung aus Licht", "Zellteilung", "Atmung", "Verdauung"], answer: "Energiegewinnung aus Licht", difficulty: "einfach", funFact: "Dabei wird Kohlendioxid in Sauerstoff umgewandelt." },
  { q: "Welcher deutsche Physiker entdeckte die nach ihm benannten Strahlen?", options: ["Röntgen", "Planck", "Hertz", "Ohm"], answer: "Röntgen", difficulty: "einfach", funFact: "Röntgen erhielt 1901 den ersten Physik-Nobelpreis." },
  { q: "Wie heißt die kleinste Einheit eines chemischen Elements?", options: ["Atom", "Molekül", "Zelle", "Ion"], answer: "Atom", difficulty: "einfach" },

  // ── MITTEL ───────────────────────────────────────────────
  { q: "Welches Teilchen hat eine negative Ladung?", options: ["Elektron", "Proton", "Neutron", "Positron"], answer: "Elektron", difficulty: "mittel" },
  { q: "Welches Organell wird als 'Kraftwerk der Zelle' bezeichnet?", options: ["Mitochondrium", "Zellkern", "Ribosom", "Golgi-Apparat"], answer: "Mitochondrium", difficulty: "mittel", funFact: "Mitochondrien haben sogar ihre eigene DNA." },
  { q: "Welche Blutgruppe gilt als Universalspender?", options: ["0 negativ", "AB positiv", "A positiv", "B negativ"], answer: "0 negativ", difficulty: "mittel" },
  { q: "Wie heißt der Vorgang, bei dem ein Feststoff direkt zu Gas wird?", options: ["Sublimation", "Verdunstung", "Kondensation", "Diffusion"], answer: "Sublimation", difficulty: "mittel", funFact: "Trockeneis sublimiert direkt, ohne flüssig zu werden." },
  { q: "Welche Strahlung hat die kürzeste Wellenlänge?", options: ["Gammastrahlung", "Infrarot", "Radiowellen", "Mikrowellen"], answer: "Gammastrahlung", difficulty: "mittel" },
  { q: "Welcher Forscher entwickelte die Evolutionstheorie?", options: ["Darwin", "Mendel", "Lamarck", "Linné"], answer: "Darwin", difficulty: "mittel", funFact: "Seine Reise auf der HMS Beagle prägte seine Ideen." },
  { q: "Was beschreibt der pH-Wert?", options: ["Säuregrad", "Temperatur", "Dichte", "Leitfähigkeit"], answer: "Säuregrad", difficulty: "mittel", funFact: "Ein pH-Wert von 7 gilt als neutral." },
  { q: "Welche Einheit misst die Frequenz?", options: ["Hertz", "Watt", "Joule", "Newton"], answer: "Hertz", difficulty: "mittel" },
  { q: "Welcher Teil des Gehirns steuert das Gleichgewicht?", options: ["Kleinhirn", "Großhirn", "Stammhirn", "Zwischenhirn"], answer: "Kleinhirn", difficulty: "mittel" },
  { q: "Welcher Wissenschaftler entdeckte das Penicillin?", options: ["Fleming", "Pasteur", "Koch", "Curie"], answer: "Fleming", difficulty: "mittel", funFact: "Die Entdeckung 1928 war ein glücklicher Zufall." },
  { q: "Welche Teilchen bilden den Atomkern?", options: ["Protonen und Neutronen", "Elektronen und Protonen", "Nur Neutronen", "Nur Elektronen"], answer: "Protonen und Neutronen", difficulty: "mittel" },
  { q: "Welches chemische Element hat die Ordnungszahl 1?", options: ["Wasserstoff", "Helium", "Sauerstoff", "Kohlenstoff"], answer: "Wasserstoff", difficulty: "mittel" },
  { q: "Wie nennt man die Wissenschaft von Erdbeben?", options: ["Seismologie", "Geologie", "Meteorologie", "Vulkanologie"], answer: "Seismologie", difficulty: "mittel" },
  { q: "Welche Blutgefäße transportieren Blut zum Herzen zurück?", options: ["Venen", "Arterien", "Kapillaren", "Aorta"], answer: "Venen", difficulty: "mittel" },
  { q: "Welches Hormon wird oft 'Stresshormon' genannt?", options: ["Cortisol", "Insulin", "Melatonin", "Testosteron"], answer: "Cortisol", difficulty: "mittel" },
  { q: "Welches Gas entsteht bei der Zellatmung als Abfallprodukt?", options: ["Kohlendioxid", "Sauerstoff", "Wasserstoff", "Stickstoff"], answer: "Kohlendioxid", difficulty: "mittel" },
  { q: "Welche Kraft wirkt zwischen elektrischen Ladungen?", options: ["Coulomb-Kraft", "Gravitation", "Reibung", "Auftrieb"], answer: "Coulomb-Kraft", difficulty: "mittel" },
  { q: "Welcher Stoff macht Pflanzenblätter grün?", options: ["Chlorophyll", "Karotin", "Melanin", "Hämoglobin"], answer: "Chlorophyll", difficulty: "mittel" },
  { q: "Welches Subatomare Teilchen hat keine Ladung?", options: ["Neutron", "Elektron", "Proton", "Myon"], answer: "Neutron", difficulty: "mittel" },
  { q: "Welche Einheit beschreibt die elektrische Stromstärke?", options: ["Ampere", "Volt", "Watt", "Ohm"], answer: "Ampere", difficulty: "mittel", funFact: "Ein Blitz transportiert kurzzeitig bis zu 30.000 Ampere." },
  { q: "Welcher Planet hat die meisten bekannten Monde?", options: ["Saturn", "Jupiter", "Uranus", "Neptun"], answer: "Saturn", difficulty: "mittel" },
  { q: "Was bezeichnet der Begriff 'Osmose'?", options: ["Wanderung von Wasser durch eine Membran", "Zellteilung", "Lichtbrechung", "Wärmeleitung"], answer: "Wanderung von Wasser durch eine Membran", difficulty: "mittel" },
  { q: "Welcher Wissenschaftler formulierte die Bewegungsgesetze?", options: ["Newton", "Einstein", "Galilei", "Kepler"], answer: "Newton", difficulty: "mittel", funFact: "Sein Werk 'Principia' erschien 1687." },
  { q: "Welches Element ist für die Schilddrüsenfunktion wichtig?", options: ["Jod", "Eisen", "Kalzium", "Zink"], answer: "Jod", difficulty: "mittel" },
  { q: "Was misst ein Voltmeter?", options: ["Spannung", "Stromstärke", "Widerstand", "Leistung"], answer: "Spannung", difficulty: "mittel" },
  { q: "Welche Zellen leiten Nervensignale weiter?", options: ["Neuronen", "Erythrozyten", "Osteozyten", "Adipozyten"], answer: "Neuronen", difficulty: "mittel" },
  { q: "Welches Edelgas wird in Leuchtreklamen verwendet?", options: ["Neon", "Helium", "Argon", "Krypton"], answer: "Neon", difficulty: "mittel", funFact: "Daher der Begriff 'Neonröhre'." },
  { q: "Wie nennt man die Verschmelzung von Atomkernen?", options: ["Kernfusion", "Kernspaltung", "Ionisation", "Oxidation"], answer: "Kernfusion", difficulty: "mittel", funFact: "Die Sonne gewinnt ihre Energie durch Kernfusion." },
  { q: "Welcher Effekt erklärt die Tonhöhenänderung vorbeifahrender Sirenen?", options: ["Doppler-Effekt", "Treibhauseffekt", "Tunneleffekt", "Foto-Effekt"], answer: "Doppler-Effekt", difficulty: "mittel" },
  { q: "Welches Vitamin entsteht in der Haut durch Sonnenlicht?", options: ["Vitamin D", "Vitamin C", "Vitamin K", "Vitamin B12"], answer: "Vitamin D", difficulty: "mittel" },
  { q: "Welcher Begriff beschreibt Tiere mit gleichbleibender Körpertemperatur?", options: ["Gleichwarm", "Wechselwarm", "Kaltblütig", "Winterstarr"], answer: "Gleichwarm", difficulty: "mittel", funFact: "Säugetiere und Vögel sind gleichwarm." },
  { q: "Welches Modell beschreibt den Atomaufbau mit Elektronenschalen?", options: ["Bohrsches Modell", "Urknallmodell", "Schalenmodell der Erde", "Zellmodell"], answer: "Bohrsches Modell", difficulty: "mittel" },
  { q: "Welcher Planet dreht sich rückläufig, also entgegengesetzt zu den meisten?", options: ["Venus", "Mars", "Jupiter", "Erde"], answer: "Venus", difficulty: "mittel", funFact: "Auf der Venus geht die Sonne im Westen auf." },
  { q: "Welche Säure ist im Magen für die Verdauung wichtig?", options: ["Salzsäure", "Schwefelsäure", "Essigsäure", "Zitronensäure"], answer: "Salzsäure", difficulty: "mittel" },
  { q: "Welcher Wissenschaftler gilt als Begründer der modernen Genetik?", options: ["Mendel", "Darwin", "Watson", "Pasteur"], answer: "Mendel", difficulty: "mittel" },
  { q: "Welche physikalische Größe wird in Joule gemessen?", options: ["Energie", "Kraft", "Druck", "Geschwindigkeit"], answer: "Energie", difficulty: "mittel" },
  { q: "Welcher Bestandteil der Zelle steuert die Vererbung?", options: ["DNA", "Membran", "Zytoplasma", "Vakuole"], answer: "DNA", difficulty: "mittel" },
  { q: "Welches Element ist nach einem Land Europas benannt?", options: ["Germanium", "Helium", "Titan", "Neon"], answer: "Germanium", difficulty: "mittel", funFact: "Germanium ist nach Deutschland benannt." },
  { q: "Wie nennt man Lebewesen, die ihre Nahrung selbst erzeugen?", options: ["Produzenten", "Konsumenten", "Destruenten", "Parasiten"], answer: "Produzenten", difficulty: "mittel" },
  { q: "Welche Wolkenart bringt typischerweise Gewitter?", options: ["Cumulonimbus", "Cirrus", "Stratus", "Nimbostratus"], answer: "Cumulonimbus", difficulty: "mittel" },
  { q: "Welche Maßeinheit beschreibt die Stoffmenge?", options: ["Mol", "Gramm", "Liter", "Kelvin"], answer: "Mol", difficulty: "mittel" },
  { q: "Welcher Prozess beschreibt das Aufspalten von Wasser durch Strom?", options: ["Elektrolyse", "Oxidation", "Destillation", "Filtration"], answer: "Elektrolyse", difficulty: "mittel" },
  { q: "Welche Temperatur entspricht dem absoluten Nullpunkt?", options: ["−273 °C", "0 °C", "−100 °C", "−459 °C"], answer: "−273 °C", difficulty: "mittel", funFact: "Am absoluten Nullpunkt steht jede Teilchenbewegung still." },

  // ── SCHWER ───────────────────────────────────────────────
  { q: "Welche Zahl beschreibt die Avogadro-Konstante grob?", options: ["6 × 10²³", "3 × 10⁸", "9 × 10⁹", "1 × 10⁶"], answer: "6 × 10²³", difficulty: "schwer", funFact: "Sie gibt die Zahl der Teilchen in einem Mol an." },
  { q: "Welcher Wissenschaftler stellte das Periodensystem auf?", options: ["Mendelejew", "Bohr", "Rutherford", "Pauling"], answer: "Mendelejew", difficulty: "schwer", funFact: "Er ließ Lücken für noch unentdeckte Elemente." },
  { q: "Welches Enzym entwindet die DNA bei der Replikation?", options: ["Helikase", "Polymerase", "Ligase", "Protease"], answer: "Helikase", difficulty: "schwer" },
  { q: "Welche Kraft hält Quarks in Protonen zusammen?", options: ["Starke Kernkraft", "Schwache Kernkraft", "Gravitation", "Elektromagnetismus"], answer: "Starke Kernkraft", difficulty: "schwer" },
  { q: "Welcher Stoff transportiert genetische Information aus dem Zellkern?", options: ["mRNA", "ATP", "Glukose", "Hämoglobin"], answer: "mRNA", difficulty: "schwer" },
  { q: "Welche Einheit beschreibt die radioaktive Aktivität?", options: ["Becquerel", "Pascal", "Tesla", "Lumen"], answer: "Becquerel", difficulty: "schwer" },
  { q: "Welcher Physiker formulierte die Unschärferelation?", options: ["Heisenberg", "Schrödinger", "Bohr", "Dirac"], answer: "Heisenberg", difficulty: "schwer", funFact: "Sie besagt, dass Ort und Impuls nicht gleichzeitig exakt messbar sind." },
  { q: "Welches Molekül ist der Hauptenergieträger der Zelle?", options: ["ATP", "DNA", "RNA", "NaCl"], answer: "ATP", difficulty: "schwer", funFact: "ATP wird oft 'Energiewährung' der Zelle genannt." },
  { q: "Welche Teilchen werden bei der Beta-Strahlung ausgesendet?", options: ["Elektronen", "Protonen", "Photonen", "Neutronen"], answer: "Elektronen", difficulty: "schwer" },
  { q: "Welcher Begriff beschreibt die Lichtbrechung in einem Prisma?", options: ["Dispersion", "Reflexion", "Beugung", "Absorption"], answer: "Dispersion", difficulty: "schwer", funFact: "Dabei wird weißes Licht in seine Farben zerlegt." },
  { q: "Welches Element ist das schwerste natürlich vorkommende?", options: ["Uran", "Blei", "Plutonium", "Gold"], answer: "Uran", difficulty: "schwer" },
  { q: "Welche Zellteilung erzeugt Keimzellen mit halbem Chromosomensatz?", options: ["Meiose", "Mitose", "Knospung", "Spaltung"], answer: "Meiose", difficulty: "schwer" },
  { q: "Welches Gesetz beschreibt die Beziehung von Druck und Volumen eines Gases?", options: ["Boyle-Mariotte", "Ohm", "Hooke", "Faraday"], answer: "Boyle-Mariotte", difficulty: "schwer" },
  { q: "Welche Galaxie ist unserer Milchstraße am nächsten?", options: ["Andromeda", "Sombrero", "Whirlpool", "Triangulum"], answer: "Andromeda", difficulty: "schwer", funFact: "Andromeda nähert sich uns und wird einst mit uns verschmelzen." },
  { q: "Welcher Wissenschaftler entschlüsselte mit Watson die DNA-Struktur?", options: ["Crick", "Franklin", "Pauling", "Mendel"], answer: "Crick", difficulty: "schwer", funFact: "Rosalind Franklins Röntgenbilder waren dafür entscheidend." },
  { q: "Welche Größe bleibt in einem abgeschlossenen System konstant?", options: ["Energie", "Temperatur", "Volumen", "Druck"], answer: "Energie", difficulty: "schwer", funFact: "Das ist der Energieerhaltungssatz." },
  { q: "Welches Element verleiht der Sonne ihre gelbe Färbung im Spektrum?", options: ["Natrium", "Eisen", "Helium", "Calcium"], answer: "Natrium", difficulty: "schwer" },
  { q: "Welcher pH-Bereich gilt als stark sauer?", options: ["0 bis 3", "7 bis 8", "10 bis 12", "6 bis 7"], answer: "0 bis 3", difficulty: "schwer" },
  { q: "Welche physikalische Konstante hat den Wert von etwa 9,81 m/s²?", options: ["Erdbeschleunigung", "Lichtgeschwindigkeit", "Schallgeschwindigkeit", "Gaskonstante"], answer: "Erdbeschleunigung", difficulty: "schwer" },
  { q: "Welcher Prozess beschreibt die Umwandlung von Stickstoff in nutzbare Form durch Bakterien?", options: ["Stickstofffixierung", "Nitrifikation", "Photosynthese", "Gärung"], answer: "Stickstofffixierung", difficulty: "schwer" },
  { q: "Welches Teilchen vermittelt die elektromagnetische Kraft?", options: ["Photon", "Gluon", "Boson", "Neutrino"], answer: "Photon", difficulty: "schwer" },
  { q: "Welcher Wissenschaftler prägte den Begriff der Quanten?", options: ["Max Planck", "Albert Einstein", "Niels Bohr", "Werner Heisenberg"], answer: "Max Planck", difficulty: "schwer", funFact: "Planck gilt als Begründer der Quantenphysik." },
  { q: "Welche Blutgefäße sind am dünnsten?", options: ["Kapillaren", "Arterien", "Venen", "Aorta"], answer: "Kapillaren", difficulty: "schwer" },
  { q: "Welcher Stoff ist für die Blutgerinnung notwendig?", options: ["Vitamin K", "Vitamin C", "Vitamin D", "Vitamin A"], answer: "Vitamin K", difficulty: "schwer" },
  { q: "Welche Reaktion läuft in der Sonne ab und erzeugt ihre Energie?", options: ["Wasserstofffusion", "Urankernspaltung", "Verbrennung", "Oxidation"], answer: "Wasserstofffusion", difficulty: "schwer" },
  { q: "Welches Element hat das chemische Symbol 'W'?", options: ["Wolfram", "Wasserstoff", "Wismut", "Vanadium"], answer: "Wolfram", difficulty: "schwer", funFact: "Wolfram hat den höchsten Schmelzpunkt aller Metalle." },
  { q: "Welche Theorie erklärt die Entstehung des Universums?", options: ["Urknalltheorie", "Relativitätstheorie", "Evolutionstheorie", "Quantentheorie"], answer: "Urknalltheorie", difficulty: "schwer" },
  { q: "Welche Wellenart ist Schall?", options: ["Longitudinalwelle", "Transversalwelle", "Elektromagnetische Welle", "Stehende Welle"], answer: "Longitudinalwelle", difficulty: "schwer" },
  { q: "Welcher Teil des Ohrs wandelt Schall in Nervensignale um?", options: ["Schnecke", "Trommelfell", "Hammer", "Steigbügel"], answer: "Schnecke", difficulty: "schwer" },
  { q: "Welches Hormon senkt den Blutzuckerspiegel?", options: ["Insulin", "Glukagon", "Adrenalin", "Cortisol"], answer: "Insulin", difficulty: "schwer" },
  { q: "Welche Einheit beschreibt die magnetische Flussdichte?", options: ["Tesla", "Weber", "Henry", "Gauss"], answer: "Tesla", difficulty: "schwer" },
  { q: "Welcher Begriff beschreibt das gleichzeitige Vorkommen zweier Arten zum gegenseitigen Nutzen?", options: ["Symbiose", "Parasitismus", "Konkurrenz", "Mimikry"], answer: "Symbiose", difficulty: "schwer" },
  { q: "Welche Schicht der Erde ist flüssig?", options: ["Äußerer Erdkern", "Erdkruste", "Innerer Erdkern", "Lithosphäre"], answer: "Äußerer Erdkern", difficulty: "schwer", funFact: "Der innere Erdkern ist trotz größerer Hitze fest." },
  { q: "Welcher Wissenschaftler entdeckte die Radioaktivität?", options: ["Becquerel", "Curie", "Röntgen", "Rutherford"], answer: "Becquerel", difficulty: "schwer", funFact: "Marie Curie prägte später den Begriff 'Radioaktivität'." },
  { q: "Welches Gas entsteht bei der alkoholischen Gärung neben Ethanol?", options: ["Kohlendioxid", "Sauerstoff", "Methan", "Wasserstoff"], answer: "Kohlendioxid", difficulty: "schwer" },
  { q: "Welcher Begriff beschreibt die Anzahl der Protonen eines Atoms?", options: ["Ordnungszahl", "Massenzahl", "Wertigkeit", "Isotopenzahl"], answer: "Ordnungszahl", difficulty: "schwer" },
  { q: "Welche Strahlung wird von der Ozonschicht abgefangen?", options: ["UV-Strahlung", "Infrarot", "Radiowellen", "Mikrowellen"], answer: "UV-Strahlung", difficulty: "schwer" },
  { q: "Welcher Planet hat die höchste Oberflächentemperatur?", options: ["Venus", "Merkur", "Mars", "Jupiter"], answer: "Venus", difficulty: "schwer", funFact: "Ihre dichte Atmosphäre staut die Hitze wie ein Treibhaus." },
  { q: "Welche organische Verbindungsklasse umfasst Traubenzucker?", options: ["Kohlenhydrate", "Fette", "Proteine", "Nukleinsäuren"], answer: "Kohlenhydrate", difficulty: "schwer" },
  { q: "Welcher Wissenschaftler entwickelte die Impfung gegen Tollwut?", options: ["Pasteur", "Koch", "Fleming", "Jenner"], answer: "Pasteur", difficulty: "schwer" },
  { q: "Welche Kraft beschreibt das Trägheitsverhalten von Körpern?", options: ["Erstes Newtonsches Gesetz", "Auftrieb", "Zentripetalkraft", "Reibung"], answer: "Erstes Newtonsches Gesetz", difficulty: "schwer" },
  { q: "Welches Element ist Hauptbestandteil organischer Verbindungen?", options: ["Kohlenstoff", "Sauerstoff", "Stickstoff", "Silizium"], answer: "Kohlenstoff", difficulty: "schwer" },
  { q: "Welcher Vorgang beschreibt die Aufnahme von Teilchen in eine Zelle durch Einstülpung?", options: ["Endozytose", "Exozytose", "Osmose", "Diffusion"], answer: "Endozytose", difficulty: "schwer" },
  { q: "Welche Sternenklasse beschreibt unsere Sonne?", options: ["Gelber Zwerg", "Roter Riese", "Weißer Zwerg", "Blauer Überriese"], answer: "Gelber Zwerg", difficulty: "schwer" },
  { q: "Welcher Stoffwechselweg baut Glukose ohne Sauerstoff ab?", options: ["Glykolyse", "Zitronensäurezyklus", "Atmungskette", "Photosynthese"], answer: "Glykolyse", difficulty: "schwer" },
],
  geschichte: [
  // ── EINFACH ──
  { q: "In welchem Jahr fiel die Berliner Mauer?", options: ["1989", "1991", "1987", "1990"], answer: "1989", difficulty: "einfach", funFact: "Der Mauerfall geschah teils durch eine zu früh verlesene Pressemitteilung." },
  { q: "Welches antike Weltwunder steht noch heute?", options: ["Pyramiden von Gizeh", "Koloss von Rhodos", "Hängende Gärten", "Leuchtturm von Pharos"], answer: "Pyramiden von Gizeh", difficulty: "einfach" },
  { q: "Wer malte die Mona Lisa?", options: ["Leonardo da Vinci", "Michelangelo", "Raffael", "Tizian"], answer: "Leonardo da Vinci", difficulty: "einfach", funFact: "Die Mona Lisa hat keine sichtbaren Augenbrauen." },
  { q: "In welchem Jahr begann der Erste Weltkrieg?", options: ["1914", "1912", "1916", "1918"], answer: "1914", difficulty: "einfach" },
  { q: "Welches Schiff sank 1912 auf seiner Jungfernfahrt?", options: ["Titanic", "Lusitania", "Bismarck", "Mayflower"], answer: "Titanic", difficulty: "einfach", funFact: "Sie hatte Rettungsboote für nur etwa die Hälfte der Passagiere." },
  { q: "Wer war der erste Mensch auf dem Mond?", options: ["Neil Armstrong", "Buzz Aldrin", "Juri Gagarin", "Michael Collins"], answer: "Neil Armstrong", difficulty: "einfach" },
  { q: "Welches Reich baute das Kolosseum?", options: ["Römisches Reich", "Griechenland", "Ägypten", "Persien"], answer: "Römisches Reich", difficulty: "einfach", funFact: "Im Kolosseum fanden bis zu 50.000 Zuschauer Platz." },
  { q: "Welcher Krieg fand zwischen 1939 und 1945 statt?", options: ["Zweiter Weltkrieg", "Erster Weltkrieg", "Kalter Krieg", "Dreißigjähriger Krieg"], answer: "Zweiter Weltkrieg", difficulty: "einfach" },
  { q: "Wer entdeckte 1492 Amerika für Europa?", options: ["Christoph Kolumbus", "Vasco da Gama", "Magellan", "Marco Polo"], answer: "Christoph Kolumbus", difficulty: "einfach" },
  { q: "Welche Mauer wurde 1961 errichtet?", options: ["Berliner Mauer", "Chinesische Mauer", "Hadrianswall", "Klagemauer"], answer: "Berliner Mauer", difficulty: "einfach" },
  { q: "In welchem Land stehen die Pyramiden von Gizeh?", options: ["Ägypten", "Mexiko", "Sudan", "Irak"], answer: "Ägypten", difficulty: "einfach" },
  { q: "Welche Revolution begann 1789?", options: ["Französische Revolution", "Russische Revolution", "Amerikanische Revolution", "Industrielle Revolution"], answer: "Französische Revolution", difficulty: "einfach", funFact: "Ihr Motto war 'Freiheit, Gleichheit, Brüderlichkeit'." },
  { q: "Welcher antike Herrscher eroberte ein riesiges Reich bis nach Indien?", options: ["Alexander der Große", "Hannibal", "Caesar", "Nero"], answer: "Alexander der Große", difficulty: "einfach" },
  { q: "Welche antike Stadt wurde vom Vesuv verschüttet?", options: ["Pompeji", "Karthago", "Troja", "Sparta"], answer: "Pompeji", difficulty: "einfach" },
  { q: "In welchem Land begann die Industrielle Revolution?", options: ["England", "Deutschland", "Frankreich", "USA"], answer: "England", difficulty: "einfach", funFact: "Die Dampfmaschine war ihr Motor." },

  // ── MITTEL ──
  { q: "Wer war die letzte aktive Pharaonin Ägyptens?", options: ["Kleopatra", "Nofretete", "Hatschepsut", "Nitokris"], answer: "Kleopatra", difficulty: "mittel", funFact: "Sie lebte näher an der Mondlandung als am Bau der Pyramiden." },
  { q: "Welche Stadt war das Zentrum des Inka-Reiches?", options: ["Cusco", "Lima", "Quito", "Tiwanaku"], answer: "Cusco", difficulty: "mittel", funFact: "Die Inka nutzten Knotenschnüre namens 'Quipu' zur Datenspeicherung." },
  { q: "Wer war der erste römische Kaiser?", options: ["Augustus", "Julius Caesar", "Nero", "Konstantin"], answer: "Augustus", difficulty: "mittel", funFact: "Er hieß ursprünglich Octavian." },
  { q: "In welchem Jahr endete der Zweite Weltkrieg in Europa?", options: ["1945", "1944", "1946", "1943"], answer: "1945", difficulty: "mittel" },
  { q: "Wer führte den ersten erfolgreichen Motorflug durch?", options: ["Gebrüder Wright", "Otto Lilienthal", "Louis Blériot", "Charles Lindbergh"], answer: "Gebrüder Wright", difficulty: "mittel", funFact: "Der erste Motorflug 1903 dauerte nur 12 Sekunden." },
  { q: "Welcher Pharao wurde 1922 in einem fast unberührten Grab gefunden?", options: ["Tutanchamun", "Ramses II.", "Echnaton", "Cheops"], answer: "Tutanchamun", difficulty: "mittel" },
  { q: "Wer war die erste Frau, die einen Nobelpreis erhielt?", options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Lise Meitner"], answer: "Marie Curie", difficulty: "mittel", funFact: "Sie gewann ihn sogar zweimal." },
  { q: "In welchem Jahrhundert lebte Martin Luther?", options: ["16. Jahrhundert", "14. Jahrhundert", "18. Jahrhundert", "12. Jahrhundert"], answer: "16. Jahrhundert", difficulty: "mittel", funFact: "Sein Thesenanschlag 1517 löste die Reformation aus." },
  { q: "Welches Land war im Kalten Krieg der Gegenspieler der USA?", options: ["Sowjetunion", "China", "Frankreich", "Japan"], answer: "Sowjetunion", difficulty: "mittel" },
  { q: "Wer schrieb das 'Kommunistische Manifest' mit?", options: ["Karl Marx", "Lenin", "Stalin", "Bismarck"], answer: "Karl Marx", difficulty: "mittel", funFact: "Er verfasste es zusammen mit Friedrich Engels." },
  { q: "Welche Dynastie regierte Frankreich vor der Revolution von 1789?", options: ["Bourbonen", "Habsburger", "Tudor", "Romanow"], answer: "Bourbonen", difficulty: "mittel" },
  { q: "Welcher Feldherr überquerte mit Elefanten die Alpen?", options: ["Hannibal", "Caesar", "Scipio", "Alexander"], answer: "Hannibal", difficulty: "mittel", funFact: "Er kämpfte für Karthago gegen Rom." },
  { q: "Welcher deutsche Kanzler stand für die Wiedervereinigung 1990?", options: ["Helmut Kohl", "Willy Brandt", "Helmut Schmidt", "Konrad Adenauer"], answer: "Helmut Kohl", difficulty: "mittel" },
  { q: "Welche Königin regierte England im 'goldenen Zeitalter' um 1600?", options: ["Elisabeth I.", "Victoria", "Maria Stuart", "Anne"], answer: "Elisabeth I.", difficulty: "mittel" },
  { q: "Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?", options: ["Konrad Adenauer", "Ludwig Erhard", "Willy Brandt", "Kurt Georg Kiesinger"], answer: "Konrad Adenauer", difficulty: "mittel" },
  { q: "In welchem Jahr wurde die Unabhängigkeitserklärung der USA unterzeichnet?", options: ["1776", "1789", "1763", "1801"], answer: "1776", difficulty: "mittel" },
  { q: "Welche Stadt war Hauptstadt des Byzantinischen Reiches?", options: ["Konstantinopel", "Rom", "Athen", "Alexandria"], answer: "Konstantinopel", difficulty: "mittel", funFact: "Heute heißt sie Istanbul." },
  { q: "Welcher Entdecker umsegelte als Erster die Welt (seine Crew vollendete es)?", options: ["Magellan", "Kolumbus", "Vasco da Gama", "Drake"], answer: "Magellan", difficulty: "mittel" },
  { q: "Welches Volk schuf das erste bekannte Schriftsystem?", options: ["Sumerer", "Ägypter", "Griechen", "Römer"], answer: "Sumerer", difficulty: "mittel", funFact: "Ihre Keilschrift ist über 5.000 Jahre alt." },
  { q: "Welcher US-Präsident wurde 1865 ermordet?", options: ["Abraham Lincoln", "John F. Kennedy", "George Washington", "Andrew Jackson"], answer: "Abraham Lincoln", difficulty: "mittel" },
  { q: "Welche Epoche folgte auf das Mittelalter?", options: ["Renaissance", "Antike", "Aufklärung", "Romantik"], answer: "Renaissance", difficulty: "mittel" },
  { q: "Wer war der bekannteste Anführer der Hunnen?", options: ["Attila", "Dschingis Khan", "Spartacus", "Vercingetorix"], answer: "Attila", difficulty: "mittel" },
  { q: "Welches Ereignis löste den Ersten Weltkrieg aus?", options: ["Attentat von Sarajevo", "Sturm auf die Bastille", "Mauerfall", "Pearl Harbor"], answer: "Attentat von Sarajevo", difficulty: "mittel" },
  { q: "Welcher Forschungsreisende erreichte 1911 als Erster den Südpol?", options: ["Roald Amundsen", "Robert Scott", "Ernest Shackleton", "Fridtjof Nansen"], answer: "Roald Amundsen", difficulty: "mittel" },
  { q: "Welche Stadt wurde im Jahr 79 n. Chr. vom Vesuv begraben?", options: ["Pompeji", "Rom", "Neapel", "Ostia"], answer: "Pompeji", difficulty: "mittel" },
  { q: "Welcher englische König hatte sechs Ehefrauen?", options: ["Heinrich VIII.", "Richard Löwenherz", "Eduard I.", "Georg III."], answer: "Heinrich VIII.", difficulty: "mittel" },
  { q: "In welchem Jahr endete der Vietnamkrieg?", options: ["1975", "1968", "1980", "1972"], answer: "1975", difficulty: "mittel" },
  { q: "Wer erfand den Buchdruck mit beweglichen Lettern in Europa?", options: ["Johannes Gutenberg", "Leonardo da Vinci", "Galileo Galilei", "Martin Luther"], answer: "Johannes Gutenberg", difficulty: "mittel", funFact: "Sein berühmtestes Werk ist die Gutenberg-Bibel." },
  { q: "Welcher französische Herrscher krönte sich 1804 selbst zum Kaiser?", options: ["Napoleon Bonaparte", "Ludwig XIV.", "Karl der Große", "Robespierre"], answer: "Napoleon Bonaparte", difficulty: "mittel" },
  { q: "Welches Land entsandte die erste Sonde zum Mond?", options: ["Sowjetunion", "USA", "China", "Deutschland"], answer: "Sowjetunion", difficulty: "mittel", funFact: "Luna 2 erreichte den Mond 1959." },
  { q: "Welcher römische Politiker wurde an den Iden des März ermordet?", options: ["Julius Caesar", "Augustus", "Cicero", "Pompeius"], answer: "Julius Caesar", difficulty: "mittel" },
  { q: "Welche Mauer schützte das römische Britannien im Norden?", options: ["Hadrianswall", "Limes", "Große Mauer", "Antoninuswall"], answer: "Hadrianswall", difficulty: "mittel" },
  { q: "Welches Reich wurde von Dschingis Khan gegründet?", options: ["Mongolisches Reich", "Osmanisches Reich", "Perserreich", "Mauryareich"], answer: "Mongolisches Reich", difficulty: "mittel" },
  { q: "Welche deutsche Stadt war Schauplatz der Kriegsverbrecherprozesse 1945/46?", options: ["Nürnberg", "Berlin", "München", "Frankfurt"], answer: "Nürnberg", difficulty: "mittel" },
  { q: "Wer war die Jungfrau von Orléans?", options: ["Jeanne d'Arc", "Maria Theresia", "Elisabeth I.", "Katharina die Große"], answer: "Jeanne d'Arc", difficulty: "mittel" },
  { q: "Welches Volk gründete das antike Karthago?", options: ["Phönizier", "Griechen", "Römer", "Ägypter"], answer: "Phönizier", difficulty: "mittel" },
  { q: "Welcher Vertrag beendete 1919 offiziell den Ersten Weltkrieg?", options: ["Versailler Vertrag", "Wiener Kongress", "Vertrag von Maastricht", "Westfälischer Frieden"], answer: "Versailler Vertrag", difficulty: "mittel" },

  // ── SCHWER ──
  { q: "In welchem Jahr endete der Dreißigjährige Krieg?", options: ["1648", "1618", "1659", "1672"], answer: "1648", difficulty: "schwer", funFact: "Der Westfälische Friede prägt bis heute das Völkerrecht." },
  { q: "Welche Dynastie baute die Verbotene Stadt in Peking?", options: ["Ming", "Qing", "Han", "Tang"], answer: "Ming", difficulty: "schwer" },
  { q: "Welcher byzantinische Kaiser ließ die Hagia Sophia errichten?", options: ["Justinian I.", "Konstantin I.", "Basileios II.", "Heraclius"], answer: "Justinian I.", difficulty: "schwer" },
  { q: "In welchem Jahr wurde Konstantinopel von den Osmanen erobert?", options: ["1453", "1492", "1389", "1517"], answer: "1453", difficulty: "schwer" },
  { q: "Wer war der erste Zar von Russland?", options: ["Iwan IV.", "Peter der Große", "Boris Godunow", "Michael Romanow"], answer: "Iwan IV.", difficulty: "schwer", funFact: "Er ist als 'Iwan der Schreckliche' bekannt." },
  { q: "Welche Schlacht 1815 beendete die Herrschaft Napoleons endgültig?", options: ["Waterloo", "Austerlitz", "Leipzig", "Trafalgar"], answer: "Waterloo", difficulty: "schwer" },
  { q: "Welcher Kontinent wurde während des 'Wettlaufs' im 19. Jh. unter Europa aufgeteilt?", options: ["Afrika", "Asien", "Südamerika", "Australien"], answer: "Afrika", difficulty: "schwer", funFact: "Die Aufteilung wurde auf der Berliner Konferenz 1884/85 geregelt." },
  { q: "Welcher Herrscher ließ den Taj Mahal erbauen?", options: ["Shah Jahan", "Akbar", "Aurangzeb", "Babur"], answer: "Shah Jahan", difficulty: "schwer", funFact: "Er ließ ihn als Mausoleum für seine Frau errichten." },
  { q: "In welchem Jahr wurde die Französische Republik erstmals ausgerufen?", options: ["1792", "1789", "1799", "1804"], answer: "1792", difficulty: "schwer" },
  { q: "Welcher Pharao gilt als Begründer des Monotheismus im alten Ägypten?", options: ["Echnaton", "Tutanchamun", "Ramses II.", "Cheops"], answer: "Echnaton", difficulty: "schwer", funFact: "Er verehrte den Sonnengott Aton." },
  { q: "Welches Reich wurde 1806 von Napoleon aufgelöst?", options: ["Heiliges Römisches Reich", "Osmanisches Reich", "Habsburgerreich", "Preußen"], answer: "Heiliges Römisches Reich", difficulty: "schwer" },
  { q: "Welcher griechische Stadtstaat besiegte Persien bei Marathon?", options: ["Athen", "Sparta", "Theben", "Korinth"], answer: "Athen", difficulty: "schwer", funFact: "Der Marathonlauf erinnert an den Boten von dieser Schlacht." },
  { q: "Welcher Mongolenherrscher eroberte China und gründete die Yuan-Dynastie?", options: ["Kublai Khan", "Dschingis Khan", "Timur", "Ögedei"], answer: "Kublai Khan", difficulty: "schwer" },
  { q: "In welchem Jahr wurde die Magna Carta unterzeichnet?", options: ["1215", "1066", "1348", "1415"], answer: "1215", difficulty: "schwer", funFact: "Sie begrenzte erstmals die Macht des englischen Königs." },
  { q: "Welcher Feldherr besiegte 9 n. Chr. die Römer in der Varusschlacht?", options: ["Arminius", "Vercingetorix", "Spartacus", "Boudicca"], answer: "Arminius", difficulty: "schwer", funFact: "Die Schlacht fand im Teutoburger Wald statt." },
  { q: "Welche Epoche prägte Voltaire und Rousseau im 18. Jahrhundert?", options: ["Aufklärung", "Renaissance", "Barock", "Romantik"], answer: "Aufklärung", difficulty: "schwer" },
  { q: "Welcher osmanische Sultan eroberte 1453 Konstantinopel?", options: ["Mehmed II.", "Süleyman I.", "Selim I.", "Bayezid I."], answer: "Mehmed II.", difficulty: "schwer" },
  { q: "Welcher Krieg tobte 1337 bis 1453 zwischen England und Frankreich?", options: ["Hundertjähriger Krieg", "Rosenkrieg", "Dreißigjähriger Krieg", "Siebenjähriger Krieg"], answer: "Hundertjähriger Krieg", difficulty: "schwer" },
  { q: "Welche Zivilisation baute die Stadt Machu Picchu?", options: ["Inka", "Maya", "Azteken", "Olmeken"], answer: "Inka", difficulty: "schwer" },
  { q: "Wer war der letzte Kaiser von China?", options: ["Puyi", "Guangxu", "Kangxi", "Qianlong"], answer: "Puyi", difficulty: "schwer", funFact: "Er bestieg den Thron im Alter von zwei Jahren." },
  { q: "Welche Seemacht besiegte 1588 die spanische Armada?", options: ["England", "Frankreich", "Niederlande", "Portugal"], answer: "England", difficulty: "schwer" },
  { q: "Welcher Kanzler einte 1871 das Deutsche Reich?", options: ["Otto von Bismarck", "Wilhelm I.", "Helmut Kohl", "Friedrich Ebert"], answer: "Otto von Bismarck", difficulty: "schwer" },
  { q: "Welcher Vertrag teilte 1494 die Neue Welt zwischen Spanien und Portugal?", options: ["Vertrag von Tordesillas", "Vertrag von Utrecht", "Frieden von Augsburg", "Pariser Vertrag"], answer: "Vertrag von Tordesillas", difficulty: "schwer" },
  { q: "Welche Königin bestieg 1837 den britischen Thron?", options: ["Victoria", "Elisabeth I.", "Anne", "Maria I."], answer: "Victoria", difficulty: "schwer", funFact: "Sie regierte über 63 Jahre." },
  { q: "Welche Revolution stürzte 1917 den russischen Zaren?", options: ["Oktoberrevolution", "Französische Revolution", "Märzrevolution 1848", "Kulturrevolution"], answer: "Oktoberrevolution", difficulty: "schwer" },
  { q: "Welcher antike Gesetzgeber schuf einen der ältesten Gesetzeskodizes?", options: ["Hammurabi", "Solon", "Drakon", "Justinian"], answer: "Hammurabi", difficulty: "schwer", funFact: "Der Kodex Hammurabi ist fast 4.000 Jahre alt." },
  { q: "In welchem Jahr begann die Reformation mit Luthers Thesen?", options: ["1517", "1492", "1453", "1555"], answer: "1517", difficulty: "schwer" },
  { q: "Welches Volk plünderte 410 n. Chr. Rom?", options: ["Westgoten", "Vandalen", "Hunnen", "Franken"], answer: "Westgoten", difficulty: "schwer", funFact: "Ihr Anführer war Alarich I." },
  { q: "Welcher Pharao regierte am längsten und schloss den ersten Friedensvertrag?", options: ["Ramses II.", "Tutanchamun", "Cheops", "Echnaton"], answer: "Ramses II.", difficulty: "schwer" },
  { q: "Welche Familie beherrschte über Jahrhunderte das Heilige Römische Reich?", options: ["Habsburger", "Bourbonen", "Tudor", "Medici"], answer: "Habsburger", difficulty: "schwer" },
  { q: "Welche italienische Familie förderte in Florenz die Renaissance?", options: ["Medici", "Borgia", "Sforza", "Visconti"], answer: "Medici", difficulty: "schwer" },
  { q: "Welcher Krieg endete 1648 mit dem Westfälischen Frieden?", options: ["Dreißigjähriger Krieg", "Hundertjähriger Krieg", "Siebenjähriger Krieg", "Spanischer Erbfolgekrieg"], answer: "Dreißigjähriger Krieg", difficulty: "schwer" },
  { q: "Welcher Entdecker fand 1498 den Seeweg nach Indien?", options: ["Vasco da Gama", "Kolumbus", "Magellan", "Cabral"], answer: "Vasco da Gama", difficulty: "schwer" },
  { q: "Welche Schlacht 1066 brachte die Normannen an die Macht in England?", options: ["Schlacht bei Hastings", "Schlacht von Agincourt", "Schlacht bei Bouvines", "Schlacht von Tours"], answer: "Schlacht bei Hastings", difficulty: "schwer" },
  { q: "Welcher chinesische Kaiser ließ die erste Große Mauer verbinden?", options: ["Qin Shihuangdi", "Kublai Khan", "Wu Zetian", "Kangxi"], answer: "Qin Shihuangdi", difficulty: "schwer", funFact: "Er war auch der erste Kaiser eines geeinten China." },
  { q: "Welche Stadt war Zentrum des antiken Maya-Reichs?", options: ["Tikal", "Cusco", "Tenochtitlan", "Teotihuacan"], answer: "Tikal", difficulty: "schwer" },
  { q: "Welcher russische Zar modernisierte das Land und gründete St. Petersburg?", options: ["Peter der Große", "Iwan IV.", "Nikolaus II.", "Alexander I."], answer: "Peter der Große", difficulty: "schwer" },
  { q: "Welcher Aztekenherrscher empfing 1519 die Spanier?", options: ["Moctezuma II.", "Cuauhtémoc", "Atahualpa", "Tizoc"], answer: "Moctezuma II.", difficulty: "schwer" },
  { q: "Welcher Krieg 1756–1763 gilt als erster 'Weltkrieg' der Geschichte?", options: ["Siebenjähriger Krieg", "Dreißigjähriger Krieg", "Spanischer Erbfolgekrieg", "Napoleonische Kriege"], answer: "Siebenjähriger Krieg", difficulty: "schwer" },
  { q: "Welches Reich beherrschte vor den Spaniern weite Teile der Anden?", options: ["Inka", "Maya", "Azteken", "Chavín"], answer: "Inka", difficulty: "schwer" },
  { q: "Welcher englische Naturforscher segelte auf der HMS Beagle?", options: ["Charles Darwin", "Isaac Newton", "Alfred Wallace", "Joseph Banks"], answer: "Charles Darwin", difficulty: "schwer" },
  { q: "Welche Hauptstadt hatte das Aztekenreich?", options: ["Tenochtitlan", "Cusco", "Tikal", "Palenque"], answer: "Tenochtitlan", difficulty: "schwer", funFact: "Auf ihren Ruinen steht heute Mexiko-Stadt." },
  { q: "Welcher Pakt verband 1939 Hitler und Stalin kurzzeitig?", options: ["Hitler-Stalin-Pakt", "Münchner Abkommen", "Warschauer Pakt", "Atlantik-Charta"], answer: "Hitler-Stalin-Pakt", difficulty: "schwer" },
  { q: "Welcher Herrscher gab dem Byzantinischen Reich seinen umfassenden Gesetzeskodex?", options: ["Justinian I.", "Konstantin", "Theodosius", "Diokletian"], answer: "Justinian I.", difficulty: "schwer" },
  { q: "Welche Schlacht stoppte 732 die arabische Expansion in Westeuropa?", options: ["Schlacht von Tours", "Schlacht bei Hastings", "Schlacht von Lepanto", "Schlacht im Teutoburger Wald"], answer: "Schlacht von Tours", difficulty: "schwer" },
],
  sport: [
  // ── EINFACH ──
  { q: "Wie viele Ringe hat das olympische Symbol?", options: ["5", "4", "6", "7"], answer: "5", difficulty: "einfach", funFact: "Sie stehen für die fünf bewohnten Kontinente." },
  { q: "Wie lang ist ein Marathon (gerundet)?", options: ["42 km", "38 km", "45 km", "50 km"], answer: "42 km", difficulty: "einfach", funFact: "Die genaue Distanz beträgt 42,195 km." },
  { q: "In welchem Land wurde Judo erfunden?", options: ["Japan", "China", "Korea", "Mongolei"], answer: "Japan", difficulty: "einfach" },
  { q: "Welcher Sport wird in Wimbledon gespielt?", options: ["Tennis", "Cricket", "Golf", "Rugby"], answer: "Tennis", difficulty: "einfach", funFact: "Wimbledon ist das älteste Tennisturnier der Welt." },
  { q: "Wie viele Löcher hat ein klassischer Golfplatz?", options: ["18", "9", "24", "12"], answer: "18", difficulty: "einfach" },
  { q: "Welches Land hat die meisten Fußball-Weltmeistertitel?", options: ["Brasilien", "Deutschland", "Italien", "Argentinien"], answer: "Brasilien", difficulty: "einfach", funFact: "Brasilien gewann den Titel fünfmal." },
  { q: "Wie viele Spieler einer Fußballmannschaft stehen auf dem Feld?", options: ["11", "9", "10", "12"], answer: "11", difficulty: "einfach" },
  { q: "Welcher Sport nutzt einen 'Puck'?", options: ["Eishockey", "Basketball", "Baseball", "Rugby"], answer: "Eishockey", difficulty: "einfach", funFact: "Ein Puck kann über 160 km/h schnell werden." },
  { q: "In welcher Sportart gibt es einen 'Slam Dunk'?", options: ["Basketball", "Volleyball", "Handball", "Tennis"], answer: "Basketball", difficulty: "einfach" },
  { q: "Wie heißt der wichtigste Radsport-Wettbewerb Frankreichs?", options: ["Tour de France", "Giro d'Italia", "Vuelta", "Paris-Roubaix"], answer: "Tour de France", difficulty: "einfach", funFact: "Der Führende trägt das gelbe Trikot." },
  { q: "Welche Sportart kombiniert Langlauf und Schießen?", options: ["Biathlon", "Triathlon", "Pentathlon", "Skispringen"], answer: "Biathlon", difficulty: "einfach" },
  { q: "Wie viele Punkte zählt ein Touchdown im American Football?", options: ["6", "7", "3", "5"], answer: "6", difficulty: "einfach" },
  { q: "In welchem Land wurden die antiken Olympischen Spiele erfunden?", options: ["Griechenland", "Italien", "Ägypten", "Türkei"], answer: "Griechenland", difficulty: "einfach" },
  { q: "Welcher Sport wird mit Schläger und Federball gespielt?", options: ["Badminton", "Squash", "Tischtennis", "Tennis"], answer: "Badminton", difficulty: "einfach" },
  { q: "Wie viele Spieler hat eine Volleyball-Mannschaft auf dem Feld?", options: ["6", "5", "7", "8"], answer: "6", difficulty: "einfach", funFact: "Beim Beachvolleyball sind es nur zwei pro Team." },

  // ── MITTEL ──
  { q: "Welches Land gewann die erste Fußball-WM 1930?", options: ["Uruguay", "Brasilien", "Argentinien", "Italien"], answer: "Uruguay", difficulty: "mittel", funFact: "Uruguay war auch Gastgeber." },
  { q: "Wie viele Felder hat ein Schachbrett?", options: ["64", "100", "81", "72"], answer: "64", difficulty: "mittel" },
  { q: "In welcher Sportart wird der Begriff 'Hattrick' ursprünglich verwendet?", options: ["Cricket", "Fußball", "Eishockey", "Tennis"], answer: "Cricket", difficulty: "mittel", funFact: "Für drei Treffer in Folge gab es früher einen Hut." },
  { q: "Welcher Boxer nannte sich selbst 'The Greatest'?", options: ["Muhammad Ali", "Mike Tyson", "Joe Frazier", "George Foreman"], answer: "Muhammad Ali", difficulty: "mittel" },
  { q: "Über welche Distanz läuft ein 'Steeplechase'-Hindernislauf?", options: ["3000 m", "1500 m", "5000 m", "800 m"], answer: "3000 m", difficulty: "mittel", funFact: "Dabei gibt es auch einen Wassergraben." },
  { q: "Welcher Schlag ist im Tennis ein direkter Punkt beim Aufschlag?", options: ["Ass", "Volley", "Lob", "Slice"], answer: "Ass", difficulty: "mittel" },
  { q: "Wie viele Runden hat ein WM-Boxkampf maximal?", options: ["12", "10", "15", "8"], answer: "12", difficulty: "mittel" },
  { q: "In welcher Sportart gibt es 'Birdie' und 'Bogey'?", options: ["Golf", "Tennis", "Badminton", "Cricket"], answer: "Golf", difficulty: "mittel" },
  { q: "Auf welchem Untergrund werden die French Open gespielt?", options: ["Sand", "Rasen", "Hartplatz", "Teppich"], answer: "Sand", difficulty: "mittel" },
  { q: "Welcher Sportler hält viele Rekorde im Schwimmen und gewann 23 olympische Goldmedaillen?", options: ["Michael Phelps", "Ian Thorpe", "Mark Spitz", "Caeleb Dressel"], answer: "Michael Phelps", difficulty: "mittel" },
  { q: "Wie nennt man im Basketball einen Wurf, der drei Punkte zählt?", options: ["Dreier", "Dunk", "Free Throw", "Layup"], answer: "Dreier", difficulty: "mittel" },
  { q: "Welcher Verein gewann die erste Fußball-Champions-League 1993?", options: ["Olympique Marseille", "AC Mailand", "FC Barcelona", "Real Madrid"], answer: "Olympique Marseille", difficulty: "mittel" },
  { q: "In welcher Stadt fanden 1936 die Olympischen Sommerspiele statt?", options: ["Berlin", "London", "Paris", "Amsterdam"], answer: "Berlin", difficulty: "mittel" },
  { q: "Welcher Sport gehört zum 'Triathlon' nicht?", options: ["Rudern", "Schwimmen", "Radfahren", "Laufen"], answer: "Rudern", difficulty: "mittel" },
  { q: "Wie heißt der wichtigste US-Football-Endspieltag?", options: ["Super Bowl", "World Series", "Stanley Cup", "Final Four"], answer: "Super Bowl", difficulty: "mittel" },
  { q: "Welcher Tennisspieler gewann die meisten Grand-Slam-Titel der Herren?", options: ["Novak Djokovic", "Roger Federer", "Rafael Nadal", "Pete Sampras"], answer: "Novak Djokovic", difficulty: "mittel" },
  { q: "Welches Team trägt im Radsport das gepunktete Trikot?", options: ["Bester Bergfahrer", "Sprintkönig", "Gesamtführender", "Bester Jungprofi"], answer: "Bester Bergfahrer", difficulty: "mittel" },
  { q: "Welche Sportart wird auf einem Oval mit Pferden ausgetragen?", options: ["Pferderennen", "Polo", "Dressur", "Springreiten"], answer: "Pferderennen", difficulty: "mittel" },
  { q: "Welcher deutsche Rennfahrer gewann sieben Formel-1-Titel?", options: ["Michael Schumacher", "Sebastian Vettel", "Nico Rosberg", "Ralf Schumacher"], answer: "Michael Schumacher", difficulty: "mittel" },
  { q: "Wie viele Spieler stehen bei einer Basketball-Mannschaft auf dem Feld?", options: ["5", "6", "7", "4"], answer: "5", difficulty: "mittel" },
  { q: "Welche Nation dominiert traditionell das Cricket?", options: ["Indien", "Brasilien", "Deutschland", "Russland"], answer: "Indien", difficulty: "mittel" },
  { q: "Welcher Lauf ist die kürzeste Sprintdistanz bei Olympia?", options: ["100 m", "200 m", "400 m", "60 m"], answer: "100 m", difficulty: "mittel" },
  { q: "In welcher Sportart ist Tony Hawk eine Legende?", options: ["Skateboarding", "Surfen", "BMX", "Snowboard"], answer: "Skateboarding", difficulty: "mittel" },
  { q: "Welcher Fußballspieler wird 'der Floh' genannt?", options: ["Lionel Messi", "Diego Maradona", "Andrés Iniesta", "Sergio Agüero"], answer: "Lionel Messi", difficulty: "mittel" },
  { q: "Wie heißt der Wettkampf aus zehn leichtathletischen Disziplinen?", options: ["Zehnkampf", "Fünfkampf", "Siebenkampf", "Triathlon"], answer: "Zehnkampf", difficulty: "mittel" },
  { q: "Welche Stadt richtete 2016 die Sommerspiele aus?", options: ["Rio de Janeiro", "London", "Tokio", "Peking"], answer: "Rio de Janeiro", difficulty: "mittel" },
  { q: "Welcher Schwimmstil ist der schnellste?", options: ["Kraul", "Brust", "Rücken", "Schmetterling"], answer: "Kraul", difficulty: "mittel" },
  { q: "Welcher Verein wird in Spanien 'die Königlichen' genannt?", options: ["Real Madrid", "FC Barcelona", "Atlético Madrid", "FC Sevilla"], answer: "Real Madrid", difficulty: "mittel" },
  { q: "Welche Sportart wird mit einem ovalen Ball und 'Tries' gespielt?", options: ["Rugby", "American Football", "Hurling", "Lacrosse"], answer: "Rugby", difficulty: "mittel" },
  { q: "Wie viele Sätze muss ein Tennisspieler bei Grand Slams (Herren) gewinnen?", options: ["3", "2", "4", "5"], answer: "3", difficulty: "mittel", funFact: "Es wird im Best-of-Five gespielt." },
  { q: "Welcher Marathonläufer durchbrach inoffiziell die Zwei-Stunden-Marke?", options: ["Eliud Kipchoge", "Haile Gebrselassie", "Kenenisa Bekele", "Mo Farah"], answer: "Eliud Kipchoge", difficulty: "mittel" },
  { q: "In welchem Sport gibt es einen 'Hole in One'?", options: ["Golf", "Tennis", "Billard", "Bowling"], answer: "Golf", difficulty: "mittel" },
  { q: "Welcher Verein gewann die meisten Champions-League-Titel?", options: ["Real Madrid", "AC Mailand", "FC Bayern", "FC Liverpool"], answer: "Real Madrid", difficulty: "mittel" },
  { q: "Welche Sportart wird im Wasser mit einem Ball und Toren gespielt?", options: ["Wasserball", "Rudern", "Synchronschwimmen", "Tauchen"], answer: "Wasserball", difficulty: "mittel" },

  // ── SCHWER ──
  { q: "Welcher Boxer gewann den legendären 'Rumble in the Jungle' 1974?", options: ["Muhammad Ali", "George Foreman", "Joe Frazier", "Ken Norton"], answer: "Muhammad Ali", difficulty: "schwer", funFact: "Der Kampf fand in Kinshasa, Zaire, statt." },
  { q: "Wie heißt der höchste Wurf beim Bowling (alle Strikes)?", options: ["Perfektes Spiel", "Royal Strike", "Grand Slam", "Triple Crown"], answer: "Perfektes Spiel", difficulty: "schwer", funFact: "Es ergibt genau 300 Punkte." },
  { q: "Welcher Leichtathlet hält den Weltrekord über 100 Meter?", options: ["Usain Bolt", "Tyson Gay", "Yohan Blake", "Asafa Powell"], answer: "Usain Bolt", difficulty: "schwer", funFact: "Sein Rekord liegt bei 9,58 Sekunden." },
  { q: "In welchem Jahr fand die erste moderne Olympiade statt?", options: ["1896", "1900", "1888", "1912"], answer: "1896", difficulty: "schwer", funFact: "Sie fanden in Athen statt." },
  { q: "Welcher Rennstall gewann die meisten Formel-1-Konstrukteurstitel?", options: ["Ferrari", "Mercedes", "McLaren", "Williams"], answer: "Ferrari", difficulty: "schwer" },
  { q: "Welche Nation gewann die erste Rugby-Weltmeisterschaft 1987?", options: ["Neuseeland", "Australien", "Südafrika", "England"], answer: "Neuseeland", difficulty: "schwer" },
  { q: "Wie viele Grand-Slam-Turniere gibt es im Tennis pro Jahr?", options: ["4", "3", "5", "6"], answer: "4", difficulty: "schwer", funFact: "Australian Open, French Open, Wimbledon und US Open." },
  { q: "Welcher Schachweltmeister verlor 1997 gegen den Computer Deep Blue?", options: ["Garri Kasparow", "Anatoli Karpow", "Magnus Carlsen", "Bobby Fischer"], answer: "Garri Kasparow", difficulty: "schwer" },
  { q: "Welcher Fußballer erzielte das 'Hand-Gottes'-Tor 1986?", options: ["Diego Maradona", "Pelé", "Lionel Messi", "Zinédine Zidane"], answer: "Diego Maradona", difficulty: "schwer" },
  { q: "In welcher Disziplin wurde Carl Lewis mehrfach Olympiasieger?", options: ["Weitsprung", "Hochsprung", "Speerwurf", "Hürdenlauf"], answer: "Weitsprung", difficulty: "schwer" },
  { q: "Welches Land gewann die Fußball-WM 2010 in Südafrika?", options: ["Spanien", "Niederlande", "Deutschland", "Brasilien"], answer: "Spanien", difficulty: "schwer" },
  { q: "Welcher Radprofi gewann die Tour de France fünfmal in Folge (1991–1995)?", options: ["Miguel Indurain", "Eddy Merckx", "Bernard Hinault", "Lance Armstrong"], answer: "Miguel Indurain", difficulty: "schwer" },
  { q: "Welche Sportlerin gewann 22 Grand-Slam-Einzeltitel im Tennis?", options: ["Steffi Graf", "Serena Williams", "Martina Navratilova", "Chris Evert"], answer: "Steffi Graf", difficulty: "schwer", funFact: "1988 gelang ihr der 'Golden Slam'." },
  { q: "Welcher Verein gewann das erste Triple aus Liga, Pokal und Landesmeisterpokal 1967?", options: ["Celtic Glasgow", "Manchester United", "Ajax Amsterdam", "Inter Mailand"], answer: "Celtic Glasgow", difficulty: "schwer" },
  { q: "Welches Land gewann die meisten Eishockey-Weltmeisterschaften?", options: ["Russland/UdSSR", "Kanada", "Schweden", "Tschechien"], answer: "Russland/UdSSR", difficulty: "schwer" },
  { q: "Wie heißt das berühmte Radrennen durch Nordfrankreich mit Kopfsteinpflaster?", options: ["Paris–Roubaix", "Mailand–Sanremo", "Lüttich–Bastogne", "Flandern-Rundfahrt"], answer: "Paris–Roubaix", difficulty: "schwer", funFact: "Es wird auch 'Hölle des Nordens' genannt." },
  { q: "Welche Turnerin erhielt 1976 als Erste die perfekte Wertung 10,0?", options: ["Nadia Comăneci", "Olga Korbut", "Simone Biles", "Vera Čáslavská"], answer: "Nadia Comăneci", difficulty: "schwer" },
  { q: "Welcher Basketballer wird 'His Airness' genannt?", options: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Magic Johnson"], answer: "Michael Jordan", difficulty: "schwer" },
  { q: "Welche Nation gewann die Fußball-WM 1954 überraschend?", options: ["Deutschland", "Ungarn", "Brasilien", "Uruguay"], answer: "Deutschland", difficulty: "schwer", funFact: "Es ist als 'Wunder von Bern' bekannt." },
  { q: "Wie viele Spieler hat eine Cricket-Mannschaft?", options: ["11", "9", "13", "15"], answer: "11", difficulty: "schwer" },
  { q: "Welcher Skirennläufer gewann in einer Saison 13 Weltcuprennen (Rekord lange Zeit)?", options: ["Ingemar Stenmark", "Marcel Hirscher", "Hermann Maier", "Alberto Tomba"], answer: "Ingemar Stenmark", difficulty: "schwer" },
  { q: "Welche Mannschaft gewann das erste Super-Bowl-Spiel 1967?", options: ["Green Bay Packers", "Kansas City Chiefs", "New York Jets", "Miami Dolphins"], answer: "Green Bay Packers", difficulty: "schwer" },
  { q: "Welcher Sport hat Disziplinen wie 'Florett', 'Degen' und 'Säbel'?", options: ["Fechten", "Bogenschießen", "Reiten", "Schießen"], answer: "Fechten", difficulty: "schwer" },
  { q: "Welcher Tennisspieler gewann als Erster den 'Golden Slam' (1969 noch ohne Olympia)?", options: ["Rod Laver", "Björn Borg", "John McEnroe", "Jimmy Connors"], answer: "Rod Laver", difficulty: "schwer", funFact: "Laver gewann 1969 alle vier Grand Slams in einem Jahr." },
  { q: "Welche Stadt war 1972 Schauplatz tragischer Olympischer Spiele?", options: ["München", "Montreal", "Moskau", "Mexiko-Stadt"], answer: "München", difficulty: "schwer" },
  { q: "Welcher Boxer blieb in seiner Profikarriere ungeschlagen (49 Siege)?", options: ["Rocky Marciano", "Muhammad Ali", "Joe Louis", "Sugar Ray Robinson"], answer: "Rocky Marciano", difficulty: "schwer" },
  { q: "Welcher Fußballverein wird 'die Alte Dame' genannt?", options: ["Juventus Turin", "AC Mailand", "Inter Mailand", "AS Rom"], answer: "Juventus Turin", difficulty: "schwer" },
  { q: "Welche Distanz hat ein olympischer Schwimm-Pool?", options: ["50 m", "25 m", "100 m", "33 m"], answer: "50 m", difficulty: "schwer" },
  { q: "Welcher Formel-1-Pilot gewann den ersten Weltmeistertitel 1950?", options: ["Giuseppe Farina", "Juan Manuel Fangio", "Alberto Ascari", "Stirling Moss"], answer: "Giuseppe Farina", difficulty: "schwer" },
  { q: "Welcher US-Sport vergibt die 'World Series'?", options: ["Baseball", "Basketball", "American Football", "Eishockey"], answer: "Baseball", difficulty: "schwer" },
  { q: "Welche Nation erfand den modernen Sport Curling?", options: ["Schottland", "Kanada", "Schweden", "Norwegen"], answer: "Schottland", difficulty: "schwer" },
  { q: "Welcher Leichtathlet gewann 1936 in Berlin vier Goldmedaillen?", options: ["Jesse Owens", "Carl Lewis", "Usain Bolt", "Paavo Nurmi"], answer: "Jesse Owens", difficulty: "schwer" },
  { q: "Welcher Verein gewann 2012 erstmals und dramatisch die englische Meisterschaft in der Nachspielzeit?", options: ["Manchester City", "Manchester United", "FC Chelsea", "FC Arsenal"], answer: "Manchester City", difficulty: "schwer" },
  { q: "Welche Sportart wird bei den 'Six Nations' gespielt?", options: ["Rugby", "Fußball", "Cricket", "Hockey"], answer: "Rugby", difficulty: "schwer" },
  { q: "Welcher Schwimmer gewann 1972 sieben Goldmedaillen bei einem Spiel?", options: ["Mark Spitz", "Michael Phelps", "Matt Biondi", "Ian Thorpe"], answer: "Mark Spitz", difficulty: "schwer" },
  { q: "Welcher Fußballtrainer gewann die Champions League mit Porto und Inter?", options: ["José Mourinho", "Pep Guardiola", "Carlo Ancelotti", "Jürgen Klopp"], answer: "José Mourinho", difficulty: "schwer" },
  { q: "Welche Nation gewann das olympische Eishockey-'Miracle on Ice' 1980?", options: ["USA", "Sowjetunion", "Kanada", "Tschechoslowakei"], answer: "USA", difficulty: "schwer" },
  { q: "Welcher Tennisplatz ist der einzige Grand Slam auf Rasen?", options: ["Wimbledon", "US Open", "French Open", "Australian Open"], answer: "Wimbledon", difficulty: "schwer" },
  { q: "Welcher Boxer wurde dreimal Weltmeister im Schwergewicht?", options: ["Muhammad Ali", "Mike Tyson", "Lennox Lewis", "Evander Holyfield"], answer: "Muhammad Ali", difficulty: "schwer" },
  { q: "Wie heißt der wichtigste Marathonlauf der USA?", options: ["Boston-Marathon", "Chicago-Marathon", "New-York-Marathon", "LA-Marathon"], answer: "Boston-Marathon", difficulty: "schwer", funFact: "Er ist der älteste jährliche Marathon der Welt." },
  { q: "Welcher Springreiter-Wettbewerb ist Teil der Vielseitigkeit?", options: ["Dressur", "Galopprennen", "Polo", "Voltigieren"], answer: "Dressur", difficulty: "schwer" },
  { q: "Welche Nation gewann die meisten olympischen Goldmedaillen insgesamt?", options: ["USA", "Sowjetunion", "China", "Deutschland"], answer: "USA", difficulty: "schwer" },
  { q: "Welcher Spieler hält den NBA-Rekord für die meisten Punkte in einem Spiel (100)?", options: ["Wilt Chamberlain", "Kobe Bryant", "Michael Jordan", "LeBron James"], answer: "Wilt Chamberlain", difficulty: "schwer" },
  { q: "Welcher Verein gewann das deutsche 'Finale dahoam' 2012 nicht?", options: ["FC Bayern", "FC Chelsea", "Borussia Dortmund", "Real Madrid"], answer: "FC Bayern", difficulty: "schwer", funFact: "Bayern verlor das Heimfinale im Elfmeterschießen." },
],
  film_musik: [
  // ── EINFACH ──
  { q: "Welche Band sang 'Bohemian Rhapsody'?", options: ["Queen", "The Beatles", "Rolling Stones", "Led Zeppelin"], answer: "Queen", difficulty: "einfach", funFact: "Das Lied hat keinen klassischen Refrain." },
  { q: "Wer komponierte die 9. Sinfonie mit der 'Ode an die Freude'?", options: ["Beethoven", "Mozart", "Bach", "Brahms"], answer: "Beethoven", difficulty: "einfach", funFact: "Er war fast taub, als er sie schrieb." },
  { q: "In welchem Film sagt man 'Möge die Macht mit dir sein'?", options: ["Star Wars", "Star Trek", "Avatar", "Dune"], answer: "Star Wars", difficulty: "einfach" },
  { q: "Wie heißt der Löwe in 'Der König der Löwen'?", options: ["Simba", "Mufasa", "Scar", "Nala"], answer: "Simba", difficulty: "einfach", funFact: "'Simba' heißt auf Suaheli 'Löwe'." },
  { q: "Welcher Sänger wurde 'King of Pop' genannt?", options: ["Michael Jackson", "Elvis Presley", "Prince", "Freddie Mercury"], answer: "Michael Jackson", difficulty: "einfach" },
  { q: "Welche Filmreihe handelt von einem Ring, der vernichtet werden muss?", options: ["Der Herr der Ringe", "Harry Potter", "Die Tribute von Panem", "Narnia"], answer: "Der Herr der Ringe", difficulty: "einfach", funFact: "Die Trilogie wurde in Neuseeland gedreht." },
  { q: "Welcher Regisseur schuf 'Jurassic Park' und 'E.T.'?", options: ["Steven Spielberg", "George Lucas", "James Cameron", "Ridley Scott"], answer: "Steven Spielberg", difficulty: "einfach" },
  { q: "Welches Instrument hat schwarze und weiße Tasten?", options: ["Klavier", "Gitarre", "Trompete", "Geige"], answer: "Klavier", difficulty: "einfach" },
  { q: "Welcher Film spielt auf dem Planeten Pandora?", options: ["Avatar", "Star Wars", "Interstellar", "Guardians of the Galaxy"], answer: "Avatar", difficulty: "einfach" },
  { q: "Welcher Animationsfilm hat eine Eiskönigin namens Elsa?", options: ["Die Eiskönigin", "Vaiana", "Rapunzel", "Encanto"], answer: "Die Eiskönigin", difficulty: "einfach" },
  { q: "Welches Blasinstrument ist typisch für Jazz?", options: ["Saxophon", "Querflöte", "Oboe", "Fagott"], answer: "Saxophon", difficulty: "einfach" },
  { q: "Wie viele Saiten hat eine Standard-Gitarre?", options: ["6", "4", "8", "5"], answer: "6", difficulty: "einfach" },
  { q: "Welcher Schauspieler spielt in vielen 'Rocky'-Filmen die Hauptrolle?", options: ["Sylvester Stallone", "Arnold Schwarzenegger", "Bruce Willis", "Jean-Claude Van Damme"], answer: "Sylvester Stallone", difficulty: "einfach" },
  { q: "Welches Musikgenre stammt ursprünglich aus Jamaika?", options: ["Reggae", "Calypso", "Blues", "Ska"], answer: "Reggae", difficulty: "einfach", funFact: "Bob Marley machte es weltberühmt." },
  { q: "Welcher Film handelt von einem Zauberlehrling namens Harry?", options: ["Harry Potter", "Narnia", "Percy Jackson", "Eragon"], answer: "Harry Potter", difficulty: "einfach" },

  // ── MITTEL ──
  { q: "Wer führte Regie bei 'Inception' und 'Interstellar'?", options: ["Christopher Nolan", "Steven Spielberg", "Denis Villeneuve", "Ridley Scott"], answer: "Christopher Nolan", difficulty: "mittel", funFact: "Nolan dreht bewusst ohne Handy." },
  { q: "Welche Oper komponierte Mozart?", options: ["Die Zauberflöte", "Carmen", "Aida", "Rigoletto"], answer: "Die Zauberflöte", difficulty: "mittel" },
  { q: "Welcher Film war der erste abendfüllende Zeichentrickfilm von Disney?", options: ["Schneewittchen", "Bambi", "Pinocchio", "Fantasia"], answer: "Schneewittchen", difficulty: "mittel", funFact: "Er erschien 1937." },
  { q: "Welches Tempo bezeichnet 'Allegro' in der Musik?", options: ["Schnell", "Langsam", "Mäßig", "Sehr langsam"], answer: "Schnell", difficulty: "mittel", funFact: "'Allegro' heißt auf Italienisch 'fröhlich'." },
  { q: "Wer komponierte die Filmmusik zu 'Star Wars'?", options: ["John Williams", "Hans Zimmer", "Ennio Morricone", "Danny Elfman"], answer: "John Williams", difficulty: "mittel" },
  { q: "Welcher Regisseur drehte 'Pulp Fiction'?", options: ["Quentin Tarantino", "Martin Scorsese", "Coen-Brüder", "David Lynch"], answer: "Quentin Tarantino", difficulty: "mittel" },
  { q: "Aus welchem Land stammt die Musikrichtung Fado?", options: ["Portugal", "Spanien", "Italien", "Griechenland"], answer: "Portugal", difficulty: "mittel", funFact: "Fado gehört zum UNESCO-Weltkulturerbe." },
  { q: "Welche vier Musiker bildeten 'The Beatles'?", options: ["Lennon, McCartney, Harrison, Starr", "Jagger, Richards, Watts, Wood", "Mercury, May, Taylor, Deacon", "Plant, Page, Jones, Bonham"], answer: "Lennon, McCartney, Harrison, Starr", difficulty: "mittel", funFact: "Sie stammen aus Liverpool." },
  { q: "Welcher Komponist schrieb 'Die kleine Nachtmusik'?", options: ["Mozart", "Beethoven", "Bach", "Haydn"], answer: "Mozart", difficulty: "mittel" },
  { q: "Welche Tonart hat keine Vorzeichen?", options: ["C-Dur", "G-Dur", "F-Dur", "D-Dur"], answer: "C-Dur", difficulty: "mittel", funFact: "C-Dur nutzt nur die weißen Tasten." },
  { q: "Wer komponierte die Oper 'Carmen'?", options: ["Georges Bizet", "Giuseppe Verdi", "Richard Wagner", "Puccini"], answer: "Georges Bizet", difficulty: "mittel" },
  { q: "Welcher Film gewann 1998 den Oscar als bester Film mit Schiffsuntergang?", options: ["Titanic", "Gladiator", "Braveheart", "Forrest Gump"], answer: "Titanic", difficulty: "mittel" },
  { q: "Welche Sängerin wird 'Queen of Pop' genannt?", options: ["Madonna", "Whitney Houston", "Beyoncé", "Cher"], answer: "Madonna", difficulty: "mittel" },
  { q: "Welcher Komponist wurde trotz Taubheit weltberühmt?", options: ["Beethoven", "Mozart", "Schubert", "Chopin"], answer: "Beethoven", difficulty: "mittel" },
  { q: "Wer führte Regie bei 'Titanic' und 'Avatar'?", options: ["James Cameron", "Steven Spielberg", "Peter Jackson", "Ridley Scott"], answer: "James Cameron", difficulty: "mittel" },
  { q: "Welche Band veröffentlichte das Album 'The Dark Side of the Moon'?", options: ["Pink Floyd", "Led Zeppelin", "The Who", "Deep Purple"], answer: "Pink Floyd", difficulty: "mittel", funFact: "Es zählt zu den meistverkauften Alben aller Zeiten." },
  { q: "Welches Instrument spielt typischerweise die Melodie in einem Streichquartett?", options: ["Erste Violine", "Cello", "Bratsche", "Kontrabass"], answer: "Erste Violine", difficulty: "mittel" },
  { q: "Welcher Schauspieler verkörperte James Bond am längsten?", options: ["Roger Moore", "Sean Connery", "Daniel Craig", "Pierce Brosnan"], answer: "Roger Moore", difficulty: "mittel" },
  { q: "Welches Genre spielt John Coltrane?", options: ["Jazz", "Klassik", "Rock", "Pop"], answer: "Jazz", difficulty: "mittel" },
  { q: "Welcher Film beginnt mit den Worten 'Es war einmal in einer weit, weit entfernten Galaxis'?", options: ["Star Wars", "Star Trek", "Guardians of the Galaxy", "Dune"], answer: "Star Wars", difficulty: "mittel" },
  { q: "Welcher Sänger sang 'Imagine'?", options: ["John Lennon", "Paul McCartney", "Bob Dylan", "Elton John"], answer: "John Lennon", difficulty: "mittel" },
  { q: "Welcher Regisseur ist für 'Vertigo' und 'Psycho' bekannt?", options: ["Alfred Hitchcock", "Stanley Kubrick", "Orson Welles", "Billy Wilder"], answer: "Alfred Hitchcock", difficulty: "mittel", funFact: "Er gilt als 'Master of Suspense'." },
  { q: "Welche Note dauert halb so lang wie eine Viertelnote?", options: ["Achtelnote", "Halbe Note", "Ganze Note", "Sechzehntelnote"], answer: "Achtelnote", difficulty: "mittel" },
  { q: "Welcher Animationsfilm spielt in einer Spielzeugwelt?", options: ["Toy Story", "Findet Nemo", "Cars", "Ratatouille"], answer: "Toy Story", difficulty: "mittel", funFact: "Es war 1995 der erste vollständig computeranimierte Kinofilm." },
  { q: "Welche Sängerin sang 'I Will Always Love You' im Film 'Bodyguard'?", options: ["Whitney Houston", "Mariah Carey", "Celine Dion", "Tina Turner"], answer: "Whitney Houston", difficulty: "mittel" },
  { q: "Welcher Komponist schrieb die 'Vier Jahreszeiten'?", options: ["Vivaldi", "Bach", "Händel", "Telemann"], answer: "Vivaldi", difficulty: "mittel" },
  { q: "Welcher Film gewann 2020 als erster nicht-englischsprachiger den Oscar als bester Film?", options: ["Parasite", "Roma", "Amour", "Das Leben der Anderen"], answer: "Parasite", difficulty: "mittel" },
  { q: "Welche Rockband wird von Mick Jagger angeführt?", options: ["The Rolling Stones", "The Who", "Led Zeppelin", "AC/DC"], answer: "The Rolling Stones", difficulty: "mittel" },
  { q: "Welches Musical handelt von einem Phantom in einer Oper?", options: ["Das Phantom der Oper", "Cats", "Les Misérables", "Evita"], answer: "Das Phantom der Oper", difficulty: "mittel" },
  { q: "Welcher Schauspieler spielte den Joker in 'The Dark Knight'?", options: ["Heath Ledger", "Joaquin Phoenix", "Jack Nicholson", "Jared Leto"], answer: "Heath Ledger", difficulty: "mittel", funFact: "Er erhielt posthum einen Oscar." },
  { q: "Welches Instrument hat 88 Tasten?", options: ["Klavier", "Cembalo", "Akkordeon", "Orgel"], answer: "Klavier", difficulty: "mittel" },
  { q: "Welcher Regisseur drehte 'Schindlers Liste'?", options: ["Steven Spielberg", "Roman Polanski", "Martin Scorsese", "Francis Ford Coppola"], answer: "Steven Spielberg", difficulty: "mittel" },
  { q: "Welche Sängerin ist für den Hit 'Rolling in the Deep' bekannt?", options: ["Adele", "Amy Winehouse", "Sia", "Lady Gaga"], answer: "Adele", difficulty: "mittel" },
  { q: "Welche Filmmusik komponierte Ennio Morricone berühmt?", options: ["Spiel mir das Lied vom Tod", "Der Pate", "Rocky", "Psycho"], answer: "Spiel mir das Lied vom Tod", difficulty: "mittel" },

  // ── SCHWER ──
  { q: "Welcher Regisseur drehte '2001: Odyssee im Weltraum'?", options: ["Stanley Kubrick", "Steven Spielberg", "Ridley Scott", "George Lucas"], answer: "Stanley Kubrick", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb die Oper 'Der Ring des Nibelungen'?", options: ["Richard Wagner", "Giuseppe Verdi", "Richard Strauss", "Gustav Mahler"], answer: "Richard Wagner", difficulty: "schwer", funFact: "Der Zyklus dauert insgesamt rund 15 Stunden." },
  { q: "Welcher Film gewann die meisten Oscars (11, geteilter Rekord)?", options: ["Ben Hur", "Forrest Gump", "Gladiator", "Avatar"], answer: "Ben Hur", difficulty: "schwer", funFact: "Auch 'Titanic' und 'Herr der Ringe 3' gewannen elf." },
  { q: "Welcher Jazzmusiker prägte mit 'Kind of Blue' den Modal Jazz?", options: ["Miles Davis", "Louis Armstrong", "Duke Ellington", "Charlie Parker"], answer: "Miles Davis", difficulty: "schwer" },
  { q: "Welcher italienische Regisseur drehte 'La Dolce Vita'?", options: ["Federico Fellini", "Sergio Leone", "Vittorio De Sica", "Michelangelo Antonioni"], answer: "Federico Fellini", difficulty: "schwer" },
  { q: "Welche Sopranistin gilt als eine der größten Operndiven des 20. Jahrhunderts?", options: ["Maria Callas", "Renée Fleming", "Joan Sutherland", "Montserrat Caballé"], answer: "Maria Callas", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb die unvollendete 8. Sinfonie?", options: ["Schubert", "Beethoven", "Bruckner", "Mahler"], answer: "Schubert", difficulty: "schwer" },
  { q: "Welcher Regisseur schuf die 'Der Pate'-Trilogie?", options: ["Francis Ford Coppola", "Martin Scorsese", "Brian De Palma", "Sergio Leone"], answer: "Francis Ford Coppola", difficulty: "schwer" },
  { q: "Welches Instrument spielte Jimi Hendrix meisterhaft?", options: ["E-Gitarre", "Schlagzeug", "Bass", "Keyboard"], answer: "E-Gitarre", difficulty: "schwer" },
  { q: "Welcher Komponist gilt als Begründer der Zwölftonmusik?", options: ["Arnold Schönberg", "Igor Strawinsky", "Claude Debussy", "Béla Bartók"], answer: "Arnold Schönberg", difficulty: "schwer" },
  { q: "Welcher Stummfilmstar war für 'Der Tramp' bekannt?", options: ["Charlie Chaplin", "Buster Keaton", "Harold Lloyd", "Stan Laurel"], answer: "Charlie Chaplin", difficulty: "schwer" },
  { q: "Welche Band veröffentlichte das Konzeptalbum 'Sgt. Pepper's Lonely Hearts Club Band'?", options: ["The Beatles", "The Beach Boys", "Pink Floyd", "The Kinks"], answer: "The Beatles", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb 'Boléro'?", options: ["Maurice Ravel", "Claude Debussy", "Erik Satie", "Camille Saint-Saëns"], answer: "Maurice Ravel", difficulty: "schwer" },
  { q: "Welcher Regisseur drehte 'Citizen Kane'?", options: ["Orson Welles", "Alfred Hitchcock", "John Ford", "Howard Hawks"], answer: "Orson Welles", difficulty: "schwer", funFact: "Der Film gilt vielen als bester aller Zeiten." },
  { q: "Welcher Sänger gründete die Band 'The Velvet Underground' mit?", options: ["Lou Reed", "Iggy Pop", "David Bowie", "Brian Eno"], answer: "Lou Reed", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb die 'Mondscheinsonate'?", options: ["Beethoven", "Chopin", "Liszt", "Schumann"], answer: "Beethoven", difficulty: "schwer" },
  { q: "Welcher Film von Akira Kurosawa inspirierte 'Die glorreichen Sieben'?", options: ["Die sieben Samurai", "Rashomon", "Yojimbo", "Ran"], answer: "Die sieben Samurai", difficulty: "schwer" },
  { q: "Welche Sängerin war Frontfrau von Fleetwood Mac?", options: ["Stevie Nicks", "Janis Joplin", "Grace Slick", "Debbie Harry"], answer: "Stevie Nicks", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb über 600 Werke und starb mit 35 Jahren?", options: ["Mozart", "Schubert", "Mendelssohn", "Chopin"], answer: "Mozart", difficulty: "schwer" },
  { q: "Welcher Regisseur ist für seine 'Dollar-Trilogie' mit Clint Eastwood bekannt?", options: ["Sergio Leone", "Sam Peckinpah", "John Sturges", "Don Siegel"], answer: "Sergio Leone", difficulty: "schwer" },
  { q: "Welches Album von Michael Jackson ist das meistverkaufte aller Zeiten?", options: ["Thriller", "Bad", "Dangerous", "Off the Wall"], answer: "Thriller", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb den 'Karneval der Tiere'?", options: ["Camille Saint-Saëns", "Maurice Ravel", "Claude Debussy", "Gabriel Fauré"], answer: "Camille Saint-Saëns", difficulty: "schwer" },
  { q: "Welcher Schauspieler gewann dreimal den Oscar als bester Hauptdarsteller (Rekord-nah)?", options: ["Daniel Day-Lewis", "Tom Hanks", "Jack Nicholson", "Marlon Brando"], answer: "Daniel Day-Lewis", difficulty: "schwer", funFact: "Er ist der einzige mit drei Hauptdarsteller-Oscars." },
  { q: "Welcher Dirigent leitete jahrzehntelang die Berliner Philharmoniker?", options: ["Herbert von Karajan", "Leonard Bernstein", "Claudio Abbado", "Simon Rattle"], answer: "Herbert von Karajan", difficulty: "schwer" },
  { q: "Welcher Film war der erste Teil der 'Matrix'-Reihe (Jahr)?", options: ["1999", "2001", "1997", "2003"], answer: "1999", difficulty: "schwer" },
  { q: "Welcher Sänger wird 'The Voice' genannt und sang 'My Way'?", options: ["Frank Sinatra", "Dean Martin", "Tony Bennett", "Nat King Cole"], answer: "Frank Sinatra", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb die Opern 'La Bohème' und 'Tosca'?", options: ["Giacomo Puccini", "Giuseppe Verdi", "Gioachino Rossini", "Gaetano Donizetti"], answer: "Giacomo Puccini", difficulty: "schwer" },
  { q: "Welcher Regisseur drehte 'Apocalypse Now'?", options: ["Francis Ford Coppola", "Oliver Stone", "Stanley Kubrick", "Michael Cimino"], answer: "Francis Ford Coppola", difficulty: "schwer" },
  { q: "Welche Band veröffentlichte 'Stairway to Heaven'?", options: ["Led Zeppelin", "Deep Purple", "Black Sabbath", "The Doors"], answer: "Led Zeppelin", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb die Filmmusik zu 'Der gute, der Böse und der Hässliche'?", options: ["Ennio Morricone", "John Williams", "Jerry Goldsmith", "Elmer Bernstein"], answer: "Ennio Morricone", difficulty: "schwer" },
  { q: "Welcher französische Regisseur war Wegbereiter der Nouvelle Vague?", options: ["Jean-Luc Godard", "François Truffaut", "Claude Chabrol", "Éric Rohmer"], answer: "Jean-Luc Godard", difficulty: "schwer" },
  { q: "Welcher Pianist und Komponist war für seine Nocturnes bekannt?", options: ["Frédéric Chopin", "Franz Liszt", "Robert Schumann", "Johannes Brahms"], answer: "Frédéric Chopin", difficulty: "schwer" },
  { q: "Welcher Film basiert auf einem Roman von Stephen King und spielt in einem Hotel?", options: ["Shining", "Es", "Misery", "Carrie"], answer: "Shining", difficulty: "schwer" },
  { q: "Welcher Musiker wird 'The Boss' genannt?", options: ["Bruce Springsteen", "Bob Dylan", "Tom Petty", "Neil Young"], answer: "Bruce Springsteen", difficulty: "schwer" },
  { q: "Welcher Komponist vollendete Mozarts Requiem nach dessen Tod?", options: ["Süßmayr", "Salieri", "Haydn", "Beethoven"], answer: "Süßmayr", difficulty: "schwer" },
  { q: "Welcher Regisseur schuf 'Blade Runner' und 'Alien'?", options: ["Ridley Scott", "James Cameron", "John Carpenter", "Paul Verhoeven"], answer: "Ridley Scott", difficulty: "schwer" },
  { q: "Welche Jazzsängerin wird 'Lady Day' genannt?", options: ["Billie Holiday", "Ella Fitzgerald", "Nina Simone", "Sarah Vaughan"], answer: "Billie Holiday", difficulty: "schwer" },
  { q: "Welcher Komponist schrieb 'Eine kleine Nachtmusik' sowie 'Don Giovanni'?", options: ["Mozart", "Haydn", "Gluck", "Salieri"], answer: "Mozart", difficulty: "schwer" },
  { q: "Welcher Film gewann 1976 den Oscar und handelt von einem Boxer aus Philadelphia?", options: ["Rocky", "Raging Bull", "The Fighter", "Cinderella Man"], answer: "Rocky", difficulty: "schwer" },
  { q: "Welche Band wurde von Freddie Mercury angeführt?", options: ["Queen", "The Who", "Genesis", "Yes"], answer: "Queen", difficulty: "schwer" },
  { q: "Welcher US-Komponist schrieb 'Rhapsody in Blue'?", options: ["George Gershwin", "Aaron Copland", "Leonard Bernstein", "Cole Porter"], answer: "George Gershwin", difficulty: "schwer" },
  { q: "Welcher Regisseur drehte 'Fargo' und 'No Country for Old Men'?", options: ["Coen-Brüder", "Paul Thomas Anderson", "David Fincher", "Quentin Tarantino"], answer: "Coen-Brüder", difficulty: "schwer" },
  { q: "Welcher Komponist gilt als Meister des Barock und schrieb 'Wassermusik'?", options: ["Georg Friedrich Händel", "Johann Sebastian Bach", "Antonio Vivaldi", "Henry Purcell"], answer: "Georg Friedrich Händel", difficulty: "schwer" },
  { q: "Welcher Film mit Marlon Brando spielt im Mafia-Milieu (1972)?", options: ["Der Pate", "Good Fellas", "Scarface", "Casino"], answer: "Der Pate", difficulty: "schwer" },
],
  tiere: [
  // ── EINFACH ──
  { q: "Welches Tier hat drei Herzen?", options: ["Oktopus", "Tintenfisch-Verwandte", "Krake", "Qualle"], answer: "Oktopus", difficulty: "einfach", funFact: "Es hat blaues Blut." },
  { q: "Welches Säugetier kann aktiv fliegen?", options: ["Fledermaus", "Flughörnchen", "Gleithörnchen", "Flugbeutler"], answer: "Fledermaus", difficulty: "einfach", funFact: "Die anderen gleiten nur." },
  { q: "Welches ist das größte Tier der Welt?", options: ["Blauwal", "Elefant", "Giraffe", "Pottwal"], answer: "Blauwal", difficulty: "einfach", funFact: "Sein Herz ist so groß wie ein Kleinwagen." },
  { q: "Welcher Vogel kann nicht fliegen?", options: ["Pinguin", "Adler", "Möwe", "Reiher"], answer: "Pinguin", difficulty: "einfach" },
  { q: "Welches Insekt produziert Honig?", options: ["Biene", "Wespe", "Hummel", "Ameise"], answer: "Biene", difficulty: "einfach" },
  { q: "Welches Tier wechselt zur Tarnung die Farbe?", options: ["Chamäleon", "Gecko", "Leguan", "Salamander"], answer: "Chamäleon", difficulty: "einfach" },
  { q: "Welches Tier ist das schnellste an Land?", options: ["Gepard", "Löwe", "Gazelle", "Windhund"], answer: "Gepard", difficulty: "einfach", funFact: "Er erreicht kurzzeitig über 100 km/h." },
  { q: "Welcher Fisch ist als Raubtier mit vielen Zähnen bekannt?", options: ["Hai", "Lachs", "Hering", "Karpfen"], answer: "Hai", difficulty: "einfach" },
  { q: "Welches Tier baut Dämme aus Holz?", options: ["Biber", "Otter", "Ratte", "Maulwurf"], answer: "Biber", difficulty: "einfach" },
  { q: "Welches Meerestier hat acht Arme?", options: ["Oktopus", "Seestern", "Qualle", "Hummer"], answer: "Oktopus", difficulty: "einfach" },
  { q: "Welcher Vogel kann rückwärts fliegen?", options: ["Kolibri", "Specht", "Schwalbe", "Falke"], answer: "Kolibri", difficulty: "einfach", funFact: "Er schlägt bis zu 80-mal pro Sekunde mit den Flügeln." },
  { q: "Welches Tier ist für seinen langen Hals bekannt?", options: ["Giraffe", "Strauß", "Lama", "Kamel"], answer: "Giraffe", difficulty: "einfach" },
  { q: "Welche Tiergruppe legt Eier und hat Federn?", options: ["Vögel", "Säugetiere", "Reptilien", "Amphibien"], answer: "Vögel", difficulty: "einfach" },
  { q: "Welches Tier wird oft als 'König der Tiere' bezeichnet?", options: ["Löwe", "Tiger", "Bär", "Adler"], answer: "Löwe", difficulty: "einfach" },
  { q: "Welches Tier hält einen Winterschlaf?", options: ["Igel", "Adler", "Hai", "Pferd"], answer: "Igel", difficulty: "einfach" },

  // ── MITTEL ──
  { q: "Wie nennt man eine Gruppe von Löwen?", options: ["Rudel", "Schwarm", "Herde", "Meute"], answer: "Rudel", difficulty: "mittel" },
  { q: "Welches Tier hat den stärksten Biss der Welt?", options: ["Salzwasserkrokodil", "Weißer Hai", "Nilpferd", "Tiger"], answer: "Salzwasserkrokodil", difficulty: "mittel", funFact: "Es beißt mit über 3.000 PSI." },
  { q: "Wie viele Mägen hat eine Kuh?", options: ["4", "2", "1", "3"], answer: "4", difficulty: "mittel", funFact: "Genau genommen ein Magen mit vier Kammern." },
  { q: "Welches Tier kann seinen Kopf fast 270 Grad drehen?", options: ["Eule", "Chamäleon", "Erdmännchen", "Gottesanbeterin"], answer: "Eule", difficulty: "mittel" },
  { q: "Welches Tier hat keinen Magen?", options: ["Seepferdchen", "Aal", "Hai", "Rochen"], answer: "Seepferdchen", difficulty: "mittel", funFact: "Beim Seepferdchen trägt das Männchen die Jungen aus." },
  { q: "Welche Tiergruppe umfasst Spinnen und Skorpione?", options: ["Spinnentiere", "Insekten", "Krebstiere", "Tausendfüßer"], answer: "Spinnentiere", difficulty: "mittel", funFact: "Sie haben acht Beine, Insekten nur sechs." },
  { q: "Welches Tier schläft täglich am längsten?", options: ["Koala", "Faultier", "Katze", "Igel"], answer: "Koala", difficulty: "mittel", funFact: "Koalas schlafen bis zu 22 Stunden täglich." },
  { q: "Wie heißt das einzige Säugetier, das Eier legt und Gift hat?", options: ["Schnabeltier", "Ameisenigel", "Biber", "Otter"], answer: "Schnabeltier", difficulty: "mittel" },
  { q: "Welches Tier kann abgetrennte Gliedmaßen nachwachsen lassen?", options: ["Axolotl", "Frosch", "Schlange", "Kröte"], answer: "Axolotl", difficulty: "mittel", funFact: "Er kann sogar Teile seines Herzens regenerieren." },
  { q: "Welches ist das kleinste Säugetier der Welt?", options: ["Hummelfledermaus", "Spitzmaus", "Zwergmaus", "Maulwurf"], answer: "Hummelfledermaus", difficulty: "mittel", funFact: "Sie wiegt weniger als zwei Gramm." },
  { q: "Wie nennt man Tiere, die nur nachts aktiv sind?", options: ["Nachtaktiv", "Tagaktiv", "Dämmerungsaktiv", "Winterstarr"], answer: "Nachtaktiv", difficulty: "mittel" },
  { q: "Welches Tier kann am längsten ohne Wasser auskommen?", options: ["Kamel", "Elefant", "Esel", "Pferd"], answer: "Kamel", difficulty: "mittel" },
  { q: "Welche Klasse bilden Schlangen und Echsen?", options: ["Reptilien", "Amphibien", "Säugetiere", "Fische"], answer: "Reptilien", difficulty: "mittel" },
  { q: "Welches Tier ist für seinen Gesang unter Wasser bekannt?", options: ["Buckelwal", "Delfin", "Robbe", "Hai"], answer: "Buckelwal", difficulty: "mittel" },
  { q: "Wie nennt man ein männliches Schaf?", options: ["Widder", "Bock", "Hengst", "Eber"], answer: "Widder", difficulty: "mittel" },
  { q: "Welches Tier ist der nächste lebende Verwandte des Menschen?", options: ["Schimpanse", "Gorilla", "Orang-Utan", "Gibbon"], answer: "Schimpanse", difficulty: "mittel", funFact: "Wir teilen rund 98 % der Gene." },
  { q: "Welche Tierart bildet die größten bekannten Kolonien?", options: ["Ameisen", "Bienen", "Termiten", "Wespen"], answer: "Ameisen", difficulty: "mittel" },
  { q: "Wie viele Beine hat ein Tausendfüßer typischerweise wirklich?", options: ["Bis zu mehreren Hundert", "Genau 1000", "Genau 100", "Genau 50"], answer: "Bis zu mehreren Hundert", difficulty: "mittel", funFact: "Trotz des Namens hat keiner genau 1000 Beine." },
  { q: "Welches Tier produziert Seide?", options: ["Seidenraupe", "Spinne", "Biene", "Ameise"], answer: "Seidenraupe", difficulty: "mittel" },
  { q: "Welcher Vogel ist der größte der Welt?", options: ["Strauß", "Albatros", "Kondor", "Emu"], answer: "Strauß", difficulty: "mittel" },
  { q: "Welche Tierart wechselt das Geschlecht im Lauf des Lebens?", options: ["Clownfisch", "Hai", "Delfin", "Seelöwe"], answer: "Clownfisch", difficulty: "mittel" },
  { q: "Wie nennt man ein junges Pferd?", options: ["Fohlen", "Kalb", "Lamm", "Welpe"], answer: "Fohlen", difficulty: "mittel" },
  { q: "Welches Tier hat die größten Augen im Tierreich?", options: ["Riesenkalmar", "Blauwal", "Eule", "Adler"], answer: "Riesenkalmar", difficulty: "mittel", funFact: "Seine Augen sind so groß wie Teller." },
  { q: "Welches Insekt durchläuft eine vollständige Verwandlung?", options: ["Schmetterling", "Heuschrecke", "Libelle", "Wanze"], answer: "Schmetterling", difficulty: "mittel" },
  { q: "Welches Tier kann seine Hautfarbe und Muster blitzschnell ändern?", options: ["Tintenfisch", "Frosch", "Eidechse", "Krabbe"], answer: "Tintenfisch", difficulty: "mittel" },
  { q: "Welche Tiere bestäuben am meisten Pflanzen?", options: ["Bienen", "Vögel", "Fledermäuse", "Käfer"], answer: "Bienen", difficulty: "mittel" },
  { q: "Welches Tier ist als 'Wüstenschiff' bekannt?", options: ["Kamel", "Esel", "Pferd", "Lama"], answer: "Kamel", difficulty: "mittel" },
  { q: "Welche Tierklasse atmet sowohl über Kiemen als auch über Lungen im Lebenszyklus?", options: ["Amphibien", "Reptilien", "Fische", "Vögel"], answer: "Amphibien", difficulty: "mittel" },
  { q: "Welcher Greifvogel hat das schärfste Sehvermögen?", options: ["Adler", "Eule", "Falke", "Geier"], answer: "Adler", difficulty: "mittel" },
  { q: "Welches Tier kann bis zu 70 km/h schnell schwimmen und ist der schnellste Fisch?", options: ["Schwarzer Marlin", "Thunfisch", "Hai", "Schwertfisch"], answer: "Schwarzer Marlin", difficulty: "mittel" },
  { q: "Wie nennt man die Wissenschaft von den Vögeln?", options: ["Ornithologie", "Entomologie", "Herpetologie", "Ichthyologie"], answer: "Ornithologie", difficulty: "mittel" },
  { q: "Welche Tierart lebt in einem 'Bau' und ist für ihre Sozialstruktur bekannt?", options: ["Erdmännchen", "Igel", "Fuchs", "Wildschwein"], answer: "Erdmännchen", difficulty: "mittel" },
  { q: "Welches Tier kann seinen Stoffwechsel im Winter fast völlig herunterfahren?", options: ["Murmeltier", "Reh", "Eichhörnchen", "Hase"], answer: "Murmeltier", difficulty: "mittel" },
  { q: "Wie nennt man die Wissenschaft von den Insekten?", options: ["Entomologie", "Ornithologie", "Botanik", "Zoologie"], answer: "Entomologie", difficulty: "mittel" },

  // ── SCHWER ──
  { q: "Welches Tier hat das größte Gehirn im Verhältnis zur Körpergröße?", options: ["Spitzmaus", "Mensch", "Delfin", "Elefant"], answer: "Spitzmaus", difficulty: "schwer" },
  { q: "Welche Tierart kann am längsten ohne Sauerstoff überleben?", options: ["Schmuckschildkröte", "Wal", "Robbe", "Krokodil"], answer: "Schmuckschildkröte", difficulty: "schwer", funFact: "Sie übersteht Monate unter Eis fast ohne Sauerstoff." },
  { q: "Welches Insekt kann das Vielfache seines Körpergewichts heben?", options: ["Ameise", "Biene", "Käfer", "Heuschrecke"], answer: "Ameise", difficulty: "schwer" },
  { q: "Welches Tier besitzt die meisten Zähne unter den Landtieren?", options: ["Riesengürteltier", "Hai", "Krokodil", "Wolf"], answer: "Riesengürteltier", difficulty: "schwer" },
  { q: "Welche Quallenart gilt als biologisch 'unsterblich'?", options: ["Turritopsis dohrnii", "Ohrenqualle", "Würfelqualle", "Feuerqualle"], answer: "Turritopsis dohrnii", difficulty: "schwer", funFact: "Sie kann ihren Lebenszyklus zurücksetzen." },
  { q: "Welches Tier produziert das stärkste bekannte Gift?", options: ["Seewespe", "Kobra", "Skorpion", "Pfeilgiftfrosch"], answer: "Seewespe", difficulty: "schwer", funFact: "Die Seewespe ist eine Würfelqualle." },
  { q: "Welche Vogelart legt die längste Zugstrecke zurück?", options: ["Küstenseeschwalbe", "Storch", "Kranich", "Wanderfalke"], answer: "Küstenseeschwalbe", difficulty: "schwer", funFact: "Sie fliegt jährlich von Pol zu Pol." },
  { q: "Welches Säugetier legt als einziges neben dem Schnabeltier Eier?", options: ["Ameisenigel", "Koala", "Wombat", "Opossum"], answer: "Ameisenigel", difficulty: "schwer" },
  { q: "Welche Tierart kann ihre Körpertemperatur nicht selbst regulieren?", options: ["Reptilien", "Säugetiere", "Vögel", "Wale"], answer: "Reptilien", difficulty: "schwer", funFact: "Sie sind wechselwarm." },
  { q: "Welcher Fisch erzeugt elektrische Stromstöße zur Jagd?", options: ["Zitteraal", "Rochen", "Hai", "Wels"], answer: "Zitteraal", difficulty: "schwer", funFact: "Seine Stöße erreichen über 600 Volt." },
  { q: "Welches Tier hat das längste bekannte Leben unter den Wirbeltieren?", options: ["Grönlandhai", "Riesenschildkröte", "Karpfen", "Wal"], answer: "Grönlandhai", difficulty: "schwer", funFact: "Er kann über 400 Jahre alt werden." },
  { q: "Welche Tierart 'tanzt', um Artgenossen Futterquellen zu zeigen?", options: ["Honigbiene", "Ameise", "Termite", "Wespe"], answer: "Honigbiene", difficulty: "schwer", funFact: "Man nennt es den Schwänzeltanz." },
  { q: "Welches Tier hat blaues Blut auf Basis von Kupfer?", options: ["Pfeilschwanzkrebs", "Tintenfisch", "Krabbe", "Hummer"], answer: "Pfeilschwanzkrebs", difficulty: "schwer" },
  { q: "Welche Affenart ist die größte der Welt?", options: ["Gorilla", "Orang-Utan", "Schimpanse", "Mandrill"], answer: "Gorilla", difficulty: "schwer" },
  { q: "Welche Schlange ist die längste der Welt?", options: ["Netzpython", "Anakonda", "Königskobra", "Boa"], answer: "Netzpython", difficulty: "schwer" },
  { q: "Welches Tier kann seinen Stoffwechsel so weit senken, dass es jahrelang ohne Nahrung überlebt?", options: ["Lungenfisch", "Bär", "Frosch", "Schnecke"], answer: "Lungenfisch", difficulty: "schwer" },
  { q: "Welche Tierart bildet im Schwarm leuchtende Lichtsignale?", options: ["Glühwürmchen", "Motten", "Bienen", "Libellen"], answer: "Glühwürmchen", difficulty: "schwer" },
  { q: "Welcher Vogel baut die kunstvollsten 'Lauben' zur Balz?", options: ["Laubenvogel", "Paradiesvogel", "Webervogel", "Pfau"], answer: "Laubenvogel", difficulty: "schwer" },
  { q: "Welches Tier hat das größte Auge im gesamten Tierreich?", options: ["Riesenkalmar", "Blauwal", "Strauß", "Pferd"], answer: "Riesenkalmar", difficulty: "schwer" },
  { q: "Welche Tierart kann Werkzeuge nutzen, etwa Steine zum Knacken von Nüssen?", options: ["Schimpanse", "Wolf", "Pferd", "Reh"], answer: "Schimpanse", difficulty: "schwer" },
  { q: "Welcher Meeressäuger taucht am tiefsten?", options: ["Cuvier-Schnabelwal", "Blauwal", "Orca", "Delfin"], answer: "Cuvier-Schnabelwal", difficulty: "schwer", funFact: "Er taucht fast 3.000 Meter tief." },
  { q: "Welches Insekt überträgt die Malaria?", options: ["Anopheles-Mücke", "Tsetsefliege", "Zecke", "Floh"], answer: "Anopheles-Mücke", difficulty: "schwer" },
  { q: "Welche Tierart wandert in riesigen Schwärmen durch die Serengeti?", options: ["Gnu", "Zebra", "Antilope", "Büffel"], answer: "Gnu", difficulty: "schwer" },
  { q: "Welche Spinne gilt als giftigste der Welt?", options: ["Brasilianische Wanderspinne", "Schwarze Witwe", "Vogelspinne", "Trichternetzspinne"], answer: "Brasilianische Wanderspinne", difficulty: "schwer" },
  { q: "Welches Tier kann seine Beute mit einer 'Schleimkanone' fangen?", options: ["Schleimaal", "Tintenfisch", "Frosch", "Chamäleon"], answer: "Schleimaal", difficulty: "schwer" },
  { q: "Welcher Vogel kann am schnellsten fliegen (im Sturzflug)?", options: ["Wanderfalke", "Mauersegler", "Adler", "Albatros"], answer: "Wanderfalke", difficulty: "schwer", funFact: "Im Sturzflug erreicht er über 300 km/h." },
  { q: "Welche Tierart navigiert mithilfe des Erdmagnetfelds?", options: ["Zugvögel", "Frösche", "Eichhörnchen", "Rehe"], answer: "Zugvögel", difficulty: "schwer" },
  { q: "Welches Tier ist der größte lebende Landraubsäuger?", options: ["Eisbär", "Löwe", "Tiger", "Braunbär"], answer: "Eisbär", difficulty: "schwer" },
  { q: "Welche Tierart kann ihre Augen unabhängig voneinander bewegen?", options: ["Chamäleon", "Frosch", "Schlange", "Echse"], answer: "Chamäleon", difficulty: "schwer" },
  { q: "Welches Insekt lebt in einem strengen Kastensystem mit einer Königin?", options: ["Termite", "Heuschrecke", "Käfer", "Libelle"], answer: "Termite", difficulty: "schwer" },
  { q: "Welcher Fisch kann an Land kriechen und kurze Strecken überleben?", options: ["Schlammspringer", "Aal", "Wels", "Karpfen"], answer: "Schlammspringer", difficulty: "schwer" },
  { q: "Welche Tierart kann Ultraschall zur Jagd erzeugen?", options: ["Fledermaus", "Eule", "Falke", "Katze"], answer: "Fledermaus", difficulty: "schwer" },
  { q: "Welches Reptil ist die größte lebende Echse?", options: ["Komodowaran", "Leguan", "Krokodil", "Gecko"], answer: "Komodowaran", difficulty: "schwer", funFact: "Er kann über drei Meter lang werden." },
  { q: "Welche Tierart trägt ihre Jungen im Beutel und ist in Australien heimisch?", options: ["Känguru", "Koala", "Wombat", "Alle genannten"], answer: "Alle genannten", difficulty: "schwer" },
  { q: "Welcher Vogel ahmt menschliche Sprache am besten nach?", options: ["Graupapagei", "Star", "Rabe", "Beo"], answer: "Graupapagei", difficulty: "schwer" },
  { q: "Welche Tierart bildet Symbiosen mit Seeanemonen?", options: ["Clownfisch", "Seestern", "Krabbe", "Garnele"], answer: "Clownfisch", difficulty: "schwer" },
  { q: "Welches Säugetier hat den längsten Schlaf-Wach-Rhythmus und ist fast blind?", options: ["Maulwurf", "Igel", "Fledermaus", "Spitzmaus"], answer: "Maulwurf", difficulty: "schwer" },
  { q: "Welche Tierart legt die meisten Eier auf einmal (Millionen)?", options: ["Mondfisch", "Frosch", "Schildkröte", "Krokodil"], answer: "Mondfisch", difficulty: "schwer", funFact: "Ein Weibchen kann bis zu 300 Millionen Eier tragen." },
  { q: "Welches Tier nutzt Echoortung im Wasser?", options: ["Delfin", "Hai", "Robbe", "Pinguin"], answer: "Delfin", difficulty: "schwer" },
  { q: "Welche Tierart kann ihren Panzer nicht abwerfen und wächst mit ihm?", options: ["Schildkröte", "Krabbe", "Hummer", "Garnele"], answer: "Schildkröte", difficulty: "schwer" },
  { q: "Welches Tier gilt als giftigster Frosch?", options: ["Goldener Pfeilgiftfrosch", "Laubfrosch", "Ochsenfrosch", "Kröte"], answer: "Goldener Pfeilgiftfrosch", difficulty: "schwer" },
  { q: "Welche Tierart hat ein Skelett aus Knorpel statt Knochen?", options: ["Hai", "Thunfisch", "Lachs", "Karpfen"], answer: "Hai", difficulty: "schwer" },
  { q: "Welches Tier kann seine Beute durch Aufpumpen abschrecken und ist giftig?", options: ["Kugelfisch", "Seeigel", "Krabbe", "Tintenfisch"], answer: "Kugelfisch", difficulty: "schwer", funFact: "In Japan ist er als 'Fugu' eine riskante Delikatesse." },
  { q: "Welcher Wal hat einen langen, spiralförmigen Stoßzahn?", options: ["Narwal", "Belugawal", "Pottwal", "Buckelwal"], answer: "Narwal", difficulty: "schwer", funFact: "Der Stoßzahn ist eigentlich ein verlängerter Zahn." },
],
  essen: [
  // ── EINFACH ──
  { q: "Aus welchem Land kommt die Pizza ursprünglich?", options: ["Italien", "Griechenland", "Spanien", "USA"], answer: "Italien", difficulty: "einfach" },
  { q: "Welche Bohne ist die Basis für Schokolade?", options: ["Kakaobohne", "Kaffeebohne", "Sojabohne", "Vanillebohne"], answer: "Kakaobohne", difficulty: "einfach", funFact: "Azteken nutzten Kakaobohnen als Zahlungsmittel." },
  { q: "Was ist Guacamole hauptsächlich?", options: ["Avocado", "Erbsen", "Spinat", "Brokkoli"], answer: "Avocado", difficulty: "einfach", funFact: "Avocados sind botanisch gesehen Beeren." },
  { q: "Welche Frucht steckt im Ketchup?", options: ["Tomate", "Apfel", "Paprika", "Pflaume"], answer: "Tomate", difficulty: "einfach" },
  { q: "Welches Getränk wird aus Trauben vergoren?", options: ["Wein", "Bier", "Cidre", "Sake"], answer: "Wein", difficulty: "einfach" },
  { q: "Welches Land ist berühmt für Sushi?", options: ["Japan", "China", "Thailand", "Korea"], answer: "Japan", difficulty: "einfach", funFact: "Sushi bezeichnet eigentlich den gesäuerten Reis." },
  { q: "Welche Nuss steckt in echtem Marzipan?", options: ["Mandel", "Walnuss", "Haselnuss", "Cashew"], answer: "Mandel", difficulty: "einfach" },
  { q: "Welches Gewürz ist das teuerste der Welt?", options: ["Safran", "Vanille", "Kardamom", "Zimt"], answer: "Safran", difficulty: "einfach", funFact: "Für ein Kilo braucht man rund 150.000 Blüten." },
  { q: "Was ist die Hauptzutat von Hummus?", options: ["Kichererbsen", "Linsen", "Bohnen", "Erbsen"], answer: "Kichererbsen", difficulty: "einfach" },
  { q: "Welches Getränk enthält von Natur aus Koffein?", options: ["Kaffee", "Kamillentee", "Limonade", "Milch"], answer: "Kaffee", difficulty: "einfach" },
  { q: "Aus welchem Getreide wird Brot meist gebacken?", options: ["Weizen", "Reis", "Mais", "Hafer"], answer: "Weizen", difficulty: "einfach" },
  { q: "Welche Teigart wird für Croissants verwendet?", options: ["Blätterteig", "Mürbeteig", "Hefeteig", "Rührteig"], answer: "Blätterteig", difficulty: "einfach" },
  { q: "Welches scharfe Element steckt in Chili?", options: ["Capsaicin", "Piperin", "Allicin", "Menthol"], answer: "Capsaicin", difficulty: "einfach" },
  { q: "Welche Käsesorte hat traditionell Löcher?", options: ["Emmentaler", "Gouda", "Cheddar", "Brie"], answer: "Emmentaler", difficulty: "einfach", funFact: "Die Löcher entstehen durch Bakterien beim Reifen." },
  { q: "Welches Land ist für Pasta besonders bekannt?", options: ["Italien", "Frankreich", "Griechenland", "Spanien"], answer: "Italien", difficulty: "einfach" },

  // ── MITTEL ──
  { q: "Welches Tier liefert traditionell die Milch für echten Mozzarella?", options: ["Wasserbüffel", "Kuh", "Ziege", "Schaf"], answer: "Wasserbüffel", difficulty: "mittel" },
  { q: "Aus welchem Land stammt der Croissant-Vorläufer?", options: ["Österreich", "Frankreich", "Belgien", "Schweiz"], answer: "Österreich", difficulty: "mittel", funFact: "Das Wiener 'Kipferl' gilt als Vorläufer." },
  { q: "Welches Land trinkt pro Kopf am meisten Kaffee?", options: ["Finnland", "Italien", "Schweden", "Österreich"], answer: "Finnland", difficulty: "mittel" },
  { q: "Welches Gewürz gibt Curry seine gelbe Farbe?", options: ["Kurkuma", "Safran", "Paprika", "Ingwer"], answer: "Kurkuma", difficulty: "mittel" },
  { q: "Aus welcher Pflanze wird Vanille gewonnen?", options: ["Orchidee", "Bohnenranke", "Palme", "Farn"], answer: "Orchidee", difficulty: "mittel", funFact: "Vanille ist nach Safran das zweitteuerste Gewürz." },
  { q: "Welche italienische Spezialität ist ein dünner roher Schinken?", options: ["Prosciutto", "Salami", "Mortadella", "Bresaola"], answer: "Prosciutto", difficulty: "mittel" },
  { q: "Welches Land ist der größte Produzent von Olivenöl?", options: ["Spanien", "Italien", "Griechenland", "Türkei"], answer: "Spanien", difficulty: "mittel" },
  { q: "Welche Grundzutat macht Sojasauce salzig-würzig?", options: ["Fermentierte Sojabohnen", "Meersalz", "Misopaste", "Reisessig"], answer: "Fermentierte Sojabohnen", difficulty: "mittel" },
  { q: "Welches Süßungsmittel stammt von einer südamerikanischen Pflanze?", options: ["Stevia", "Aspartam", "Xylit", "Sorbit"], answer: "Stevia", difficulty: "mittel", funFact: "Stevia süßt bis zu 300-mal stärker als Zucker." },
  { q: "Welche Frucht ist als 'Stinkfrucht' Asiens bekannt?", options: ["Durian", "Litschi", "Mango", "Papaya"], answer: "Durian", difficulty: "mittel", funFact: "In vielen Hotels Asiens ist sie wegen des Geruchs verboten." },
  { q: "Aus welchem Tier wird Roquefort-Käse gemacht?", options: ["Schaf", "Kuh", "Ziege", "Büffel"], answer: "Schaf", difficulty: "mittel", funFact: "Er reift in Kalksteinhöhlen Südfrankreichs." },
  { q: "Welches Getränk entsteht durch Destillation von vergorenem Agavensaft?", options: ["Tequila", "Rum", "Whisky", "Wodka"], answer: "Tequila", difficulty: "mittel" },
  { q: "Welche Reissorte wird für Risotto verwendet?", options: ["Arborio", "Basmati", "Jasmin", "Wildreis"], answer: "Arborio", difficulty: "mittel" },
  { q: "Aus welchem Land stammt das Gericht Paella?", options: ["Spanien", "Italien", "Portugal", "Mexiko"], answer: "Spanien", difficulty: "mittel", funFact: "Es stammt ursprünglich aus Valencia." },
  { q: "Welche Zutat macht Sauerteigbrot 'sauer'?", options: ["Milchsäurebakterien", "Essig", "Zitrone", "Joghurt"], answer: "Milchsäurebakterien", difficulty: "mittel" },
  { q: "Welches Land hat die Croissant-Kultur perfektioniert?", options: ["Frankreich", "Österreich", "Belgien", "Italien"], answer: "Frankreich", difficulty: "mittel" },
  { q: "Welcher Alkohol ist die Basis eines Mojito?", options: ["Rum", "Wodka", "Gin", "Tequila"], answer: "Rum", difficulty: "mittel" },
  { q: "Welches Gemüse ist die Basis von Sauerkraut?", options: ["Weißkohl", "Rotkohl", "Wirsing", "Spitzkohl"], answer: "Weißkohl", difficulty: "mittel" },
  { q: "Welche japanische Paste wird aus fermentierten Sojabohnen gemacht?", options: ["Miso", "Wasabi", "Tofu", "Dashi"], answer: "Miso", difficulty: "mittel" },
  { q: "Aus welchem Land stammt der Käse Feta?", options: ["Griechenland", "Italien", "Frankreich", "Türkei"], answer: "Griechenland", difficulty: "mittel" },
  { q: "Welche Frucht wird zu Wein vergoren und dann zu Balsamico?", options: ["Traube", "Apfel", "Birne", "Pflaume"], answer: "Traube", difficulty: "mittel" },
  { q: "Welche Nuss wird für Pesto alla Genovese klassisch verwendet?", options: ["Pinienkerne", "Walnuss", "Mandel", "Cashew"], answer: "Pinienkerne", difficulty: "mittel" },
  { q: "Welches Gewürz stammt von der Rinde eines Baumes?", options: ["Zimt", "Pfeffer", "Muskat", "Nelke"], answer: "Zimt", difficulty: "mittel" },
  { q: "Welche Teesorte ist nicht fermentiert?", options: ["Grüner Tee", "Schwarzer Tee", "Oolong", "Pu-Erh"], answer: "Grüner Tee", difficulty: "mittel" },
  { q: "Welches Land erfand den Hamburger in seiner heutigen Form?", options: ["USA", "Deutschland", "England", "Frankreich"], answer: "USA", difficulty: "mittel" },
  { q: "Welche Frucht ist die Hauptzutat von Marmelade aus Zitrusfrüchten (Orangenkonfitüre)?", options: ["Orange", "Zitrone", "Mandarine", "Grapefruit"], answer: "Orange", difficulty: "mittel" },
  { q: "Welcher Fisch wird typischerweise zu Räucherlachs verarbeitet?", options: ["Lachs", "Hering", "Makrele", "Forelle"], answer: "Lachs", difficulty: "mittel" },
  { q: "Welches Gericht besteht aus rohem, mariniertem Fisch und stammt aus Peru?", options: ["Ceviche", "Sushi", "Tartar", "Sashimi"], answer: "Ceviche", difficulty: "mittel" },
  { q: "Welche Knolle ist die Basis für Pommes frites?", options: ["Kartoffel", "Süßkartoffel", "Maniok", "Yamswurzel"], answer: "Kartoffel", difficulty: "mittel" },
  { q: "Welche Pflanze liefert die Schärfe von Wasabi?", options: ["Wasabi-Wurzel", "Chili", "Pfeffer", "Senfkorn"], answer: "Wasabi-Wurzel", difficulty: "mittel", funFact: "Oft ist es nur gefärbter Meerrettich." },
  { q: "Aus welchem Getreide wird Whisky vorrangig hergestellt?", options: ["Gerste", "Weizen", "Reis", "Mais"], answer: "Gerste", difficulty: "mittel" },
  { q: "Welche Zutat sorgt für die rote Farbe von Paella?", options: ["Safran", "Tomate", "Paprika", "Rote Bete"], answer: "Safran", difficulty: "mittel" },
  { q: "Welches Brot ist typisch indisch und wird im Tandoor gebacken?", options: ["Naan", "Baguette", "Ciabatta", "Pita"], answer: "Naan", difficulty: "mittel" },
  { q: "Welcher Käse wird traditionell über Nudeln gerieben?", options: ["Parmesan", "Mozzarella", "Ricotta", "Pecorino"], answer: "Parmesan", difficulty: "mittel" },

  // ── SCHWER ──
  { q: "Welches Land erfand die Tempura-Frittiertechnik nicht, brachte sie aber nach Japan?", options: ["Portugal", "China", "Korea", "Niederlande"], answer: "Portugal", difficulty: "schwer", funFact: "Portugiesische Missionare brachten sie im 16. Jh." },
  { q: "Welche Edelschimmel-Art veredelt Camembert?", options: ["Penicillium camemberti", "Aspergillus", "Botrytis", "Rhizopus"], answer: "Penicillium camemberti", difficulty: "schwer" },
  { q: "Welches Gewürz wird aus dem Samenmantel der Muskatnuss gewonnen?", options: ["Macis", "Kardamom", "Piment", "Sternanis"], answer: "Macis", difficulty: "schwer", funFact: "Macis wird auch 'Muskatblüte' genannt." },
  { q: "Welcher Wein wird aus edelfaulen Trauben gewonnen?", options: ["Sauternes", "Chianti", "Rioja", "Bordeaux"], answer: "Sauternes", difficulty: "schwer", funFact: "Die Edelfäule heißt Botrytis cinerea." },
  { q: "Welche japanische Technik bezeichnet das Reifen von Fisch zur Geschmacksverstärkung?", options: ["Umami-Reifung", "Nigiri", "Teriyaki", "Tempura"], answer: "Umami-Reifung", difficulty: "schwer" },
  { q: "Welche Hülsenfrucht ist die Basis für traditionellen Tofu?", options: ["Sojabohne", "Kichererbse", "Linse", "Erbse"], answer: "Sojabohne", difficulty: "schwer" },
  { q: "Welcher französische Käse gilt als 'König der Käse'?", options: ["Brie de Meaux", "Camembert", "Roquefort", "Comté"], answer: "Brie de Meaux", difficulty: "schwer" },
  { q: "Welches Fermentationsprodukt ist die Grundlage von Kimchi?", options: ["Milchsäuregärung", "Alkoholische Gärung", "Essigsäuregärung", "Schimmelreifung"], answer: "Milchsäuregärung", difficulty: "schwer" },
  { q: "Welche Rebsorte ist die Basis von echtem Champagner zumeist?", options: ["Chardonnay", "Riesling", "Merlot", "Sauvignon Blanc"], answer: "Chardonnay", difficulty: "schwer", funFact: "Auch Pinot Noir und Pinot Meunier werden verwendet." },
  { q: "Welche Geschmacksrichtung wurde als fünfter Grundgeschmack 'entdeckt'?", options: ["Umami", "Süß", "Salzig", "Bitter"], answer: "Umami", difficulty: "schwer", funFact: "Sie wurde 1908 in Japan beschrieben." },
  { q: "Welcher Pilz ist die teuerste Trüffelart?", options: ["Weiße Albatrüffel", "Schwarze Périgordtrüffel", "Sommertrüffel", "Burgundertrüffel"], answer: "Weiße Albatrüffel", difficulty: "schwer" },
  { q: "Welcher Reis wird für japanisches Sake verwendet?", options: ["Spezieller Sakereis", "Basmati", "Jasminreis", "Arborio"], answer: "Spezieller Sakereis", difficulty: "schwer" },
  { q: "Welche Zutat macht echtes Wiener Schnitzel aus?", options: ["Kalbfleisch", "Schweinefleisch", "Hähnchen", "Pute"], answer: "Kalbfleisch", difficulty: "schwer", funFact: "Aus Schwein heißt es 'Schnitzel Wiener Art'." },
  { q: "Welcher Likör ist Bestandteil eines klassischen Negroni?", options: ["Campari", "Aperol", "Limoncello", "Cointreau"], answer: "Campari", difficulty: "schwer" },
  { q: "Welches Gewürz wird aus den getrockneten Blütennarben einer Krokusart gewonnen?", options: ["Safran", "Kurkuma", "Paprika", "Sumach"], answer: "Safran", difficulty: "schwer" },
  { q: "Welche Käseart wird durch Streckung des Bruchs in heißem Wasser hergestellt?", options: ["Pasta filata", "Hartkäse", "Schimmelkäse", "Frischkäse"], answer: "Pasta filata", difficulty: "schwer", funFact: "Mozzarella gehört dazu." },
  { q: "Welches Land ist Ursprung des Gerichts Goulasch?", options: ["Ungarn", "Österreich", "Tschechien", "Polen"], answer: "Ungarn", difficulty: "schwer" },
  { q: "Welche Säure macht Joghurt sauer?", options: ["Milchsäure", "Zitronensäure", "Essigsäure", "Apfelsäure"], answer: "Milchsäure", difficulty: "schwer" },
  { q: "Welcher Teil des Kaffeestrauchs wird geröstet?", options: ["Die Bohne (Samen)", "Das Blatt", "Die Blüte", "Die Wurzel"], answer: "Die Bohne (Samen)", difficulty: "schwer" },
  { q: "Welches Verfahren entzieht Kaffee das Koffein?", options: ["Entkoffeinierung", "Pasteurisierung", "Fermentierung", "Sublimierung"], answer: "Entkoffeinierung", difficulty: "schwer" },
  { q: "Welche Spezialität besteht aus rohem Rindfleisch, fein gehackt?", options: ["Tatar", "Carpaccio", "Bresaola", "Pastrami"], answer: "Tatar", difficulty: "schwer" },
  { q: "Welcher Schinken aus Spanien stammt von Schweinen, die Eicheln fressen?", options: ["Jamón Ibérico", "Serrano", "Prosciutto", "Speck"], answer: "Jamón Ibérico", difficulty: "schwer" },
  { q: "Welches Gewürz wird auch 'Königin der Gewürze' genannt?", options: ["Kardamom", "Zimt", "Vanille", "Nelke"], answer: "Kardamom", difficulty: "schwer" },
  { q: "Welche Methode reift Steaks bei kontrollierter Luft über Wochen?", options: ["Dry Aging", "Wet Aging", "Sous-vide", "Konfieren"], answer: "Dry Aging", difficulty: "schwer" },
  { q: "Welche Frucht ist botanisch verwandt mit der Tomate und in Currys beliebt?", options: ["Aubergine", "Gurke", "Zucchini", "Kürbis"], answer: "Aubergine", difficulty: "schwer" },
  { q: "Welche Algen werden für Sushi-Rollen verwendet?", options: ["Nori", "Wakame", "Kombu", "Hijiki"], answer: "Nori", difficulty: "schwer" },
  { q: "Welche Garmethode gart Speisen vakuumiert im Wasserbad bei niedriger Temperatur?", options: ["Sous-vide", "Pochieren", "Blanchieren", "Schmoren"], answer: "Sous-vide", difficulty: "schwer" },
  { q: "Welches indische Milchprodukt entsteht durch Gerinnen mit Säure?", options: ["Paneer", "Ghee", "Lassi", "Raita"], answer: "Paneer", difficulty: "schwer" },
  { q: "Welcher Cocktail besteht klassisch aus Gin und Wermut?", options: ["Martini", "Mojito", "Negroni", "Margarita"], answer: "Martini", difficulty: "schwer" },
  { q: "Welcher Käse ist mit blauem Edelschimmel durchzogen und stammt aus Italien?", options: ["Gorgonzola", "Pecorino", "Taleggio", "Asiago"], answer: "Gorgonzola", difficulty: "schwer" },
  { q: "Welche Geschmacksverstärker-Substanz steckt natürlicherweise in Parmesan und Tomaten?", options: ["Glutamat", "Fruktose", "Laktose", "Saccharose"], answer: "Glutamat", difficulty: "schwer" },
  { q: "Welcher Wein stammt aus der italienischen Region Piemont und gilt als sehr edel?", options: ["Barolo", "Chianti", "Prosecco", "Soave"], answer: "Barolo", difficulty: "schwer" },
  { q: "Welches Brot ist ein traditionelles jüdisches Flechtbrot?", options: ["Challah", "Bagel", "Matze", "Pita"], answer: "Challah", difficulty: "schwer" },
  { q: "Welche Frucht ist die Basis für authentischen Grenadine-Sirup?", options: ["Granatapfel", "Kirsche", "Himbeere", "Johannisbeere"], answer: "Granatapfel", difficulty: "schwer" },
  { q: "Welcher Reis ist klebrig und Basis für Mochi?", options: ["Klebreis", "Basmati", "Arborio", "Wildreis"], answer: "Klebreis", difficulty: "schwer" },
  { q: "Welche Frucht ist die Basis von Marmelade laut EU streng genommen?", options: ["Zitrusfrüchte", "Erdbeeren", "Aprikosen", "Kirschen"], answer: "Zitrusfrüchte", difficulty: "schwer", funFact: "Anderes Fruchtaufstrich heißt offiziell 'Konfitüre'." },
  { q: "Welche Pflanze liefert die Kapern, die man isst?", options: ["Kapernstrauch (Knospen)", "Olivenbaum", "Weinrebe", "Lorbeer"], answer: "Kapernstrauch (Knospen)", difficulty: "schwer", funFact: "Kapern sind die eingelegten Blütenknospen." },
  { q: "Welche Käseart muss in einer bestimmten Region Italiens gereift werden, um den Namen zu tragen?", options: ["Parmigiano Reggiano", "Mozzarella", "Ricotta", "Burrata"], answer: "Parmigiano Reggiano", difficulty: "schwer" },
  { q: "Welche Frucht enthält ein Enzym, das Gelatine am Festwerden hindert?", options: ["Ananas", "Apfel", "Banane", "Birne"], answer: "Ananas", difficulty: "schwer", funFact: "Das Enzym Bromelain zersetzt Eiweiß." },
  { q: "Welcher französische Begriff bezeichnet die Vorbereitung aller Zutaten vor dem Kochen?", options: ["Mise en place", "Sauté", "Flambé", "Julienne"], answer: "Mise en place", difficulty: "schwer" },
  { q: "Welches Öl gilt als besonders hitzestabil zum Braten?", options: ["Raffiniertes Rapsöl", "Natives Olivenöl", "Leinöl", "Walnussöl"], answer: "Raffiniertes Rapsöl", difficulty: "schwer" },
  { q: "Welche Pilzsorte ist in der asiatischen Küche besonders verbreitet?", options: ["Shiitake", "Champignon", "Pfifferling", "Steinpilz"], answer: "Shiitake", difficulty: "schwer" },
  { q: "Welche Gärung verwandelt Most in Wein?", options: ["Alkoholische Gärung", "Milchsäuregärung", "Essigsäuregärung", "Buttersäuregärung"], answer: "Alkoholische Gärung", difficulty: "schwer" },
  { q: "Welches Getränk entsteht durch zweifache Destillation von Wein?", options: ["Cognac", "Whisky", "Rum", "Gin"], answer: "Cognac", difficulty: "schwer" },
  { q: "Welcher Teil der Vanille wird als Gewürz verwendet?", options: ["Die Schote", "Die Wurzel", "Das Blatt", "Die Blüte"], answer: "Die Schote", difficulty: "schwer" },
],
};

const TOPICS = [
  { id: "laender", label: "Länder", icon: "🌍", desc: "Flaggen, Hauptstädte & Kontinente" },
  { id: "wissenschaft", label: "Wissenschaft & Natur", icon: "🔬", desc: "Physik, Biologie & Weltall" },
  { id: "geschichte", label: "Geschichte", icon: "🏛️", desc: "Epochen, Ereignisse & Personen" },
  { id: "sport", label: "Sport", icon: "⚽", desc: "Regeln, Rekorde & Disziplinen" },
  { id: "film_musik", label: "Filme & Musik", icon: "🎬", desc: "Kino, Bands & Klassik" },
  { id: "tiere", label: "Tiere", icon: "🐾", desc: "Arten, Rekorde & Kurioses" },
  { id: "essen", label: "Essen & Trinken", icon: "🍕", desc: "Küchen, Zutaten & Herkunft" },
  { id: "mix", label: "Bunter Mix", icon: "🎲", desc: "Fragen aus allen Themen gemischt" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuestion(correct, pool, allowedTypes) {
  const types = allowedTypes && allowedTypes.length > 0 ? allowedTypes : ["flag", "capital", "continent"];
  const type = types[Math.floor(Math.random() * types.length)];
  // Distractors: prefer same-difficulty countries, fall back to all others to always get 3
  const sameDiff = pool.filter(c => c.name !== correct.name && c.difficulty === correct.difficulty);
  const allOthers = pool.filter(c => c.name !== correct.name);
  let others = shuffle(sameDiff).slice(0, 3);
  if (others.length < 3) {
    // top up from the full pool without duplicates
    const have = new Set(others.map(o => o.name));
    for (const c of shuffle(allOthers)) {
      if (others.length >= 3) break;
      if (!have.has(c.name)) { others.push(c); have.add(c.name); }
    }
  }

  const base = {
    type,
    display: correct.flag,
    code: correct.code,
    difficulty: correct.difficulty,
    funFact: correct.funFact,
    country: correct.name,
  };

  if (type === "flag") {
    return {
      ...base,
      question: `Welchem Land gehört diese Flagge?`,
      options: shuffle([correct, ...others]).map(o => o.name),
      answer: correct.name,
      fact: `${correct.flag} ${correct.name} – Hauptstadt: ${correct.capital}`,
    };
  } else if (type === "capital") {
    return {
      ...base,
      question: `Was ist die Hauptstadt von ${correct.name}?`,
      options: shuffle([correct, ...others]).map(o => o.capital),
      answer: correct.capital,
      fact: `${correct.flag} Die Hauptstadt von ${correct.name} ist ${correct.capital}.`,
    };
  } else {
    const allConts = ["Europa", "Asien", "Afrika", "Nordamerika", "Südamerika", "Ozeanien"];
    const wrongConts = shuffle(allConts.filter(c => c !== correct.continent)).slice(0, 3);
    return {
      ...base,
      question: `Auf welchem Kontinent liegt ${correct.name}?`,
      options: shuffle([correct.continent, ...wrongConts]),
      answer: correct.continent,
      fact: `${correct.flag} ${correct.name} liegt in ${correct.continent}.`,
    };
  }
}

// Pick n items, weighted toward harder questions (≈20% easy, 40% medium, 40% hard)
function balancedPick(items, total, avoidKeys, keyFn) {
  const keyOf = keyFn || (it => it.name || (it.item && it.item.q) || it.q || JSON.stringify(it));
  const avoid = avoidKeys instanceof Set ? avoidKeys : new Set();

  // Prefer items not recently used; if a difficulty runs dry, allow recents back
  const split = diff => {
    const all = items.filter(c => c.difficulty === diff);
    const fresh = shuffle(all.filter(c => !avoid.has(keyOf(c))));
    const used = shuffle(all.filter(c => avoid.has(keyOf(c))));
    return fresh.concat(used); // fresh first, recents as fallback
  };
  const byDiff = { einfach: split("einfach"), mittel: split("mittel"), schwer: split("schwer") };

  const easy = Math.round(total * 0.2);
  const medium = Math.round(total * 0.4);
  const hard = total - easy - medium;
  const counts = { einfach: easy, mittel: medium, schwer: hard };

  const order = [];
  const usedKeys = new Set();
  // First pass: take unique items per difficulty
  Object.entries(counts).forEach(([diff, n]) => {
    const list = byDiff[diff];
    let taken = 0;
    for (let i = 0; i < list.length && taken < n; i++) {
      const k = keyOf(list[i]);
      if (!usedKeys.has(k)) { order.push(list[i]); usedKeys.add(k); taken++; }
    }
  });
  // Second pass: if we still need more (a difficulty was too small),
  // fill from ALL items, still avoiding duplicates within this round
  if (order.length < total) {
    const everything = shuffle(items);
    for (let i = 0; i < everything.length && order.length < total; i++) {
      const k = keyOf(everything[i]);
      if (!usedKeys.has(k)) { order.push(everything[i]); usedKeys.add(k); }
    }
  }
  return shuffle(order);
}

// Build a balanced round for any topic
const TOPIC_ICONS = {
  wissenschaft: "🔬",
  geschichte: "🏛️",
  sport: "⚽",
  film_musik: "🎬",
  tiere: "🐾",
  essen: "🍽️",
};

// Seeded RNG (mulberry32) for the daily challenge — same questions for everyone per day
function makeRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWith(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Seed of yesterday (handles month/year boundaries correctly)
function yesterdaySeed() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Convert a raw topic-question item into the runtime question shape
function makeTopicQuestion(item, topicId) {
  return {
    type: topicId,
    question: item.q,
    display: TOPIC_ICONS[topicId] || "❓",
    options: shuffle(item.options),
    answer: item.answer,
    difficulty: item.difficulty,
    funFact: item.funFact,
    fact: `Richtige Antwort: ${item.answer}`,
    country: item.answer,
  };
}

// Remember recently-used questions per topic so rounds don't repeat them.
// Keeps a rolling window so the pool stays varied across many games.
const recentByTopic = {};
function keyForQuestion(q) {
  // q is a runtime question; use the question text (or country) as identity
  return q.question || q.country || "";
}
function rememberQuestions(topicKey, questions, poolSize) {
  const prev = recentByTopic[topicKey] || [];
  const newKeys = questions.map(keyForQuestion);
  const combined = newKeys.concat(prev);
  // Keep at most ~60% of the pool in memory → always leaves fresh questions
  const cap = Math.max(0, Math.floor(poolSize * 0.6));
  recentByTopic[topicKey] = combined.slice(0, cap);
}
function recentSet(topicKey) {
  return new Set(recentByTopic[topicKey] || []);
}

function buildRound(total, topic, allowedTypes, diff) {
  const onlyDiff = diff && diff !== "gemischt" ? diff : null;
  if (topic === "laender") {
    const avoid = recentSet("laender");
    const src = onlyDiff ? COUNTRIES.filter(c => c.difficulty === onlyDiff) : COUNTRIES;
    const picked = balancedPick(src, total, avoid);
    const qs = picked.map(c => generateQuestion(c, COUNTRIES, allowedTypes));
    rememberQuestions("laender", qs, src.length);
    return qs;
  }
  if (topic === "mix") {
    return buildMixRound(total, onlyDiff);
  }
  // Generic topic
  let pool = TOPIC_QUESTIONS[topic] || [];
  if (onlyDiff) pool = pool.filter(it => it.difficulty === onlyDiff);
  const avoid = recentSet(topic);
  const picked = balancedPickTopic(pool, total, avoid);
  const qs = picked.map(item => makeTopicQuestion(item, topic));
  rememberQuestions(topic, qs, pool.length);
  return qs;
}

// balancedPick variant for raw topic items (identity = .q)
function balancedPickTopic(items, total, avoidKeys) {
  const avoid = avoidKeys instanceof Set ? avoidKeys : new Set();
  const split = diff => {
    const all = items.filter(c => c.difficulty === diff);
    const fresh = shuffle(all.filter(c => !avoid.has(c.q)));
    const used = shuffle(all.filter(c => avoid.has(c.q)));
    return fresh.concat(used);
  };
  const byDiff = { einfach: split("einfach"), mittel: split("mittel"), schwer: split("schwer") };
  const easy = Math.round(total * 0.2);
  const medium = Math.round(total * 0.4);
  const hard = total - easy - medium;
  const counts = { einfach: easy, mittel: medium, schwer: hard };
  const order = [];
  const usedKeys = new Set();
  Object.entries(counts).forEach(([diff, n]) => {
    const list = byDiff[diff];
    let taken = 0;
    for (let i = 0; i < list.length && taken < n; i++) {
      if (!usedKeys.has(list[i].q)) { order.push(list[i]); usedKeys.add(list[i].q); taken++; }
    }
  });
  if (order.length < total) {
    const everything = shuffle(items);
    for (let i = 0; i < everything.length && order.length < total; i++) {
      if (!usedKeys.has(everything[i].q)) { order.push(everything[i]); usedKeys.add(everything[i].q); }
    }
  }
  return shuffle(order);
}

// Mix: questions drawn from all topics (incl. Länder), balanced by difficulty
function buildMixRound(total, onlyDiff) {
  const pool = [];
  Object.keys(TOPIC_QUESTIONS).forEach(tid => {
    TOPIC_QUESTIONS[tid].forEach(item => {
      if (!onlyDiff || item.difficulty === onlyDiff) pool.push({ kind: "topic", tid, item, difficulty: item.difficulty });
    });
  });
  COUNTRIES.forEach(c => {
    if (!onlyDiff || c.difficulty === onlyDiff) pool.push({ kind: "land", c, difficulty: c.difficulty });
  });
  const keyFn = e => e.kind === "land" ? "L:" + e.c.name : "Q:" + e.item.q;
  const avoid = recentSet("mix");
  const picked = balancedPick(pool, total, avoid, keyFn);
  const qs = picked.map(entry =>
    entry.kind === "land"
      ? generateQuestion(entry.c, COUNTRIES, ["flag", "capital", "continent"])
      : makeTopicQuestion(entry.item, entry.tid)
  );
  rememberQuestions("mix", qs, pool.length);
  return qs;
}

// Daily challenge: deterministic 10 questions from the mix pool, same for everyone today
function buildDailyRound(total) {
  const rng = makeRng(dailySeed());
  const pool = [];
  Object.keys(TOPIC_QUESTIONS).forEach(tid => {
    TOPIC_QUESTIONS[tid].forEach(item => {
      if (item.difficulty !== "einfach") pool.push({ kind: "topic", tid, item });
    });
  });
  COUNTRIES.forEach(c => {
    if (c.difficulty !== "einfach") pool.push({ kind: "land", c });
  });
  const picked = shuffleWith(pool, rng).slice(0, total);
  return picked.map(entry => {
    if (entry.kind === "land") {
      const types = ["flag", "capital", "continent"];
      const type = types[Math.floor(rng() * types.length)];
      return generateQuestion(entry.c, COUNTRIES, [type]);
    }
    return makeTopicQuestion(entry.item, entry.tid);
  });
}

const DAILY_QUESTIONS = 15;       // Daily ist länger als normale Runden
const DAILY_BONUS = 2;            // Punkte werden im Daily verdoppelt

const TOTAL_QUESTIONS = 10;
const XP_PER_LEVEL = 300;

const TIME_MODES = [
  { id: "entspannt", label: "Entspannt", desc: "Kein Zeitlimit", icon: "🌿", seconds: 0 },
  { id: "locker", label: "Locker", desc: "20 Sekunden", icon: "🙂", seconds: 20 },
  { id: "normal", label: "Normal", desc: "15 Sekunden", icon: "⏱️", seconds: 15 },
  { id: "schnell", label: "Schnell", desc: "10 Sekunden", icon: "⚡", seconds: 10 },
];

// Schwierigkeitsstufen zur Auswahl. "gemischt" = alle (wie bisher).
const DIFFICULTY_LEVELS = [
  { id: "gemischt", label: "Gemischt", icon: "🎲" },
  { id: "einfach", label: "Einfach", icon: "🟢" },
  { id: "mittel", label: "Mittel", icon: "🟡" },
  { id: "schwer", label: "Schwer", icon: "🔴" },
];

// ── Online-Rangliste (Supabase) ───────────────────────────────
// Trage hier deine zwei Supabase-Werte ein, dann ist die Rangliste live.
// Anleitung bekommst du von Claude. Solange leer, zeigt die App einen Hinweis.
const SUPABASE_URL = "";      // z.B. "https://abcdxyz.supabase.co"
const SUPABASE_KEY = "";      // der "anon public" Key
const LEADERBOARD_ENABLED = SUPABASE_URL !== "" && SUPABASE_KEY !== "";

async function fetchLeaderboard() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/scores?select=name,score,topic,created_at&order=score.desc&limit=20`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) throw new Error("Rangliste konnte nicht geladen werden.");
  return res.json();
}

async function submitScore(name, score, topic) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name: name.slice(0, 20), score, topic }),
  });
  if (!res.ok) throw new Error("Eintrag konnte nicht gespeichert werden.");
}

// ── App-Version & lokaler Speicher ────────────────────────────
const APP_VERSION = "2.3"; // bei neuen Updates hochzählen, dann erscheint "Was ist neu?"

const store = {
  get(key, fallback) {
    try {
      const v = window.localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Speicher nicht verfügbar (z.B. Vorschau) – einfach ignorieren
    }
  },
};

export default function LaenderDuell() {
  const [screen, setScreen] = useState("home"); // home | topics | game | result
  const [selectedTopic, setSelectedTopic] = useState("laender");
  const [timeMode, setTimeMode] = useState("normal");
  const [difficulty, setDifficulty] = useState("gemischt");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [history, setHistory] = useState([]);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [pointsGained, setPointsGained] = useState(0);
  const [confirmQuit, setConfirmQuit] = useState(false);

  // Game mode: "solo" | "daily" | "duel"
  const [gameMode, setGameMode] = useState("solo");
  // Jokers (per round)
  const [fiftyUsed, setFiftyUsed] = useState(false);
  const [skipUsed, setSkipUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState([]); // options removed by 50:50
  // Duel
  const [duelPlayer, setDuelPlayer] = useState(1);        // 1 or 2
  const [duelScores, setDuelScores] = useState({ 1: 0, 2: 0 });
  const [duelPoints, setDuelPoints] = useState({ 1: 0, 2: 0 });
  // Theme-force joker: each player may force a topic on the opponent once
  const [forceUsed, setForceUsed] = useState({ 1: false, 2: false });
  const [forcedTopic, setForcedTopic] = useState(null);   // topic forced onto NEXT player's question
  const [showForcePicker, setShowForcePicker] = useState(false);

  // Leaderboard
  const [lbEntries, setLbEntries] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [lbError, setLbError] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Persistent progress (saved to device storage)
  const [highscore, setHighscore] = useState(() => store.get("qd_highscore", 0));
  const [totalXp, setTotalXp] = useState(() => store.get("qd_totalXp", 0));
  const [gamesPlayed, setGamesPlayed] = useState(() => store.get("qd_gamesPlayed", 0));

  // "Was ist neu?" – show once per new version
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  // Daily challenge: remember the last completed day + its score
  const [dailyDone, setDailyDone] = useState(() => store.get("qd_dailyDone", { day: 0, score: 0 }));
  const [dailyStreak, setDailyStreak] = useState(() => store.get("qd_dailyStreak", 0));

  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const xpInLevel = totalXp % XP_PER_LEVEL;
  const timeModeMeta = TIME_MODES.find(m => m.id === timeMode) || TIME_MODES[2];
  const roundSeconds = timeModeMeta.seconds; // 0 = no timer
  const timed = roundSeconds > 0;
  const todaySeed = dailySeed();
  const dailyPlayedToday = dailyDone.day === todaySeed;
  const roundTotal = questions.length || TOTAL_QUESTIONS;
  // Streak is only "alive" if the last played day was today or yesterday
  const streakAlive = dailyDone.day === todaySeed || dailyDone.day === yesterdaySeed();
  const shownStreak = streakAlive ? dailyStreak : 0;

  // Save progress whenever it changes
  useEffect(() => { store.set("qd_highscore", highscore); }, [highscore]);
  useEffect(() => { store.set("qd_totalXp", totalXp); }, [totalXp]);
  useEffect(() => { store.set("qd_gamesPlayed", gamesPlayed); }, [gamesPlayed]);

  // Show "Was ist neu?" once after a version update
  useEffect(() => {
    const seen = store.get("qd_seenVersion", null);
    if (seen !== APP_VERSION) {
      setShowWhatsNew(true);
    }
  }, []);

  const dismissWhatsNew = () => {
    store.set("qd_seenVersion", APP_VERSION);
    setShowWhatsNew(false);
  };

  // Reset all per-round state and jokers
  const resetRoundState = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setPoints(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(false);
    setHistory([]);
    setTimeLeft(roundSeconds);
    setPointsGained(0);
    setConfirmQuit(false);
    setFiftyUsed(false);
    setSkipUsed(false);
    setHiddenOptions([]);
    setDuelPlayer(1);
    setDuelScores({ 1: 0, 2: 0 });
    setDuelPoints({ 1: 0, 2: 0 });
    setForceUsed({ 1: false, 2: false });
    setForcedTopic(null);
    setShowForcePicker(false);
    setSubmitted(false);
  };

  // Choose topic and start immediately (solo)
  const chooseTopic = (topicId) => {
    setSelectedTopic(topicId);
    setGameMode("solo");
    const qs = buildRound(TOTAL_QUESTIONS, topicId, ["flag", "capital", "continent"], difficulty);
    setQuestions(qs);
    resetRoundState();
    setScreen("game");
  };

  // Start the daily challenge
  const startDaily = () => {
    if (dailyPlayedToday) return; // schon heute gespielt
    setSelectedTopic("mix");
    setGameMode("daily");
    setQuestions(buildDailyRound(DAILY_QUESTIONS));
    resetRoundState();
    setScreen("game");
  };

  // Start a duel (two players, mix questions)
  const startDuel = () => {
    setSelectedTopic("mix");
    setGameMode("duel");
    setQuestions(buildMixRound(TOTAL_QUESTIONS, difficulty !== "gemischt" ? difficulty : null));
    resetRoundState();
    setScreen("game");
  };

  // Countdown timer per question (skipped in relaxed mode)
  useEffect(() => {
    if (!timed || screen !== "game" || answered || confirmQuit) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const t = setTimeout(() => setTimeLeft(tl => tl - 0.1), 100);
    return () => clearTimeout(t);
  }, [timed, screen, answered, timeLeft, confirmQuit]);

  const handleTimeout = () => {
    if (answered) return;
    setAnswered(true);
    setSelected("__timeout__");
    setStreak(0);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    const q = questions[current];
    setHistory(h => [...h, { question: q.question, correct: false, answer: q.answer, selected: "Zeit abgelaufen" }]);
  };

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    const q = questions[current];
    const correct = option === q.answer;
    if (correct) {
      const diffMult = DIFFICULTY_META[q.difficulty]?.mult || 1;
      const timeBonus = timed ? Math.round((timeLeft / roundSeconds) * 20) : 0;
      const streakBonus = gameMode === "duel" ? 0 : Math.min(streak, 5) * 5;
      const dailyMult = gameMode === "daily" ? DAILY_BONUS : 1;
      const gained = Math.round((20 + timeBonus + streakBonus) * diffMult * dailyMult);
      setPointsGained(gained);
      if (gameMode === "duel") {
        setDuelPoints(p => ({ ...p, [duelPlayer]: p[duelPlayer] + gained }));
        setDuelScores(s => ({ ...s, [duelPlayer]: s[duelPlayer] + 1 }));
      } else {
        setPoints(p => p + gained);
        setScore(s => s + 1);
        setStreak(s => {
          const nx = s + 1;
          setBestStreak(b => Math.max(b, nx));
          return nx;
        });
      }
    } else {
      setPointsGained(0);
      if (gameMode !== "duel") {
        setStreak(0);
      }
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setHistory(h => [...h, { question: q.question, correct, answer: q.answer, selected: option }]);
  };

  // 50:50 — remove two wrong options
  const useFifty = () => {
    if (fiftyUsed || answered) return;
    const q = questions[current];
    const wrong = q.options.filter(o => o !== q.answer);
    const toHide = shuffle(wrong).slice(0, 2);
    setHiddenOptions(toHide);
    setFiftyUsed(true);
  };

  // Skip — move to next question without scoring (counts as not answered)
  const useSkip = () => {
    if (skipUsed || answered) return;
    setSkipUsed(true);
    const q = questions[current];
    setHistory(h => [...h, { question: q.question, correct: false, answer: q.answer, selected: "Übersprungen" }]);
    goNext();
  };

  // Advance to next question or finish (shared by next button, skip, duel)
  const goNext = () => {
    if (current + 1 >= roundTotal) {
      if (gameMode === "solo") {
        setHighscore(h => Math.max(h, points));
        setTotalXp(xp => xp + points);
        setGamesPlayed(g => g + 1);
      } else if (gameMode === "daily") {
        setHighscore(h => Math.max(h, points));
        setTotalXp(xp => xp + points);
        setGamesPlayed(g => g + 1);
        const record = { day: todaySeed, score: points };
        setDailyDone(record);
        store.set("qd_dailyDone", record);
        // Streak: +1 if yesterday was played, otherwise reset to 1
        const newStreak = dailyDone.day === yesterdaySeed() ? dailyStreak + 1 : 1;
        setDailyStreak(newStreak);
        store.set("qd_dailyStreak", newStreak);
      }
      setSubmitted(false);
      setScreen("result");
    } else {
      const nextIdx = current + 1;
      // In a duel, if the current player forced a topic, swap the opponent's next question
      if (gameMode === "duel" && forcedTopic) {
        const forced = buildRound(1, forcedTopic, ["flag", "capital", "continent"], "schwer")[0];
        if (forced) {
          forced.forced = forcedTopic; // mark so the victim sees the badge
          setQuestions(qs => qs.map((q, i) => (i === nextIdx ? forced : q)));
        }
        setForcedTopic(null);
      }
      setCurrent(nextIdx);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(roundSeconds);
      setPointsGained(0);
      setHiddenOptions([]);
      if (gameMode === "duel") {
        setDuelPlayer(p => (p === 1 ? 2 : 1));
      }
    }
  };

  const next = () => goNext();

  // Duel: current player forces a topic onto the opponent's next question
  const forceTopicOnOpponent = (topicId) => {
    setForcedTopic(topicId);
    setForceUsed(u => ({ ...u, [duelPlayer]: true }));
    setShowForcePicker(false);
  };

  const openLeaderboard = async () => {
    setScreen("leaderboard");
    if (!LEADERBOARD_ENABLED) return;
    setLbLoading(true);
    setLbError("");
    try {
      const data = await fetchLeaderboard();
      setLbEntries(data);
    } catch (e) {
      setLbError(e.message || "Fehler beim Laden.");
    } finally {
      setLbLoading(false);
    }
  };

  const handleSubmitScore = async () => {
    if (!playerName.trim() || submitting) return;
    setSubmitting(true);
    setLbError("");
    try {
      await submitScore(playerName.trim(), points, topicMeta.label);
      setSubmitted(true);
    } catch (e) {
      setLbError(e.message || "Fehler beim Speichern.");
    } finally {
      setSubmitting(false);
    }
  };

  const q = questions[current];

  const medal = score >= 9 ? "🥇" : score >= 7 ? "🥈" : score >= 5 ? "🥉" : "🎯";
  const remark = score >= 9 ? "Weltklasse! Fast alles richtig!" : score >= 7 ? "Stark! Du kennst dich wirklich gut aus." : score >= 5 ? "Solide! Mit etwas Übung wird's noch besser." : "Bleib dran – Übung macht den Meister!";
  const topicMeta = TOPICS.find(t => t.id === selectedTopic) || TOPICS[0];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027 0%, #1a3a4a 50%, #0f2027 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e8f4f8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    }}>

      {/* WAS IST NEU? */}
      {showWhatsNew && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(8,18,24,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}>
          <div style={{
            background: "#13252e",
            border: "1px solid rgba(100,216,255,0.2)",
            borderRadius: 22,
            padding: "26px 22px",
            maxWidth: 380, width: "100%",
            maxHeight: "85vh", overflowY: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
              <h2 style={{
                margin: 0, fontSize: 22, fontWeight: 800,
                background: "linear-gradient(90deg, #64d8ff, #a78bfa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Was ist neu?</h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6a9aaa" }}>Version {APP_VERSION}</p>
            </div>

            {[
              { icon: "🎲", title: "Bunter Mix", text: "Fragen aus allen Themen wild gemischt." },
              { icon: "📅", title: "Tägliche Challenge", text: "Jeden Tag 10 Fragen – für alle gleich. Vergleicht euch!" },
              { icon: "⚔️", title: "Duell zu zweit", text: "Tretet am selben Gerät gegeneinander an." },
              { icon: "🃏", title: "Joker", text: "50:50 und Überspringen helfen bei kniffligen Fragen." },
              { icon: "📚", title: "Über 570 neue Fragen", text: "Jedes Thema hat jetzt rund 100 Fragen – kaum noch Wiederholungen." },
              { icon: "🔥", title: "Tägliche Challenge neu", text: "15 knifflige Fragen, doppelte Punkte und eine Tagesstreak." },
              { icon: "🎯", title: "Schwierigkeit & Duell-Joker", text: "Wähle die Schwierigkeit – und zwinge dem Gegner im Duell ein schweres Thema auf." },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ fontSize: 24, lineHeight: 1.2 }}>{f.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#e8f4f8" }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: "#94c8d8", lineHeight: 1.4 }}>{f.text}</div>
                </div>
              </div>
            ))}

            <button onClick={dismissWhatsNew} style={{
              width: "100%", marginTop: 8, padding: "14px",
              fontSize: 16, fontWeight: 700,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#fff", border: "none", borderRadius: 14, cursor: "pointer",
            }}>Los geht's! 🚀</button>
          </div>
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <div style={{ textAlign: "center", maxWidth: 380, width: "100%" }}>
          <div style={{ fontSize: 72, marginBottom: 8, filter: "drop-shadow(0 0 24px rgba(100,200,255,0.4))" }}>🧠</div>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 6px",
            background: "linear-gradient(90deg, #64d8ff, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}>Quiz-Duell</h1>
          <p style={{ color: "#94c8d8", fontSize: 15, margin: "0 0 32px", lineHeight: 1.5 }}>
            7 Themenwelten, je 10 Fragen –<br />wie viel weißt du wirklich?
          </p>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            {TOPICS.slice(0, 4).map(t => (
              <span key={t.id} style={{
                background: "rgba(100,216,255,0.1)",
                border: "1px solid rgba(100,216,255,0.25)",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 13,
                color: "#64d8ff",
              }}>{t.icon} {t.label.split(" ")[0]}</span>
            ))}
            <span style={{
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.25)",
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 13,
              color: "#a78bfa",
            }}>+3 mehr</span>
          </div>

          {/* Level + Highscore */}
          {gamesPlayed > 0 && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "16px",
              marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa" }}>⭐ Level {level}</span>
                <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 600 }}>🏆 Highscore: {highscore}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${(xpInLevel / XP_PER_LEVEL) * 100}%`,
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                  borderRadius: 4,
                  transition: "width 0.5s ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#6a9aaa", marginTop: 6, textAlign: "right" }}>{xpInLevel} / {XP_PER_LEVEL} XP bis Level {level + 1}</div>
            </div>
          )}

          {/* Time mode selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#7aa8b8", marginBottom: 8, textAlign: "left", fontWeight: 600 }}>⏱️ Zeit pro Frage</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {TIME_MODES.map(m => {
                const active = timeMode === m.id;
                return (
                  <button key={m.id} onClick={() => setTimeMode(m.id)} style={{
                    padding: "10px 8px",
                    background: active ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.04)",
                    border: active ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 18, lineHeight: 1, marginBottom: 3 }}>{m.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: active ? "#e8f4f8" : "#94c8d8" }}>{m.label}</div>
                    <div style={{ fontSize: 10, color: "#6a9aaa", marginTop: 1 }}>{m.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#7aa8b8", marginBottom: 8, textAlign: "left", fontWeight: 600 }}>🎯 Schwierigkeit</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
              {DIFFICULTY_LEVELS.map(lvl => {
                const active = difficulty === lvl.id;
                return (
                  <button key={lvl.id} onClick={() => setDifficulty(lvl.id)} style={{
                    padding: "10px 4px",
                    background: active ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.04)",
                    border: active ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 16, lineHeight: 1, marginBottom: 3 }}>{lvl.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: active ? "#e8f4f8" : "#94c8d8" }}>{lvl.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={() => setScreen("topics")} style={{
            width: "100%",
            padding: "16px",
            fontSize: 18,
            fontWeight: 700,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
            transition: "transform 0.1s",
          }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {gamesPlayed > 0 ? "Weiterspielen" : "Spielen"} →
          </button>

          {shownStreak > 0 && (
            <div style={{
              marginTop: 14, marginBottom: -2, textAlign: "center",
              fontSize: 13, fontWeight: 700, color: "#fb923c",
            }}>🔥 {shownStreak} {shownStreak === 1 ? "Tag" : "Tage"} in Folge!</div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button
              onClick={startDaily}
              disabled={dailyPlayedToday}
              style={{
                flex: 1, padding: "13px 8px", fontSize: 14, fontWeight: 700,
                background: dailyPlayedToday ? "rgba(16,185,129,0.15)" : "linear-gradient(135deg, #10b981, #059669)",
                color: dailyPlayedToday ? "#6ee7b7" : "#fff",
                border: dailyPlayedToday ? "1px solid rgba(16,185,129,0.4)" : "none",
                borderRadius: 14, cursor: dailyPlayedToday ? "default" : "pointer",
                lineHeight: 1.3,
              }}>
              {dailyPlayedToday
                ? <>✓ Heute erledigt<br/><span style={{ fontSize: 12, fontWeight: 600 }}>{dailyDone.score} 💎</span></>
                : <>📅 Tägliche Challenge<br/><span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>15 Fragen · ×2 Punkte</span></>}
            </button>
            <button onClick={startDuel} style={{
              flex: 1, padding: "13px 8px", fontSize: 14, fontWeight: 700,
              background: "linear-gradient(135deg, #f43f5e, #e11d48)",
              color: "#fff", border: "none", borderRadius: 14, cursor: "pointer",
              lineHeight: 1.3,
            }}>⚔️ Duell<br/><span style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>2 Spieler</span></button>
          </div>

          <button onClick={openLeaderboard} style={{
            width: "100%",
            marginTop: 10,
            padding: "13px",
            fontSize: 15,
            fontWeight: 600,
            background: "rgba(255,255,255,0.05)",
            color: "#fbbf24",
            border: "1px solid rgba(251,191,36,0.3)",
            borderRadius: 14,
            cursor: "pointer",
          }}>🏆 Rangliste</button>
        </div>
      )}

      {/* TOPICS */}
      {screen === "topics" && (
        <div style={{ textAlign: "center", maxWidth: 440, width: "100%" }}>
          <div style={{ fontSize: 44, marginBottom: 6 }}>🗂️</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 6px", color: "#e8f4f8" }}>Thema wählen</h2>
          <p style={{ color: "#94c8d8", fontSize: 14, margin: "0 0 24px" }}>Worüber willst du raten?</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {TOPICS.map(topic => (
              <button key={topic.id} onClick={() => chooseTopic(topic.id)} style={{
                width: "100%",
                padding: "16px 18px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                textAlign: "left",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <span style={{ fontSize: 32, lineHeight: 1 }}>{topic.icon}</span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: "#e8f4f8" }}>{topic.label}</span>
                  <span style={{ display: "block", fontSize: 13, color: "#7aa8b8", marginTop: 2 }}>{topic.desc}</span>
                </span>
                <span style={{ fontSize: 20, color: "#64d8ff" }}>›</span>
              </button>
            ))}
          </div>

          <button onClick={() => setScreen("home")} style={{
            background: "none", border: "none", color: "#6a9aaa", fontSize: 14, cursor: "pointer",
          }}>← Zurück</button>
        </div>
      )}

      {/* GAME */}
      {screen === "game" && q && (
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() => setConfirmQuit(true)}
                aria-label="Zurück zum Menü"
                style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#94c8d8", fontSize: 16, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 0, lineHeight: 1,
                }}
              >←</button>
              <div style={{ fontSize: 13, color: "#64d8ff", fontWeight: 600 }}>
                {topicMeta.icon} {current + 1} / {roundTotal}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {gameMode === "duel" ? (
                <span style={{
                  background: duelPlayer === 1 ? "rgba(244,63,94,0.18)" : "rgba(59,130,246,0.18)",
                  border: "1px solid " + (duelPlayer === 1 ? "rgba(244,63,94,0.5)" : "rgba(59,130,246,0.5)"),
                  borderRadius: 12, padding: "3px 12px", fontSize: 13, fontWeight: 700,
                  color: duelPlayer === 1 ? "#fda4af" : "#93c5fd",
                }}>👤 Spieler {duelPlayer}</span>
              ) : (
                <>
                  {streak >= 2 && (
                    <span style={{
                      background: "rgba(251,191,36,0.15)",
                      border: "1px solid rgba(251,191,36,0.4)",
                      borderRadius: 12,
                      padding: "2px 10px",
                      fontSize: 13,
                      color: "#fbbf24",
                    }}>🔥 {streak}er Serie</span>
                  )}
                  <span style={{
                    background: "rgba(100,216,255,0.1)",
                    border: "1px solid rgba(100,216,255,0.2)",
                    borderRadius: 12,
                    padding: "2px 10px",
                    fontSize: 13,
                    color: "#64d8ff",
                  }}>💎 {points}</span>
                </>
              )}
            </div>
          </div>

          {/* Duel scoreboard */}
          {gameMode === "duel" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <div style={{
                flex: 1, textAlign: "center", padding: "8px", borderRadius: 12,
                background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.3)",
                opacity: duelPlayer === 1 ? 1 : 0.55,
              }}>
                <div style={{ fontSize: 11, color: "#fda4af", fontWeight: 600 }}>Spieler 1</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{duelPoints[1]} 💎</div>
              </div>
              <div style={{
                flex: 1, textAlign: "center", padding: "8px", borderRadius: 12,
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
                opacity: duelPlayer === 2 ? 1 : 0.55,
              }}>
                <div style={{ fontSize: 11, color: "#93c5fd", fontWeight: 600 }}>Spieler 2</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{duelPoints[2]} 💎</div>
              </div>
            </div>
          )}

          {/* Timer bar (only in timed modes) */}
          {timed ? (
            <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 4, marginBottom: 10, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${(timeLeft / roundSeconds) * 100}%`,
                background: timeLeft > roundSeconds * 0.4 ? "linear-gradient(90deg, #22c55e, #4ade80)" : timeLeft > roundSeconds * 0.2 ? "linear-gradient(90deg, #fbbf24, #f59e0b)" : "linear-gradient(90deg, #ef4444, #f87171)",
                borderRadius: 4,
                transition: answered ? "none" : "width 0.1s linear",
              }} />
            </div>
          ) : (
            <div style={{ marginBottom: 10, textAlign: "center", fontSize: 12, color: "#7aa8b8" }}>🌿 Entspannt – ohne Zeitdruck</div>
          )}

          {/* Progress bar */}
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, marginBottom: 24, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${((current + 1) / roundTotal) * 100}%`,
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              borderRadius: 4,
              transition: "width 0.4s ease",
            }} />
          </div>

          {/* Question card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "28px 24px",
            marginBottom: 16,
            textAlign: "center",
          }}>
            {q.forced && (
              <div style={{
                display: "inline-block",
                background: "rgba(244,63,94,0.15)",
                border: "1px solid rgba(244,63,94,0.45)",
                color: "#fda4af",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 12,
                marginBottom: 12,
              }}>🎯 {TOPICS.find(t => t.id === q.forced)?.label} erzwungen!</div>
            )}
            <div style={{
              display: "inline-block",
              background: `${DIFFICULTY_META[q.difficulty].color}22`,
              border: `1px solid ${DIFFICULTY_META[q.difficulty].color}66`,
              color: DIFFICULTY_META[q.difficulty].color,
              fontSize: 12,
              fontWeight: 700,
              padding: "3px 12px",
              borderRadius: 12,
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
              {DIFFICULTY_META[q.difficulty].label} · ×{DIFFICULTY_META[q.difficulty].mult}
            </div>
            {q.type === "flag" && q.code ? (
              <img
                src={`https://flagcdn.com/w320/${q.code}.png`}
                alt="Flagge"
                style={{ width: 200, maxWidth: "70%", height: "auto", borderRadius: 8, marginBottom: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
              />
            ) : (
              <div style={{ fontSize: 80, marginBottom: 12, lineHeight: 1 }}>{q.display}</div>
            )}
            <p style={{ fontSize: 17, fontWeight: 600, margin: 0, color: "#c8e8f0", lineHeight: 1.4 }}>{q.question}</p>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: shake ? "shake 0.4s ease" : "none" }}>
            {q.options.map(option => {
              const isCorrect = option === q.answer;
              const isSelected = option === selected;
              const isHidden = hiddenOptions.includes(option);
              let bg = "rgba(255,255,255,0.05)";
              let border = "1px solid rgba(255,255,255,0.1)";
              let color = "#e8f4f8";
              let icon = null;

              if (isHidden && !answered) {
                return (
                  <div key={option} style={{
                    width: "100%", padding: "14px 18px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.08)",
                    borderRadius: 14, opacity: 0.4,
                    color: "#5a7a8a", fontSize: 16, fontStyle: "italic",
                  }}>—</div>
                );
              }

              if (answered) {
                if (isCorrect) {
                  bg = "rgba(34,197,94,0.15)";
                  border = "1px solid rgba(34,197,94,0.5)";
                  color = "#86efac";
                  icon = "✓";
                } else if (isSelected && !isCorrect) {
                  bg = "rgba(239,68,68,0.15)";
                  border = "1px solid rgba(239,68,68,0.5)";
                  color = "#fca5a5";
                  icon = "✗";
                }
              }

              return (
                <button key={option} onClick={() => handleSelect(option)} style={{
                  width: "100%",
                  padding: "14px 18px",
                  background: bg,
                  border,
                  borderRadius: 14,
                  color,
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: answered ? "default" : "pointer",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s",
                }}>
                  {option}
                  {icon && <span style={{ fontWeight: 700, fontSize: 18 }}>{icon}</span>}
                </button>
              );
            })}
          </div>

          {/* Jokers */}
          {!answered && (
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={useFifty} disabled={fiftyUsed} style={{
                flex: 1, padding: "11px", fontSize: 14, fontWeight: 700,
                background: fiftyUsed ? "rgba(255,255,255,0.04)" : "rgba(167,139,250,0.15)",
                border: "1px solid " + (fiftyUsed ? "rgba(255,255,255,0.08)" : "rgba(167,139,250,0.4)"),
                borderRadius: 12, color: fiftyUsed ? "#5a7a8a" : "#c4b5fd",
                cursor: fiftyUsed ? "not-allowed" : "pointer",
              }}>✂️ 50:50</button>
              <button onClick={useSkip} disabled={skipUsed} style={{
                flex: 1, padding: "11px", fontSize: 14, fontWeight: 700,
                background: skipUsed ? "rgba(255,255,255,0.04)" : "rgba(100,216,255,0.12)",
                border: "1px solid " + (skipUsed ? "rgba(255,255,255,0.08)" : "rgba(100,216,255,0.35)"),
                borderRadius: 12, color: skipUsed ? "#5a7a8a" : "#64d8ff",
                cursor: skipUsed ? "not-allowed" : "pointer",
              }}>⏭️ Überspringen</button>
            </div>
          )}

          {/* Fact + Next */}
          {answered && (
            <div style={{ marginTop: 16 }}>
              {pointsGained > 0 && (
                <div style={{
                  textAlign: "center",
                  marginBottom: 12,
                  animation: "pop 0.4s ease",
                }}>
                  <span style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 18,
                    padding: "6px 20px",
                    borderRadius: 20,
                    boxShadow: "0 4px 16px rgba(34,197,94,0.4)",
                  }}>+{pointsGained} 💎{gameMode !== "duel" && streak >= 2 ? `  🔥 ${streak}x Serie!` : ""}</span>
                </div>
              )}
              {selectedTopic === "laender" && (
                <div style={{
                  background: "rgba(167,139,250,0.1)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 14,
                  color: "#c4b5fd",
                  marginBottom: 12,
                }}>💡 {q.fact}</div>
              )}
              {q.funFact && (
                <div style={{
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.3)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 14,
                  color: "#fcd34d",
                  marginBottom: 12,
                  lineHeight: 1.5,
                }}>🤓 <strong>Unnützes Wissen:</strong> {q.funFact}</div>
              )}
              {gameMode === "duel" && current + 1 < roundTotal && !forceUsed[duelPlayer] && (
                <button onClick={() => setShowForcePicker(true)} style={{
                  width: "100%",
                  padding: "13px",
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  background: forcedTopic ? "rgba(244,63,94,0.15)" : "rgba(244,63,94,0.12)",
                  color: "#fda4af",
                  border: "1px solid rgba(244,63,94,0.4)",
                  borderRadius: 14,
                  cursor: "pointer",
                }}>
                  {forcedTopic
                    ? `🎯 ${TOPICS.find(t => t.id === forcedTopic)?.label} für Gegner gewählt!`
                    : "🎯 Thema für Gegner wählen"}
                </button>
              )}
              <button onClick={next} style={{
                width: "100%",
                padding: "14px",
                fontSize: 16,
                fontWeight: 700,
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
              }}>
                {current + 1 >= roundTotal
                  ? "Ergebnis anzeigen →"
                  : gameMode === "duel"
                    ? `Weiter zu Spieler ${duelPlayer === 1 ? 2 : 1} →`
                    : "Weiter →"}
              </button>
            </div>
          )}

          {/* Theme-force picker (duel joker) */}
          {showForcePicker && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(8,18,24,0.85)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
            }}>
              <div style={{
                background: "#13252e",
                border: "1px solid rgba(244,63,94,0.3)",
                borderRadius: 20,
                padding: "24px 20px",
                maxWidth: 380, width: "100%",
                maxHeight: "85vh", overflowY: "auto",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}>
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 36, marginBottom: 4 }}>🎯</div>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#fda4af" }}>Thema für den Gegner</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94c8d8" }}>
                    Spieler {duelPlayer === 1 ? 2 : 1} bekommt eine <strong>schwere</strong> Frage daraus!
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {TOPICS.filter(t => t.id !== "mix").map(t => (
                    <button key={t.id} onClick={() => forceTopicOnOpponent(t.id)} style={{
                      padding: "12px 8px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      cursor: "pointer",
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 22, marginBottom: 3 }}>{t.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#e8f4f8" }}>{t.label}</div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowForcePicker(false)} style={{
                  width: "100%", marginTop: 12, padding: "12px",
                  background: "none", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12, color: "#94c8d8", fontSize: 14, cursor: "pointer",
                }}>Abbrechen</button>
              </div>
            </div>
          )}

          {/* Quit confirmation */}
          {confirmQuit && (
            <div style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(8,18,24,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
            }}>
              <div style={{
                background: "#13252e",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "26px 22px",
                maxWidth: 340, width: "100%",
                textAlign: "center",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🚪</div>
                <h3 style={{ margin: "0 0 6px", fontSize: 19, fontWeight: 800, color: "#e8f4f8" }}>Spiel verlassen?</h3>
                <p style={{ margin: "0 0 22px", fontSize: 14, color: "#94c8d8", lineHeight: 1.5 }}>
                  Dein aktueller Punktestand in dieser Runde geht verloren.
                </p>
                <button onClick={() => { setConfirmQuit(false); setScreen("home"); }} style={{
                  width: "100%", padding: "14px", fontSize: 16, fontWeight: 700,
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#fff", border: "none", borderRadius: 14, cursor: "pointer",
                  marginBottom: 10,
                }}>Ja, zum Hauptmenü</button>
                <button onClick={() => setConfirmQuit(false)} style={{
                  width: "100%", padding: "13px", fontSize: 15, fontWeight: 600,
                  background: "rgba(255,255,255,0.06)", color: "#94c8d8",
                  border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, cursor: "pointer",
                }}>Weiterspielen</button>
              </div>
            </div>
          )}
        </div>
      )}
      {screen === "result" && (
        <div style={{ textAlign: "center", maxWidth: 400, width: "100%" }}>
          {gameMode === "duel" ? (
            <>
              {(() => {
                const p1 = duelPoints[1], p2 = duelPoints[2];
                const winner = p1 === p2 ? 0 : (p1 > p2 ? 1 : 2);
                return (
                  <>
                    <div style={{ fontSize: 64, marginBottom: 8 }}>{winner === 0 ? "🤝" : "🏆"}</div>
                    <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", color: "#e8f4f8" }}>
                      {winner === 0 ? "Unentschieden!" : `Spieler ${winner} gewinnt!`}
                    </h2>
                    <p style={{ color: "#94c8d8", fontSize: 14, margin: "0 0 24px" }}>
                      {winner === 0 ? "Beide gleichauf – Rückkampf?" : "Glückwunsch zum Sieg!"}
                    </p>
                    <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                      <div style={{
                        flex: 1, padding: "16px 8px", borderRadius: 16,
                        background: "rgba(244,63,94,0.1)",
                        border: "2px solid " + (winner === 1 ? "#f43f5e" : "rgba(244,63,94,0.25)"),
                      }}>
                        <div style={{ fontSize: 13, color: "#fda4af", fontWeight: 700, marginBottom: 4 }}>Spieler 1 {winner === 1 ? "👑" : ""}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{p1}</div>
                        <div style={{ fontSize: 11, color: "#94c8d8", marginTop: 2 }}>{duelScores[1]}/{roundTotal} richtig</div>
                      </div>
                      <div style={{
                        flex: 1, padding: "16px 8px", borderRadius: 16,
                        background: "rgba(59,130,246,0.1)",
                        border: "2px solid " + (winner === 2 ? "#3b82f6" : "rgba(59,130,246,0.25)"),
                      }}>
                        <div style={{ fontSize: 13, color: "#93c5fd", fontWeight: 700, marginBottom: 4 }}>Spieler 2 {winner === 2 ? "👑" : ""}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{p2}</div>
                        <div style={{ fontSize: 11, color: "#94c8d8", marginTop: 2 }}>{duelScores[2]}/{roundTotal} richtig</div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
          <>
          <div style={{ fontSize: 72, marginBottom: 12 }}>{medal}</div>

          {gameMode === "daily" && (
            <div style={{
              display: "inline-block",
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.4)",
              color: "#6ee7b7", fontWeight: 700, fontSize: 13,
              padding: "4px 16px", borderRadius: 20, marginBottom: 12,
            }}>📅 Tägliche Challenge{dailyStreak > 0 ? `  ·  🔥 ${dailyStreak} ${dailyStreak === 1 ? "Tag" : "Tage"}` : ""}</div>
          )}

          {points >= highscore && points > 0 && (
            <div style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              color: "#1a1a1a",
              fontWeight: 800,
              fontSize: 13,
              padding: "4px 16px",
              borderRadius: 20,
              marginBottom: 12,
              marginLeft: 8,
              animation: "pop 0.5s ease",
            }}>🏆 NEUER HIGHSCORE!</div>
          )}

          <div style={{
            fontSize: 44,
            fontWeight: 800,
            margin: "0 0 4px",
            background: "linear-gradient(90deg, #64d8ff, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>{points} 💎</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", color: "#c8e8f0" }}>
            {score} / {roundTotal} richtig
          </h2>
          <p style={{ color: "#94c8d8", fontSize: 15, margin: "0 0 28px" }}>{remark}</p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
            {[
              { label: "Richtig", value: score, color: "#22c55e" },
              { label: "Beste Serie", value: `🔥${bestStreak}`, color: "#fbbf24" },
              { label: "Level", value: `⭐${level}`, color: "#a78bfa" },
            ].map(stat => (
              <div key={stat.label} style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "14px 8px",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#6a9aaa", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* History */}
          <div style={{ textAlign: "left", marginBottom: 24 }}>
            {history.map((h, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontSize: 13,
              }}>
                <span style={{ fontSize: 16 }}>{h.correct ? "✅" : "❌"}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#c8e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.question}</div>
                  {!h.correct && <div style={{ color: "#86efac", fontSize: 12 }}>✓ {h.answer}</div>}
                </div>
              </div>
            ))}
          </div>
          </>
          )}

          {/* Leaderboard submission (not in duel) */}
          {gameMode !== "duel" && LEADERBOARD_ENABLED && (
            <div style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.25)",
              borderRadius: 16,
              padding: "16px",
              marginBottom: 16,
            }}>
              {submitted ? (
                <div style={{ textAlign: "center", color: "#fcd34d", fontSize: 14, fontWeight: 600 }}>
                  ✅ In der Rangliste eingetragen!
                  <button onClick={openLeaderboard} style={{
                    display: "block", margin: "10px auto 0", padding: "8px 16px",
                    background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.4)",
                    borderRadius: 10, color: "#fbbf24", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}>🏆 Rangliste ansehen</button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 13, color: "#fcd34d", marginBottom: 8, fontWeight: 600, textAlign: "center" }}>
                    🏆 Trag dich in die Rangliste ein
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      value={playerName}
                      onChange={e => setPlayerName(e.target.value)}
                      placeholder="Dein Name"
                      maxLength={20}
                      style={{
                        flex: 1, padding: "11px 14px", fontSize: 15,
                        background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 12, color: "#e8f4f8", outline: "none",
                      }}
                    />
                    <button
                      onClick={handleSubmitScore}
                      disabled={!playerName.trim() || submitting}
                      style={{
                        padding: "11px 18px", fontSize: 15, fontWeight: 700,
                        background: !playerName.trim() || submitting ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #fbbf24, #f59e0b)",
                        color: !playerName.trim() || submitting ? "#5a7a8a" : "#1a1a1a",
                        border: "none", borderRadius: 12,
                        cursor: !playerName.trim() || submitting ? "not-allowed" : "pointer",
                      }}
                    >{submitting ? "…" : "Senden"}</button>
                  </div>
                  {lbError && <div style={{ fontSize: 12, color: "#fca5a5", marginTop: 8, textAlign: "center" }}>{lbError}</div>}
                </div>
              )}
            </div>
          )}

          {gameMode !== "daily" && (
            <button onClick={() => {
              if (gameMode === "duel") startDuel();
              else chooseTopic(selectedTopic);
            }} style={{
              width: "100%",
              padding: "16px",
              fontSize: 17,
              fontWeight: 700,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#fff",
              border: "none",
              borderRadius: 16,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
            }}>
              {gameMode === "duel" ? "⚔️ Neues Duell" : `🔄 Nochmal: ${topicMeta.label}`}
            </button>
          )}
          {gameMode === "daily" && (
            <div style={{
              padding: "14px", marginBottom: 4, textAlign: "center",
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
              borderRadius: 14, color: "#6ee7b7", fontSize: 14, fontWeight: 600,
            }}>✓ Heutige Challenge geschafft – morgen gibt es neue Fragen!</div>
          )}
          <button onClick={() => setScreen("home")} style={{
            width: "100%",
            marginTop: 10,
            padding: "14px",
            fontSize: 15,
            fontWeight: 600,
            background: "rgba(255,255,255,0.05)",
            color: "#94c8d8",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14,
            cursor: "pointer",
          }}>
            🏠 Hauptmenü
          </button>
        </div>
      )}

      {/* LEADERBOARD */}
      {screen === "leaderboard" && (
        <div style={{ textAlign: "center", maxWidth: 440, width: "100%" }}>
          <div style={{ fontSize: 48, marginBottom: 6 }}>🏆</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 6px", color: "#e8f4f8" }}>Rangliste</h2>
          <p style={{ color: "#94c8d8", fontSize: 14, margin: "0 0 24px" }}>Die besten 20 Ergebnisse weltweit</p>

          {!LEADERBOARD_ENABLED ? (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "24px 20px",
              marginBottom: 20,
              color: "#94c8d8",
              fontSize: 14,
              lineHeight: 1.6,
            }}>
              🔧 Die Online-Rangliste wird noch eingerichtet.<br />
              Sobald der kostenlose Speicher verbunden ist, erscheinen hier die Bestenlisten aller Spieler.
            </div>
          ) : lbLoading ? (
            <div style={{ padding: "40px 0", color: "#64d8ff", fontSize: 15 }}>Lädt…</div>
          ) : lbError ? (
            <div style={{ padding: "24px", color: "#fca5a5", fontSize: 14 }}>{lbError}</div>
          ) : lbEntries.length === 0 ? (
            <div style={{ padding: "40px 20px", color: "#7aa8b8", fontSize: 14 }}>
              Noch keine Einträge – sei der Erste!
            </div>
          ) : (
            <div style={{ marginBottom: 20 }}>
              {lbEntries.map((e, i) => {
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px",
                    background: i < 3 ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.03)",
                    border: "1px solid " + (i < 3 ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.06)"),
                    borderRadius: 12,
                    marginBottom: 6,
                  }}>
                    <span style={{ fontSize: 16, fontWeight: 700, width: 32, textAlign: "center", color: i < 3 ? "#fbbf24" : "#7aa8b8" }}>{medal}</span>
                    <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#e8f4f8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</div>
                      <div style={{ fontSize: 12, color: "#6a9aaa" }}>{e.topic}</div>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#64d8ff" }}>{e.score} 💎</span>
                  </div>
                );
              })}
            </div>
          )}

          <button onClick={() => setScreen("home")} style={{
            background: "none", border: "none", color: "#6a9aaa", fontSize: 14, cursor: "pointer", marginTop: 8,
          }}>← Zurück zum Menü</button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
