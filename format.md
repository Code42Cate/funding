

# Unser Format

```json
{
	"url": "", //DAAD: <url> | Förderdatenbank: <url> | EU: <url>

	"title": "", //DAAD: <title> | Förderdatenbank: <title> | EU: <metadata["title"]>,

	"targetGroup": "", //DAAD: <Zielgruppe> & <Akademische Voraussetzungen> | Förderdatenbank: <Förderberechtigte> | EU: ?

	"duration": "", //DAAD: <Laufzeit> | Förderdatenbank: - | EU: <metadata["programPeriod"]>

	"description": "", //DAAD: <Stipendienleistung> | Förderdatenbank: <Kurzzusammenfassung> (gekürzt) | EU: <content>

	"issuer": "", //DAAD: <title> (evtl leicht abgeändert) | Förderdatenbank: <Fördergeber> | EU: EU,

	"type": "", <//DAAD: Stipendium | Förderdatenbank: <Förderart> | EU: GPT nach jeweiliger Art des Projekts fragen (geht das?),

	"additionalInformation": "", <//jeweils alle Daten die wir haben, um das an GPT zu geben. Würde einfach jeweils das ganze zugehörige JSON Objekt reinwerfen

	"deadline": "", <//DAAD: <Bewerbungsschluss> | Förderdatenbank: - | EU: metadata["deadlineDate"],
}
```

# DAAD Format

```json
{

"fields": {

"Beschreibung des Programms": "Die Erasmus+ Mobilität von Einzelpersonen fördert Studienaufenthalte und Praktika in 33 sogenannten Erasmus+ Programmländern und weltweit in Erasmus+ Partnerländern.",

"Zielgruppe": "Das Programm richtet sich an Studierende, die an einer deutschen Hochschule regulär immatrikuliert sind,das erste Studienjahr abgeschlossen haben (Graduierte),an einer Hochschule studieren, die am Erasmus+ Programm teilnimmt,UND deren Heimat- und Gasthochschule einen Erasmus-Kooperationsvertrag abgeschlossen haben.",

"Akademische Voraussetzungen": "Die Erasmus+ Mobilität von Einzelpersonen steht Studierenden offen, die an einer Hochschule studieren, am Erasmus+ Programm teilnehmen und das erste Studienjahr abgeschlossen haben.",

"Anzahl der Stipendien": "2020 wurden rund 51.000 Mobilitätsangebote für Teilnehmende aus Deutschand im Rahmen des europäischen Bildungsprogramms Erasmus+ bewilligt.",

"Laufzeit": "Erasmus+ Studien- und Praktikumsaufenthalte können zwischen 2 Monaten und 12 Monaten dauern. Insgesamt können Studierende bis zu 36 Monate für Studium und/oder Praktikum gefördert werden: jeweils in Bachelor-, Master- und Promotion-Studiengängen bis zu 12 Monate,in einzügigen Studiengängen (z. B. Medizin, Staatsexamen, alte Diplom-Studiengänge) bis zu 24 Monate und zusätzlich 12 Monate im Promotionsstudium,Die Förderung kann aufgeteilt und innerhalb eines Studienzyklus auch mehrfach in Anspruch genommen werden (z.B. für zweimal für 6 Monate).",

"Stipendienleistung": "Die Stipendienleistung variiert je nach Zielland und Hochschule. Geförderte werden von Studien-, Registrierungs-, Prüfungs-, Labor- und Bibliotheksgebühren an der Gasthochschule befreit.",

"Formalia": "Für die Teilnahme an der Erasmus+ Mobilität von Einzelpersonen können die Erasmus+ Hochschulkoordinatoren an den jeweiligen Akademischen Auslandsämtern oder International Offices kontaktiert werden.\nWeitere Informationen zu zentralen Voraussetzungen und dem Bewerbungsverfahren finden sich hier.",

"Bewerbungsschluss": "Die aktuellen Bewerbungsfristen können beim Akademischen Auslandsamt oder International Office der Heimathochschule erfragt werden."

},

"id": 10000102,

"title": "Europäische Union: Erasmus+ Mobilitätsprogramm für Studierende und Graduierte "

}
```


# Förderdatenbank Format

```json
{
        "url": "https://www.foerderdatenbank.de/FDB/Content/DE/Foerderprogramm/Land/Bayern/bayerisches-foerderprogramm-technologieorientiert.html",
        "title": "Bayerisches Förderprogramm „Technologieorientierte Unternehmensgründungen“ (BayTOU)",
        "Förderart": "Zuschuss",
        "Förderbereich": "Existenzgründung & -festigung, Forschung & Innovation (themenoffen)",
        "Fördergebiet": "Bayern",
        "Förderberechtigte": "Unternehmen, Existenzgründer/in",
        "Fördergeber": "Bayerisches Staatsministerium für Wirtschaft, Landesentwicklung und Energie",
        "Ansprechpunkt": "Projektträger Bayern    Bayern Innovativ – Bayerische Gesellschaft für Innovation und Wissenstransfer mbH   Am Tullnaupark 8   90402 Nürnberg     Tel: 0800 0268724       kontakt@projekttraeger-bayern.de        Bayern Innovativ GmbH, Projektträger Bayern",
        "Weiterführende Links": "Bayerisches Förderprogramm „Technologieorientierte Unternehmensgründungen“ (BayTOU)      Technologieorientierte Unternehmensgründung; Beantragung einer Förderung",
        "Kurzzusammenfassung": "<article class=\"content--tab-text\"> <div class=\"rich--text\"> <h3>Kurztext</h3> <p> Wenn Sie ein kleines oder mittleres Unternehmen in einem zukunftsträchtigen Technologiebereich gründen wollen, können Sie unter bestimmten Voraussetzungen einen Zuschuss erhalten.</p> </div> <div class=\"rich--text\"> <h3>Volltext</h3> <p> Der Freistaat Bayern unterstützt Sie bei Entwicklungsvorhaben, die mit der Gründung von technologieorientierten Unternehmen zusammenhängen und darauf abzielen, die technologische Basis von neu gegründeten, kleinen Unternehmen aufzubauen oder zu verstärken.</p> <p> Sie erhalten den Zuschuss aus dem Bayerischen Förderprogramm „Technologieorientierte Unternehmensgründungen“ (BayTOU) auch dann, wenn Sie noch kein beurteilungsreifes, tragfähiges technologisches Konzept für die Unternehmensgründung vorlegen können. In diesem Fall bekommen Sie die Förderung für Konzeptvorhaben in der experimentellen Entwicklung (Vorentwicklung).</p> <p> Sie erhalten die Förderung als Zuschuss.</p> <p> Sie erhalten</p> <ul> <li>bei Entwicklungsvorhaben bis zu 45 Prozent der förderfähigen Kosten, bei <span lang=\"en-GB\">Software</span>unternehmen maximal EUR 150.000,</li><li>bei Konzeptvorhaben bis zu 35 Prozent der zuwendungsfähigen Kosten, maximal EUR 26.000, in Ausnahmefällen maximal EUR 52.000.</li></ul> <p> Die Bagatellgrenze liegt bei EUR 15.000.</p> <p> Ihre Projektskizze und Ihren Antrag richten Sie bitte vor Beginn Ihres Vorhabens formgebunden auf elektronischem Weg an den beauftragten Projektträger Bayern Innovativ – Bayerische Gesellschaft für Innovation und Wissenstransfer mbH.</p> </div> </article>",
        "Zusatzinfos": "<article class=\"content--tab-text\"> <div class=\"rich--text\"> <h3>rechtliche Voraussetzungen</h3> <p> Antragsberechtigt sind</p> <ul> <li>Personen, die ein technologieorientiertes gewerbliches Unternehmen gründen wollen und über das notwendige technische Fachwissen verfügen, und</li><li>technologieorientierte kleine und mittlere Unternehmen (<abbr class=\"\" title=\"kleine und mittlere Unternehmen\">KMU</abbr>) der gewerblichen Wirtschaft gemäß <abbr class=\"\" title=\"Europäische Union\">EU</abbr>-Definition, die seit weniger als 6 Jahren existieren und weniger als 10 Mitarbeiterinnen und Mitarbeiter beschäftigen.</li></ul> <p> Die Förderung ist an folgende Bedingungen geknüpft:</p> <ul> <li>Ihr Vorhaben muss <ul> <li>mit einem erheblichen technischen und wirtschaftlichen Risiko verbunden sein,</li><li>technisch machbar erscheinen,</li><li>Prototypen neuer Produkte, Verfahren oder technischer Dienstleistungen hervorbringen, die deutliche Wettbewerbsvorteile und Marktchancen erwarten lassen,</li><li>der experimentellen Entwicklung zuzuordnen sein,</li><li>in wesentlichen Teilen im Freistaat Bayern durchgeführt werden.</li></ul> </li><li>Sie müssen <ul> <li>über das notwendige technologische und betriebswirtschaftliche Potenzial für das Vorhaben verfügen,</li><li>im angemessenen Umfang Eigen- und Fremdmittel einsetzen, die nicht durch andere öffentliche Finanzierungen ersetzt oder verbilligt werden.</li></ul> </li></ul> </div> </article>",
        "Rechtsgrundlage": "<article class=\"content--tab-text\"> <div class=\"rich--text\"> <h3>Richtlinie</h3> <p> <strong>Richtlinien zur Durchführung des Bayerischen Förderprogramms „Technologieorientierte Unternehmensgründungen“</strong></p> <p> Bekanntmachung des Bayerischen Staatsministeriums für Wirtschaft, Landesentwicklung und Energie<br/> vom 5. Juli 2019, Az.: 47-6667/304/3<br/> [geändert durch Bekanntmachung des Bayerischen Staatsministeriums für Wirtschaft, Landesentwicklung und Energie<br/> vom 6. Juli 2022, Az. 47-6667/304]</p> <h2 class=\"\"> Vorbemerkung</h2> <p style=\"padding-left: 30px;\"> Der Freistaat Bayern fördert nach Maßgabe</p> <p style=\"padding-left: 60px;\"> • dieser Richtlinien,</p> <p style=\"padding-left: 60px;\"> • der allgemeinen haushaltsrechtlichen Bestimmungen – insbesondere der Art. 23 und 44 der Bayerischen Haushaltsordnung (BayHO) und der dazu erlassenen Verwaltungsvorschriften bzw. der Allgemeinen Verwaltungsvorschriften für die Gewährung von Zuwendungen an die gewerbliche Wirtschaft (AVG) in der jeweils geltenden Fassung,</p> <p style=\"padding-left: 60px;\"> • der Verordnung (<abbr class=\"\" title=\"Europäische Union\">EU</abbr>) Nr. 651/2014 (Allgemeine Gruppenfreistellungsverordnung – <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr>)</p> <p style=\"padding-left: 30px;\"> Entwicklung und Innovation im Bereich von Produkten und Verfahren, die im Zusammenhang mit der Gründung von technologieorientierten Unternehmen stehen. Die Förderung erfolgt ohne Rechtsanspruch im Rahmen der verfügbaren Haushaltsmittel.</p> <h2 class=\"\"> 1. Zweck der Förderung</h2> <p style=\"padding-left: 30px;\"> Die Förderung soll Firmengründungen in zukunftsträchtigen Technologiebereichen anregen und neugegründete Firmen unterstützen. Gefördert werden können technologisch und wirtschaftlich risikobehaftete Entwicklungsvorhaben, die im Zusammenhang mit der Gründung von technologieorientierten Unternehmen stehen und darauf abzielen, die technologische Basis von neugegründeten und kleinen Unternehmen aufzubauen oder zu verstärken. Sofern noch kein beurteilungsreifes, tragfähiges technologisches Konzept für die Unternehmensgründung vorliegt, können Konzeptvorhaben im Bereich der experimentellen Entwicklung zu dessen Erstellung gefördert werden (Vorentwicklung).</p> <h2 class=\"\"> 2. Gegenstand der Förderung</h2> <p style=\"padding-left: 30px;\"> Die Zuwendungen werden ausgereicht</p> <p style=\"padding-left: 60px;\"> • als Beihilfen für Forschungs- und Entwicklungsvorhaben zur Lösung von Aufgaben im Bereich der experimentellen Entwicklung nach Art. 25 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> oder</p> <p style=\"padding-left: 60px;\"> • als Innovationsbeihilfe für <abbr class=\"\" title=\"kleine und mittlere Unternehmen\">KMU</abbr> nach Art. 28 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr>.</p> <h2 class=\"\"> 3. Zuwendungsempfänger</h2> <p style=\"padding-left: 30px;\"> Antragsberechtigt sind</p> <p style=\"padding-left: 30px;\"> 3.1 Personen, die die Absicht haben, ein technologieorientiertes Unternehmen zu gründen und über das zur Durchführung des Vorhabens notwendige technische Fachwissen verfügen oder</p> <p style=\"padding-left: 30px;\"> 3.2 technologieorientierte Unternehmen der gewerblichen Wirtschaft, die die Voraussetzungen an ein kleines oder mittleres Unternehmen (<abbr class=\"\" title=\"kleine und mittlere Unternehmen\">KMU</abbr>) Unternehmen gemäß Anhang I der <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> erfüllen und</p> <p style=\"padding-left: 60px;\"> • seit weniger als sechs Jahren existieren sowie</p> <p style=\"padding-left: 60px;\"> • weniger als zehn Mitarbeiter (Vollzeit, einschließlich Geschäftsleitung) haben.</p> <p style=\"padding-left: 30px;\"> In begründeten Fällen sind bei kleinen und mittleren Unternehmen, die weder selbst noch über Beteiligungsunternehmen produzierend tätig sind und die mit dem geplanten Entwicklungsvorhaben den Einstieg in das produzierende Gewerbe realisieren wollen, Ausnahmen hiervon möglich. Eine oder mehrere der am antragstellenden Unternehmen beteiligten Personen müssen Geschäftsführer sein, mindestens 50% der Anteile halten und den größeren Teil ihrer Arbeitszeit dem Gründungsvorhaben widmen. Mindestens ein Geschäftsführer muss über das zur Durchführung des Vorhabens notwendige technische Fachwissen verfügen. Kaufmännisches Wissen ist bereitzustellen, sofern die Geschäftsführung dies nicht hat. Bei Softwareunternehmen muss mindestens eine am Unternehmen wesentlich beteiligte Person eine entsprechende fachliche Qualifikation nachweisen. Alternativ ist eine Beschäftigungszeit von mindestens zwei Jahren an verantwortlicher Stelle bei einem Softwareunternehmen oder eine vergleichbare Tätigkeit zu belegen.</p> <p style=\"padding-left: 30px;\"> 3.3 Die Antragsteller müssen für die Projektdurchführung eine ausreichende Bonität haben und diese ggf. nachweisen.</p> <p style=\"padding-left: 30px;\"> 3.4 Antragsteller, die das Vorhaben im Auftrag und auf Rechnung Dritter durchführen, können nicht gefördert werden.</p> <h2 class=\"\"> 4. Zuwendungsvoraussetzungen</h2> <p style=\"padding-left: 30px;\"> 4.1 Die Durchführung von Vorhaben muss mit einem erheblichen technischen und wirtschaftlichen Risiko verbunden sein, aber dennoch auf Grundlage des vorgesehenen Lösungswegs als technisch machbar erscheinen.</p> <p style=\"padding-left: 30px;\"> 4.2 Das Vorhaben muss zum Ziel haben, ein neues Produkt, Verfahren oder eine technische Dienstleistung, die deutliche Wettbewerbsvorteile und Marktchancen aufgrund der darin enthaltenen technischen Neuheit erwarten lassen, zumindest bis zur Prototypreife zu entwickeln.</p> <p style=\"padding-left: 30px;\"> Bei einer Produktentwicklung muss die eigene Herstellung des Produktes (mindestens der wichtigsten Produktbestandteile), und bei einer Verfahrensentwicklung die eigene Herstellung von für das Verfahren entscheidenden Geräten, Apparaturen, Komponenten oder Materialien beabsichtigt sein. Bei einer technischen Dienstleistung oder einem Softwareprodukt muss der Antragsteller die Absicht haben, diese selbst am Markt anzubieten. Ein Produkt oder Produktionsverfahren gilt als neu, wenn es im Europäischen Wirtschaftsraum noch nicht auf dem Markt ist. Bestehende Schutzrechte dürfen nicht verletzt werden. Das Vorhaben muss in jedem Fall der experimentellen Entwicklung nach Art. 2 Nr. 86 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> zuzuordnen sein. Der Antragsteller muss ein beurteilungsreifes tragfähiges Konzept für seine Unternehmensgründung und für die Durchführung des Entwicklungsvorhabens vorlegen. Bei Konzeptvorhaben darf der Förderzeitraum neun Monate nicht überschreiten.</p> <p style=\"padding-left: 30px;\"> 4.3 Das Vorhaben muss in seinen wesentlichen Teilen in Bayern durchgeführt werden.</p> <p style=\"padding-left: 30px;\"> 4.4 Nicht gefördert werden Vorhaben, die vor Eingang eines prüffähigen Antrags beim Projektträger bereits begonnen wurden.</p> <p style=\"padding-left: 30px;\"> 4.5 Antragsteller müssen über das notwendige technologische und betriebswirtschaftliche Potenzial zur erfolgreichen Durchführung des Vorhabens verfügen.</p> <p style=\"padding-left: 30px;\"> 4.6 Antragsteller müssen für die Finanzierung des Vorhabens nachweislich in angemessenem Umfang Eigen- oder Fremdmittel einsetzen, die nicht durch andere öffentliche Hilfen finanziert oder zinsverbilligt werden.</p> <p style=\"padding-left: 30px;\"> 4.7 Eine Kumulierung mit Mitteln der Europäischen Union bzw. mit anderen staatlichen Beihilfen ist nur unter den Voraussetzungen des Art. 8 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> möglich.</p> <p style=\"padding-left: 30px;\"> 4.8 Unternehmen in Schwierigkeiten gemäß Art. 1 Abs. 4 Buchst. c <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> in Verbindung mit Art. 2 Nr. 18 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> werden nicht gefördert. Dies gilt insbesondere für Antragsteller, über deren Vermögen ein Insolvenzverfahren beantragt oder eröffnet worden ist. Dasselbe gilt für Antragsteller und, sofern der Antragsteller eine juristische Person ist, für dessen gesetzlichen Vertreter, die eine eidesstattliche Versicherung nach § 807 ZPO oder § 284 AO abgegeben haben oder zu deren Abgabe verpflichtet sind.</p> <p style=\"padding-left: 30px;\"> 4.9 Einem Unternehmen, das einer Rückforderung aufgrund einer früheren Kommissionsentscheidung zur Feststellung der Rechtswidrigkeit und Unvereinbarkeit einer Beihilfe mit dem Gemeinsamen Markt nicht Folge geleistet hat, darf eine Zuwendung nach diesen Richtlinien nicht gewährt werden.</p> <p style=\"padding-left: 30px;\"> 4.10 Die Veröffentlichung der Bewilligung von Vorhaben erfolgt nach Maßgabe von Art. 9 Abs. 1 Buchst. c in Verbindung mit Anhang III <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr><span> </span><sup>(1)</sup>.</p> <h2 class=\"\"> 5. Art und Umfang der Zuwendung</h2> <p style=\"padding-left: 30px;\"> 5.1 Die Zuwendung erfolgt als Anteilfinanzierung durch Zuschüsse im Rahmen einer Projektförderung. Es werden nur Zuschüsse ausgereicht, die eine Höhe von mindestens 15.000 Euro erreichen.</p> <p style=\"padding-left: 30px;\"> 5.2 Die Zuwendung (Beihilfeintensität) für die im Rahmen des Vorhabens gemachten Aufwendungen der experimentellen Entwicklung beträgt nach Art. 25 Abs. 5 Buchst. c in Verbindung mit Art. 25 Abs. 6 Buchst. a <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> sowie nach Art. 28 Abs. 2 Buchst. a <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> für</p> <p style=\"padding-left: 60px;\"> a) Entwicklungsvorhaben bis zu 25% der zuwendungsfähigen Ausgaben. Die Beihilfeintensität erhöht sich um 20%-Punkte bei kleinen und um 10%-Punkte bei mittleren Unternehmen. Bei Softwareunternehmen beträgt der Zuschuss für ein Entwicklungsvorhaben max. 150.000 Euro.</p> <p style=\"padding-left: 60px;\"> b) Konzeptvorhaben bis zu 25% der zuwendungsfähigen Ausgaben. Die Beihilfeintensität erhöht sich um 10%-Punkte bei kleinen Unternehmen. Für die Erstellung eines beurteilungsreifen, tragfähigen technologischen Konzepts beträgt der Zuschuss max. 26.000 Euro, in begründeten Einzelfällen kann bei besonders umfangreichen Zuarbeiten die Obergrenze auf 52.000 Euro angehoben werden.</p> <p style=\"padding-left: 30px;\"> 5.3 Art und Höhe der Zuwendung bemessen sich nach dem technischen und wirtschaftlichen Risiko des Vorhabens, seiner technologischen Bedeutung, dem öffentlichen Interesse an seiner Verwirklichung, der Finanzkraft des antragstellenden Unternehmens und den verfügbaren staatlichen Haushaltsmitteln.</p> <h2 class=\"\"> 6. Zuwendungsfähige Ausgaben</h2> <p style=\"padding-left: 30px;\"> 6.1 Zuwendungsfähige Ausgaben für Entwicklungsvorhaben sind nach Art. 25 Abs. 3 Buchst. a, b, d und e <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr>:</p> <p style=\"padding-left: 60px;\"> • Personalkosten (Forscher, Techniker und sonstige unterstützende Personen, soweit diese für das Forschungsvorhaben angestellt sind). Als zuwendungsfähige Personalkosten von Unternehmen der gewerblichen Wirtschaft können je nachgewiesenem Personenmonat (entspricht 160 Stunden bei stundenweiser Aufzeichnung) für eigenes, fest angestelltes Personal folgende Beträge in Ansatz gebracht werden:</p> <p style=\"padding-left: 60px;\"> • Akademiker, Dipl.-Ing. u.Ä. 9.000 Euro</p> <p style=\"padding-left: 60px;\"> • Techniker, Meister u.Ä. 7.000 Euro</p> <p style=\"padding-left: 60px;\"> • Facharbeiter, Laboranten u.Ä. 5.000 Euro</p> <p style=\"padding-left: 30px;\"> Mit den Personalkostenpauschalen sind die Personaleinzelkosten, die Personalnebenkosten sowie die Gemeinkosten und Reisekosten abgegolten. Arbeitet der Unternehmer selbst an dem Vorhaben mit, können für ihn die Pauschalsätze eines entsprechend qualifizierten Mitarbeiters anerkannt werden.</p> <p style=\"padding-left: 60px;\"> • Kosten für Instrumente und Ausrüstung, soweit und solange sie für das Forschungsvorhaben genutzt werden (Sondereinzelkosten, Abschreibungen auf vorhabensspezifische Anlagen). Werden diese Instrumente und Ausrüstungen nicht während ihrer gesamten Lebensdauer für das Forschungsvorhaben verwendet, gilt nur die nach den Grundsätzen ordnungsgemäßer Buchführung ermittelte Wertminderung während der Dauer des Forschungsvorhabens als beihilfefähig (zeit- und vorhabensanteilig).</p> <p style=\"padding-left: 60px;\"> • Ausgaben für Auftragsforschung, technisches Wissen und für von Dritten direkt oder in Lizenz erworbene Patente sowie Kosten für Beratung und gleichwertige Dienstleistungen, die ausschließlich für das Forschungs- und Entwicklungsvorhaben genutzt werden (Fremdleistungen). Die Bedingungen des Rechtsgeschäfts zwischen den Vertragsparteien dürfen sich hierbei nicht von denjenigen unterscheiden, die bei einem Rechtsgeschäft zwischen unabhängigen Unternehmen festgelegt werden und es dürfen keine wettbewerbswidrigen Absprachen vorliegen (so genanntes „Arm's-length-Prinzip” nach Art. 2 Nr. 89 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr>).</p> <p style=\"padding-left: 60px;\"> • Sonstige Betriebsausgaben (Material, Bedarfsmittel etc.), die unmittelbar durch die Entwicklungstätigkeit entstehen.</p> <p style=\"padding-left: 60px;\"> • Ausgaben für die Erlangung, die Validierung und Verteidigung von Patenten und anderen immateriellen Vermögenswerten im Sinn von Art. 28 Abs. 2 Buchst. a <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr>, sofern diese unmittelbar durch die Forschungs- und Entwicklungstätigkeit entstehen.</p> <p style=\"padding-left: 30px;\"> 6.2 Zuwendungsfähige Ausgaben für Konzeptvorhaben können sich entsprechend Nr. 6.1 zusammensetzen, jedoch ohne Kosten für Instrumente und Ausrüstung und ohne Ausgaben für die Erlangung, die Validierung und Verteidigung von Patenten und anderen immateriellen Vermögenswerten.</p> <h2 class=\"\"> 7. Verfahren</h2> <p style=\"padding-left: 30px;\"> 7.1 Der Freistaat Bayern hat den nachfolgenden Projektträger mit der Abwicklung dieses Förderpunktes beauftragt:</p> <p style=\"padding-left: 60px;\"> Bayern Innovativ Gesellschaft für Innovation und Wissenstransfer mbH<br/> Projektträger Bayern<br/> Am Tullnaupark 8<br/> 90402 Nürnberg<br/> Telefon: 0800 0268724 (kostenfrei)</p> <p style=\"padding-left: 30px;\"> 7.2 Skizzen und Anträge auf Gewährung von Zuwendungen sind an den Projektträger zu richten.Eine frühzeitige Kontaktaufnahme mit dem Projektträger wird empfohlen.</p> <p style=\"padding-left: 30px;\"> 7.3 Die Antragstellung ist formgebunden und erfolgt auf elektronischem Weg. Die Zugangsdaten hierfür sind beim Projektträger erhältlich. Weitere Informationen werden auf der Internetplattform zur elektronischen Antragstellung (ELAN) des Staatsministeriums für Wirtschaft, Landesentwicklung und Energie unter<span> </span><a class=\"RichTextExtLink ExternalLink\" href=\"https://www.fips.bayern.de/\" target=\"_blank\" title=\"Internetplattform der Innovationsberatung des Bayerischen Staatsministeriums für Wirtschaft, Landesentwicklung und Energie\">https://www.fips.bayern.de</a><span> </span>bereitgestellt.</p> <p style=\"padding-left: 30px;\"> 7.4 Der Projektträger übernimmt namens und im Auftrag des Freistaates Bayern die Prüfung der Skizzen und Anträge, gibt, ggf. auch unter Einschaltung von Fachgutachtern, eine Empfehlung für die Förderentscheidung ab und führt die Abwicklung der Förderung, die Bearbeitung der Zahlungsanforderungen, die Prüfung der Zwischenberichte, des Verwendungsnachweises und der Verwertungsberichte sowie die Abwicklung des Schriftverkehrs mit den Antragstellern durch. Der Projektträger ist berechtigt, Erklärungen zu den Anträgen und zur Abwicklung der Förderung bei den Antragstellern einzuholen. Der Projektträger ist zur Vertraulichkeit verpflichtet.</p> <p style=\"padding-left: 30px;\"> 7.5 Bewilligungsbehörde ist das Staatsministerium für Wirtschaft, Landesentwicklung und Energie. Die Bewilligungsbehörde erlässt den Zuwendungsbescheid und zahlt die Fördermittel aus. Die Mittelabrufe sowie der Verwendungsnachweis sind dem Projektträger vorzulegen. Nach Prüfung werden Mittelabrufe an die zahlungsanweisende Stelle weitergeleitet, der Verwendungsnachweis an die Bewilligungsbehörde.</p> <p style=\"padding-left: 30px;\"> 7.6 Der Bayerische Oberste Rechnungshof ist gemäß Art. 91 BayHO berechtigt, bei den Zuwendungsempfängern zu prüfen.</p> <p style=\"padding-left: 30px;\"> 7.7 Die Europäische Kommission hat das Recht, die Zuwendungen auf Grundlage dieser Richtlinie zu überprüfen. Daher müssen alle für die Förderung relevanten Unterlagen 10 Jahre lang ab der Gewährung der Zuwendung aufbewahrt werden, Art. 12 <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr>.</p> <h2 class=\"\"> 8. Inkrafttreten, Außerkrafttreten</h2> <p style=\"padding-left: 30px;\"> Diese Bekanntmachung tritt mit Wirkung vom 1. Juli 2019 in Kraft. Sofern nicht aufgrund einer Änderung der <abbr class=\"\" title=\"Allgemeine Gruppenfreistellungsverordnung\">AGVO</abbr> eine frühere Anpassung geboten ist, tritt sie mit Ablauf des 31. Dezember 2025 außer Kraft.</p> <p style=\"padding-left: 30px;\">  </p> <p style=\"padding-left: 30px;\"> (1) Nach Art. 9 Abs. 1 Buchst. c ist jede Einzelbeihilfe über 500.000 Euro mit den in Anhang III genannten Informationen (u.a. Empfänger und Beihilfehöhe) auf einer nationalen oder regionalen Website zu veröffentlichen.</p> </div> </article>"
    },
```

# EU Format

```json
  {
    "apiVersion": "2.101",
    "reference": "45646358HORIZONResearchandInnovationActions1701907200000",
    "url": "https://ec.europa.eu/info/funding-tenders/opportunities/data/topicDetails/HORIZON-CL5-2024-D2-01-03.json",
    "title": null,
    "contentType": "text/plain",
    "language": "en",
    "databaseLabel": "SEDIA",
    "database": "SEDIA",
    "summary": null,
    "weight": 2,
    "groupById": "2",
    "content": "Development of technical and business solutions to optimise the circularity, resilience, and sustainability of the European battery value chain (Batt4EU Partnership)",
    "accessRestriction": false,
    "pages": null,
    "checksum": "89F83A4548CD5ADAB76485DADC8DCEEFEACDCCAA07743E8020778247BC8FD0AF",
    "metadata": {
      "es_SortDate": [
        "2023-12-07T01:00:00.000+0100"
      ],
      "keywords": [
        "[\"Energy storage\",\"Social Innovation\",\"Co-programmed European Partnerships\",\"repair\",\"circularity\",\"refurbishing\",\"batteries\",\"sustainability\"]"
      ],
      "sortStatus": [
        "2"
      ],
      "destination": [
        "44799060"
      ],
      "type": [
        "1"
      ],
      "title": [
        "Development of technical and business solutions to optimise the circularity, resilience, and sustainability of the European battery value chain (Batt4EU Partnership)"
      ],
      "esST_checksum": [
        "89F83A4548CD5ADAB76485DADC8DCEEFEACDCCAA07743E8020778247BC8FD0AF"
      ],
      "focusArea": [],
      "cftId": [
        "0"
      ],
      "typeOfMGAs": [
        "43027846"
      ],
      "esST_FileName": [
        "file.txt"
      ],
      "ccm2Id": [
        "45646358"
      ],
      "callIdentifier": [
        "HORIZON-CL5-2024-D2-01"
      ],
      "callccm2Id": [
        "45706256"
      ],
      "destinationGroup": [
        "45355304"
      ],
      "frameworkProgramme": [
        "43108390"
      ],
      "identifier": [
        "HORIZON-CL5-2024-D2-01-03"
      ],
      "es_ContentType": [
        "text/plain"
      ],
      "programmeDivision": [
        "43120821",
        "43121088",
        "43108541"
      ],
      "crossCuttingPriorities": [
        "PART-COPROGR",
        "SocInnov"
      ],
      "programmePeriod": [
        "2021 - 2027"
      ],
      "deadlineDate": [
        "2024-04-18T19:00:00.000+0200"
      ],
      "esDA_IngestDate": [
        "2023-04-03T00:54:21.553+0200"
      ],
      "typesOfAction": [
        "HORIZON  Research and Innovation Actions"
      ],
      "esST_URL": [
        "https://ec.europa.eu/info/funding-tenders/opportunities/data/topicDetails/HORIZON-CL5-2024-D2-01-03.json"
      ],
      "esDA_QueueDate": [
        "2023-04-03T00:54:00.366+0200"
      ],
      "startDate": [
        "2023-12-07T01:00:00.000+0100"
      ],
      "status": [
        "31094501"
      ],
      "deadlineModel": [
        "single-stage"
      ]
    },
    "children": []
  }
```
