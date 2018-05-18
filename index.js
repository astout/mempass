#! /usr/local/bin/node

const { genPasswd, genPasswds } = require('./mempass');

// const args = process.argv.slice(2);

const r = genPasswds();

console.log(r);
