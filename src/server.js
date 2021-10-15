const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const Twit = require('twit');

const T = new Twit({
  consumer_key:         '5o1RYoil51gq82SnY88VXkW2d',
  consumer_secret:      'xJm8PGdsYpONhWMROhYoyfDWPUqGZwrVBMms6UpRlk4sFa23S8',
  app_only_auth:        true,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            false,     // optional - requires SSL certificates to be valid.
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.post( '/search', function (req, res, next){
  T.get('search/tweets', {q: req.body.searchQuery, count: 10}, function (err, data, response){
    console.log('data is', data)
    return res.json({
      data: data
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
