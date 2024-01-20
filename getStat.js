//import * as pmtiles from "pmtiles";

const pmtiles = require("pmtiles");
const fs = require("fs");

const url = "https://cyberjapandata.gsi.go.jp/xyz/optimal_bvmap-v1/optimal_bvmap-v1.pmtiles";
const file = "stat.csv";

fs.writeFileSync(file, "z,x,y,length" + "\n");

const p = new pmtiles.PMTiles(url);
const cache = new pmtiles.SharedPromiseCache();
const source = new pmtiles.FetchSource(url);

pmset = [];

const tileStat = (directory, header) => {

  let csv = "";
  
  
  directory.forEach( entry => {
  
    if(entry.runLength > 0){
    
      const length = entry.length;
      const xyz = pmtiles.tileIdToZxy(entry.tileId)
      
      csv += `${xyz[0]},${xyz[1]},${xyz[2]},${length}` + "\n";
      
    }else{
      
      console.log(entry);
      
      d_o = header.leafDirectoryOffset + entry.offset;
      d_l = entry.length;
      
      cache.getDirectory(source, d_o, d_l, header).then( leaf => {
        const pm = tileStat(leaf, header);
        pmset.push(pm);
      });
      
    }
  });
  
  fs.appendFileSync(file, csv);
  
}

const header = p.getHeader(source).then( header => {

  console.log(header);
  
  let d_o = header.rootDirectoryOffset;
  let d_l = header.rootDirectoryLength;
  
  cache.getDirectory(source, d_o, d_l, header).then( leaf => {
    const pm = tileStat(leaf, header);
    pmset.push(pm);
  });
  
});

