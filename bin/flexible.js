#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const curPath = process.cwd();
const glob = require('glob');

glob('*.css', function(err, files) {
  for (let i = files.length - 1; i >= 0; i--) {
      let filePath = path.resolve(curPath, files[i]);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err;
      data = data.replace(/(\d+)px/g, function(st, $1, $2) {
        return $1 * 2 / 75 + 'rem';
      }).replace(/(font\-size\s*:\s*)([0-9\.]+)rem/g, function(str, $1, $2) {
        return $1 + $2 * 75 / 2 + 'px';
      });
      fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log(files[i] + '  saved!');
      });
    });
  }
})
