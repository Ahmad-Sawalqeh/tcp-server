// /* eslint-disable strict */
// 'use strict';

const net = require('net');
const client = new net.Socket();
client.connect(3001,'localhost', () => {});

const fs = require('fs');
const  { promisify }  = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

let file = `${__dirname}/../file/test.txt`;

const alterFile = (file) => {

  readFile(file, 'utf8')
    .then(data => {
      client.write('he file has been read');
      let text = data.toUpperCase();
      write(text);
    })
    .catch((err) => {
      client.write('error reading file');
    });

};

const write = (text) => {

  writeFile(file, text)
    .then(() => {
      client.write('The file contant converted to upper case letter');
    })
    .catch(err => {
      client.write('error writing on file');
    });

};

alterFile(file);

module.exports = alterFile;
