// server.js
const express = require('express');
const app = express();
const path = require('path');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

// Initialize Firebase Admin
const serviceAccount = {
    "type": "service_account",
    "project_id": "islamapp-37fc4",
    "private_key_id": "414966ed3335076293a220779fe6ef599cd8dbe4",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCSnmrrUs1cKu+I\nW52ApLZSgC/6au/+y5OmpXcIB13OoVTj13AGCnqvqoRDnYjoLkXYi867tD9/7HPu\ne2L3qfqDT2bL/Oz85AB6CCc1lV31QGqv0L3/nOq4AeaUcXc+arceSAGJdtYOlguZ\nOijtKjDgTZE92vKsWSXBcC/kQVzPt5t2CiAHjFv8er3gvEe9xzEJYbvRnB1CFw6U\nLgm2H7lz1AGGA+7d87W2evMHFUOUxkbhePiXzduY0W1W+VbHiGdV1ysqfO4KXts1\nBRmp9TTsBcP0KjMOUdAqP6JkCTiuXoF5sBw/3ohmmMTCr3wlT7HqYwr/2S4BFH7r\nAWvtAOqjAgMBAAECggEAAK0YaxESMIKXHO9e9YsEYfc3tKAan/evpEOIwCkpVgU+\npb41b4vUW+FdmR5coiucudkHNXlk9bTmaoCAkXBKVn+NrSzRdk2AE3ZlB6EQadRM\nDeyDWapkjpUmD7T9lX0SbsivF8wY3gSvuZtXbGBOd7rgpVx69jgt0/Y+uCmXia5a\nQ44KWYxBry3Qrosxo/QEiiKZE+7o77Fwq5viE7ac5u5P3SNMbAa4S6lGXCBKhrQ0\nsCOW1AAy9kSwmSzlr+Rw95HjbpMo0vm4UgjdmosRTh+8faR1ArM5AkrPfw7sbaZU\nQjNGAa4/e5UIFM4Q3L7qE6LYn2egjq/G+vIgIa+KcQKBgQDJYg49YpURIHsTLpyq\nBYyKfhr5RZzuxvQpUtt2WMzMaeap8Cphi8xLyOWpaz1bHY87rb/NsdUxmNBNDMEB\nO0AD8G8byxN1Bw2DeIbm4UGGRNk/ZEJyMp5kHagoCObDNk2DRcE0tYKg/lDRHODU\nN3njBIgQqxFJexeV2MVRce33EwKBgQC6Yhq9zwBbSjKMximC8SDZvpMQ7U1qj5kP\nABWaAKrrR4W6FKdNArINwlp1LGNI1VliJ2BB6vId9R5ZPVlX9OxSjx4ynKjNkr0W\njbh4O5VKFvmDpgAaVzKU3QAfsafghxhFNx/xCa1yffPt6dcRvb5pRKzD2jOx4z6c\ngjT6tSzgMQKBgEf3HpeZLyQbs1+7fIjVys+DGSiTU+2Qc5iA36R/P1CdV6zLApox\nVySN+mR8ykRRX+o3wR9EuacrsOSX9jD2d33w4gPQondjudSNsce4H65X1DrvHT+q\nDyg/4OPNqomAUlrjBpRLeQ8HUuInq8Cqwof6CpXKTDcyIc+O05SzXhK5AoGAS5Mo\nILrk/B9T6/0WLAA2P9SksYJnl8PuXkS8fZuzsn9n3BIv3GwxYp7iKwz6nTfVbJVm\n1JO95SPVUH4t0hqAEOHzbrZTRDgx8Ak7OZV/bXFvb1BKTmP5IJ+UQ0W4OrTMxJQb\noZM4/2nPFTNyf8EeinTMUQYTXBg29SNe9CGutqECgYB8xZ9MaAnaovJTJNWaGY8a\nrfstK1hJ9Pl6/43eejWTYEHsxvkWtIutJIROCPm+1M/3lyybdPtQdU5XM8ZePDW2\nC9YYrrewUbpZTW57Ths59hV35aD7wOWR2tn6huIBcRAJsJ4rc8IK4RZqjMtP6N98\nzb0iWr8QGTSm61c0WK38aw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-1h4gn@islamapp-37fc4.iam.gserviceaccount.com",
    "client_id": "111374063546365166105",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1h4gn%40islamapp-37fc4.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Middleware to check if user is authenticated
const checkAuth = async (req, res, next) => {
  const sessionCookie = req.cookies.session || '';
  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    req.user = decodedClaims;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post('/sessionLogin', async (req, res) => {
  const idToken = req.body.idToken;
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    res.cookie('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
    res.end(JSON.stringify({ status: 'success' }));
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

app.get('/sessionLogout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});