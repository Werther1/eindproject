
Design Document:
================

Door Werther Huzen:

Studentnumber: 12602248

#Databronnen:
De volgende databronnen zullen gebruikt worden voor de drie verschillende visualisaties.

-	Piechart energie:
In deze dataset wordt de hoeveelheid energie die in Nederland gegenereerd wordt weergegeven.  Verschillende manieren voor het opwekken van energie worden weergegeven en de hoeveelheid energie die opgewekt wordt per manier.
o	https://opendata.cbs.nl/#/CBS/nl/dataset/80030ned/table?ts=1559821842391

-	Kaart risicozones:
In deze database staan de huidige veiligheidszones die de overheid heeft opgericht in de buurt van de kerncentrale en kernopslag plekken en de productiefabrieken. Dit bestand is een json waardoor het makkelijk te gebruiken is.
o	http://servicespub.risicokaart.nl/rk_services_pub/services/WFS-risicokaart?request=GetFeature&service=WFS&version=2.0.0&typeName=veiligheidsafst_kernenergie&outputFormat=application%2Fjson

-	Barchart:
Totaal aantal geschat radioactief afval dat moet worden opgeslagen na tijdens het levensloop van de twee kerncentrales in Nederland. De data staat in een pdf en de omvang is klein, maar er zijn echter geen volledige datasets door de overheid gepubliceerd. Daarom zal ik Handmatig de data over moeten zetten naar excel en dan converteren naar json.
o	https://www.kernenergieinnederland.nl/files/20060929-randvoorwaarden.pdf
o	https://covra.nl/downloads/general/Jaarrapport_COVRA_2018.pdf


 

#Technische onderdelen:
| Onderdelen:     | Beschrijving:   |  Implementatie: |
|---              |---              |---              |
|Kaart visualisatie |Kaart waarin de huidige nucleaire              | Een kaart van Nederland,
                    veiligheidszones in Nederland getoond worden.     wordt gebruikt samen met
                    En waarin een vergelijkbare veiligheidszone voor  de dataset over veiligheidszones
                    drie nieuwe kerncentrales geschetst wordt.        inclusief voorwaarden van inrichting zones |
                    De gebruiker kan verschillende soorten gevaren
                    weergeven waardoor de zone zal krimpen
                    of groeien naarmate het risico groeit of afneemt|   
|barchart           |Een piechart waarin de manieren waarin | dataset wordt gebruikt van cbs is al in json |
                    er in Nederland energie
                    wordt opgewekt worden weergegeven.
                    Op elk vlak van de grafiek
                    kan worden geklikt en dan wordt
                    de hoeveelheid energie weergegeven.|   
|Piechart           |Geeft de totale hoeveelheid          |Data uit een grafiek van de overheid
                    kernafval weer tijdens de levensloop   over de inschatting van de totale
                    van een kerncentrale. Geeft weer       hoeveelheid chemisch afval dat
                    hoeveel voedbalvelden nodig zijn       opgeslagen is in Nederland.
                    voor opslag.
                    Tevens wordt hetzelfde gedaan
                    voor de drie nieuwe centrales|
#Plugins:
-	D3 data maps
-	Color brewer kleurenschema’s
-	D3-tip
- bootstrap


https://opendata.cbs.nl/#/CBS/nl/dataset/80030ned/table?ts=1559821842391
