const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.use(cors());
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post( '/search', function (req, res, next){
  T.get(
    'search/tweets', 
    {
      q: req.body.searchQuery, // 'nyc'
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


/*
// Needle approach 
// (https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Recent-Search/recent_search.js)
// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search
const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = 'AAAAAAAAAAAAAAAAAAAAAPKqUgEAAAAABtCQBVTOMgEL0cgCt9F2S5lWOyQ%3D03ylF36C9LVTsCVSWFRydH05QDm3lR66wXmnRfzv3ZPw6oI7wC'; //process.env.BEARER_TOKEN
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

async function getRequest() {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
      // 'query': 'from:twitterdev -is:retweet',
      // 'tweet.fields': 'author_id'
      'q': 'nyc',
      'count': 10
  }

  const res = await needle('get', endpointUrl, params, {
      headers: {
          "User-Agent": "v2RecentSearchJS",
          "authorization": `Bearer ${token}`
      }
  })

  if (res.body) {
      return res.body;
  } else {
      throw new Error('Unsuccessful request');
  }
}

(async () => {
  try {
      // Make request
      const response = await getRequest();
      console.dir(response, {
          depth: null
      });

  } catch (e) {
      console.log(e);
      process.exit(-1);
  }
  process.exit();
})();
*/