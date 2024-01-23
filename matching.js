
const fs = require("fs");

const optbv = fs.readFileSync("./stat.csv", "utf-8");
const gsibv = fs.readFileSync("./gsi-vector.csv", "utf-8");

const tmp = {};

optbv.split("\n").forEach( line => {
  const csv = line.split(",");
  
  if(+csv[0] != 15) return;
  
  const xyz = `${csv[0]},${csv[1]},${csv[2]}`;
  if(!tmp[xyz]){
    tmp[xyz] = {"optbv":"","gsibv":""};
  }
  tmp[xyz].optbv = csv[3];
});

gsibv.split("\n").forEach( line => {
  const csv = line.split(",");
  
  if(+csv[0] != 15) return;
  
  const xyz = `${csv[0]},${csv[1]},${csv[2]}`;
  if(!tmp[xyz]){
    tmp[xyz] = {"optbv":"","gsibv":""};
  }
  tmp[xyz].gsibv = csv[3];
});

let csv = "z,x,y,gsibv,optbv" + "\n";

for(let key in tmp){
  csv += `${key},${tmp[key].gsibv},${tmp[key].optbv}` + "\n";
}

fs.writeFileSync("matching.csv", csv);


