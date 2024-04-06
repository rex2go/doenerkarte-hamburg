import fs from 'fs';

const lines = fs.readFileSync('doener.json', 'utf8');

const data = JSON.parse(lines);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>`;

for (const doener of data) {
    const name = doener.name;
    const desc = doener.description;
    const address = doener.address;
    let coords = doener.coords.split(',').reverse().join(',').replace(' ', '');
    const price = doener.price;
    const rating = doener.rating;

    xml += `
    <Placemark>
      <name>${name}</name>
      <description>${desc}</description>
      <Point>
        <coordinates>${coords}</coordinates>
      </Point>
    </Placemark>
    `
}

xml += `</Document>
</kml>`

fs.writeFileSync('../public/data/data.kml', xml);
