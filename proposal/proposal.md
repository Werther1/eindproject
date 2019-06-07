Visualisatie van gevarenzones bij uitbreiding van kerncentrales:
================================================================

Kernenergie kan een gevaarlijke methode voor het opwekken van energie zijn, daarom heeft de overheid speciale maatregelen genomen voor de zones rond om kerncentrales.  In de komende 30 jaar moet onze samenleving duurzaam worden, op dit moment komt 6 % van de energiewinning van kerncentrales. Voorstanders van kernenergie zien daarom mogelijkheden om kernenergie uit te breiden. Doordat kernenergie zijn gevaren heeft is het handig om visueel weer te geven wat nieuwe kerncentrales betekenen voor de omgeving, zodat politici, burgers en andere belanghebbende een beter beeld krijgen van de situatie. Het kabinet heeft 3 nieuwe plekken aangewezen waar mogelijk kerncentrales kunnen worden gebouwd. Deze zullen toegevoegd worden aan de kaart.

#Project:
-	Kaart risicozones:
  -Een interactieve kaart die inzicht geeft over in welke regio’s van    Nederland, behoren tot de risicozones rond om kerncentrales.
  -	Gebruik van data met geschikte plekken voor kernenergie
-	Barchart:
- 	Hoeveelheid kernafval er geproduceerd wordt tijdens de tijd dat een     kerncentrale gebruikt kan worden. Centrale in borsellen wordt dan vergeleken met de 3 nieuwe centrales.
-	Een piechart:
  -	Over de hoeveelheid energie die in nederland gegenereerd wordt. Verschillende bronnen voor het opwekken van energie worden weergegeven. Met extra zichtbare data wanneer er op de grafiek wordt geklikt.


#Dataset:
- Maatregel zone Kernenergie van het Nationaal Georegister:

http://servicespub.risicokaart.nl/rk_services_pub/services/WFS-risicokaart?request=GetFeature&service=WFS&version=2.0.0&typeName=veiligheidsafst_kernenergie&outputFormat=application%2Fjson

- Eventueel inrichting gevaarlijke stoffen – Faciliteiten voor productie en industrie:
http://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/8e986f37-74d7-4b6c-8026-87c960456423

- Energiebalans: aanbod, omzetting en verbruik:
https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83140NED/table?ts=1559733893093
https://opendata.cbs.nl/#/CBS/nl/dataset/80030ned/table?ts=1559821842391

- Er wordt gebruik gemaakt van een grafiek met over de hoeveelheid kernafval dat opgeslagen wordt in nederland tussen 2014 en 2017: https://covra.nl/downloads/general/Jaarrapport_COVRA_2018.pdf

- Voor de randvoorwaarden voor nieuwe kerncentrales zal gebruik gemaakt worden van het volgende document: https://www.kernenergieinnederland.nl/files/20060929-randvoorwaarden.pdf. Het document schets de geografische voorwaarden die nodig zijn voor het vinden van een locatie. Tevens wordt er gebruik gemaakt van drie locaties die tot dus ver door het kabinet zijn gekozen voor het mogelijke ontwikkelen van nieuwe kerncentrales.

 


#Voorbeelden van vergelijkbare kaarten zijn:


Figuur 1: Zone voor joodtabletten Nederland
![](doc/Afbeelding1.png)

Figuur 2: Nucleaire zones Belgie
![](doc/Afbeelding2.png)

Figuur 3: barchart productie kernafval vlaanderen
![](doc/Afbeelding3.png)


#Gebruiker mogelijkheden Kaart:
-	Verandering van afstand van de nuveleaire zones, zodat de gebruiker met behulp van een legenda een inschatting kan maken over de gevaren.
-	Mogelijkheid tot zoeken naar impact van specifieken gevaren binnen de zones

#Moeilijkheden:
-	Nog niet eerder met een kaart gewerkt
-	Duidelijke visualisatie is lastig te maken, kaarten worden makkelijk vol of onoverzichtelijk. Ervaring met mapping porgramma’s.
-	Niet te veel toevoegen aan de opdracht.

#Externe componenten:
-	Gebruik wordt er gemaakt van d3
