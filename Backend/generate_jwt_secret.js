const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const secret = crypto.randomBytes(64).toString('hex');
const envPath = path.join(__dirname, '.env');

const envContent = `JWT_SECRET=${secret}\n`;

fs.appendFile(envPath, envContent, (err) => {
  if (err) {
    console.error('Failed to write JWT_SECRET to .env file:', err);
  } else {
    console.log('JWT_SECRET added to .env file successfully.');
  }
});
