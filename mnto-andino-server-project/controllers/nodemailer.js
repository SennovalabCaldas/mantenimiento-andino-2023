const nodemailer = require('nodemailer');
// https://myaccount.google.com/apppasswords?utm_source=google-account&utm_medium=myaccountsecurity&utm_campaign=tsv-settings&rapt=AEjHL4OPIGVOfGwYl6M7MWa0bRD0uS7S2FXTD6oJNa734TMonPpHsly35EpV-dK4ce5FhgFReKasUmdoxGbWaHud1Lij6WM9jneTM9QJkFVRx96F6uMonXo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yanetmejia03@gmail.com',
    pass: 'gidx uege fagd trev'
  }
});

module.exports = transporter;
