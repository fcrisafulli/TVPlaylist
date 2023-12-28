const express = require('express');
const http = require('http');
const app = express();

function getChannelURL(targetUrl) {
    return new Promise((resolve, reject) => {
        http.get(targetUrl, (targetRes) => {
            if (targetRes.statusCode === 301 || targetRes.statusCode === 302) {
                const redirectUrl = targetRes.headers.location;
                resolve(redirectUrl);
            } else {
                reject(null);
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

app.get('/channels', (req, res) => {
  const channelURL = req.query.url;
  console.log(channelURL);
  if (channelURL) {
    getChannelURL(channelURL).then((response) => {
        res.redirect(response);
    }).catch((error) => {
        res.status(500).send('Errore: La URL di destinazione non ha restituito un redirect.');
    });
  } else {
    res.status(404).send('Canale non trovato');
  }
});

app.get("/", (req, res) => { res.send("Express on Vercel"); });

const port = 3000; // Puoi impostare la porta desiderata
app.listen(port, () => {
  console.log(`Il server Express è in ascolto sulla porta ${port}`);
});