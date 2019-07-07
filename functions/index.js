'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const glob = require('glob');
const camelCase = require('camelcase');

const settings = { timestampsInSnapshots: true };
const config = functions.config().firebase;

const globConfig = { cwd: __dirname, ignore: './node_modules/**' };

admin.initializeApp(config);
admin.firestore().settings(settings);

// Export triggers
const files = glob.sync('./src/trigger/**/*.f.js', globConfig);
for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f];
  const fName = camelCase(file.slice(0, -5).split('/').slice(3).join('_'));
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === fName) {
    exports[fName] = require(file);
  }
}
