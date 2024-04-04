function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};

const lines = document.documentElement.innerHTML
    .split("pre-wrap;\">")[1].split("</pre")[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>`;

csvToArray(lines).forEach((parts) => {
    const name = parts[0];
    const coords = parts[2].split(',').reverse().join(',').replace(' ', '')

    xml += `
    <Placemark>
      <name>${name}</name>
      <description>${name}</description>
      <Point>
        <coordinates>${coords}</coordinates>
      </Point>
    </Placemark>
    `
});

xml += `</Document>
</kml>`

console.log(xml);