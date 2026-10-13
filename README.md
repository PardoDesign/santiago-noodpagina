# Noodpagina San Tiago (santiagotiel.nl)

Tijdelijke pagina voor San Tiago Steakhouse Tiel tijdens de storing bij mijn.host (vanaf 12-10-2026).
Een statische pagina met logo, openingstijden, adres en directe knoppen (bellen, route, mail).
Elk adres geeft de noodpagina met status 503 en Retry-After, zodat Google de oude pagina's bewaart.

- Bron van de gegevens: santiagotiel.nl zelf, gelezen 11-10-2026 (docs/santiago-review-2026-10-10/uitzoek-11-10.md in de werkplaats).
- Uitrol: Coolify, project pardo-restaurant, build pack Dockerfile, map `site/`.
- Lokaal testen: `docker build -t santiago-nood site && docker run -p 8088:80 santiago-nood`.
- Weghalen: zodra de echte site bij mijn.host weer werkt het A-record van santiagotiel.nl en www terugzetten naar mijn.host (217.180.14.113), daarna deze Coolify-app stoppen.
