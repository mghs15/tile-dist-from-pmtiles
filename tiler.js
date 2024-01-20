const child_process = require('child_process');
const fs = require("fs");

const tipp = `tippecanoe -l pixel`
           + " -e" + ` ./docs/tile/`
           + ` ./_polygon.ndjson`
           + ' --force'
           + " --coalesce" + " --reorder" + " --hilbert"
           + " --no-simplification-of-shared-nodes"
           + ' --no-tile-size-limit' 
           + ' --no-tile-compression'
           + ' --no-feature-limit'
           + ' --minimum-zoom=6'
           + ' --maximum-zoom=6'
           + ' --base-zoom=6'
           + ' --no-line-simplification';  
           

console.log(tipp);

child_process.execSync(`${tipp}`);

