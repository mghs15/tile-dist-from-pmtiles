const fs = require("fs");
const readline = require('readline');

const rs = fs.createReadStream('./stat.csv');
const ws = fs.createWriteStream('./_polygon.ndjson');
const rl = readline.createInterface({input: rs, output: ws});

// config
const tz = 15; // target zoom level

// Reference: Slippy map tilenames
// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
const lon2tile = (lon,zoom) => { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }

const lat2tile = (lat,zoom) => { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

const lon2tiled = (lon,zoom) => { return ((lon+180)/360*Math.pow(2,zoom)); }

const lat2tiled = (lat,zoom) => { return ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)); }

const tile2long = (x,z) => { return (x/Math.pow(2,z)*360-180); }

const tile2lat  = (y,z) => {
  const n=Math.PI-2*Math.PI*y/Math.pow(2,z);
  return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}

rl.on('line', (line) => {

  if(!line || line=="") return;
  
  const csv = line.split(",");
  
  /***/
  
  const z = +csv[0];
  const x = +csv[1];
  const y = +csv[2];
  const size = +csv[3];
  
  if(z != 15) return;
  
  /***/
  
  const vx1 = tile2long(x, z);
  const vx2 = tile2long(x + 1, z);
  const vy1 = tile2lat(y, z);
  const vy2 = tile2lat(y + 1, z);
  
  
  let geojson = {
    "type": "Feature",
    "properties": {
      "z": z,
      "x": x,
      "y": y,
      "size": size
    },
    "geometry": { 
      "type": "Polygon",
      "coordinates": [[
        [vx1, vy1],
        [vx2, vy1],
        [vx2, vy2],
        [vx1, vy2],
        [vx1, vy1]
      ]]
    }
  }
  
  const s = JSON.stringify(geojson) + "\n";
  ws.write(s);
  
  
});

rl.on('close', () => {
  console.log("END");
});