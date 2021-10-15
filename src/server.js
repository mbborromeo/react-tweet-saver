const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const Twit = require('twit');

const T = new Twit({
  consumer_key:         '5o1RYoil51gq82SnY88VXkW2d',
  consumer_secret:      'xJm8PGdsYpONhWMROhYoyfDWPUqGZwrVBMms6UpRlk4sFa23S8',
  app_only_auth:        true,
  //access_token:         '438089030-DFGLRhmN7GI0wmOpRLFgwCx7g2uROUwo5fMg2n9S',
  //access_token_secret:  'Btjm1h5Ph4U5F4ixQZO6ORbEtQtVQC791ag5S6f3nZsW2',
  // using Bearer Token for access_token
  // access_token:         'AAAAAAAAAAAAAAAAAAAAAPKqUgEAAAAABtCQBVTOMgEL0cgCt9F2S5lWOyQ%3D03ylF36C9LVTsCVSWFRydH05QDm3lR66wXmnRfzv3ZPw6oI7wC',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            false,     // optional - requires SSL certificates to be valid.
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.post( '/search', function (req, res, next){
  T.get(
    'search/tweets', 
    {
      q: 'nyc', // req.body.searchQuery
      count: 10
    }, 
    function (err, data, response){
      console.log('data is', data)
      return res.json({
        data: data
      });
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
