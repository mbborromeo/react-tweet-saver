function App() {
  let response = '';

  // Twit NPM package
  var Twit = require('twit');
  
  var T = new Twit({
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

  T.get('search/tweets', { q: 'nyc', count: 10 }, function(err, data, response) {
    console.log('data is', data);
    response = data;
  });

  /*
  // Code Snippet from Postman
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
      response = this.responseText;
    }
  });

  xhr.open(
    "GET", 
    "https://api.twitter.com/2/tweets/search/recent?max_results=10&query=nyc"
  );
  xhr.setRequestHeader(
    "Authorization", 
    "Bearer AAAAAAAAAAAAAAAAAAAAAPKqUgEAAAAABtCQBVTOMgEL0cgCt9F2S5lWOyQ%3D03ylF36C9LVTsCVSWFRydH05QDm3lR66wXmnRfzv3ZPw6oI7wC"
  );
  xhr.setRequestHeader(
    "Cookie", 
    "guest_id=v1%3A163418102001946888; personalization_id=\"v1_YJauUDdJ/Bwr80ryyHHP9Q==\""
  );
  xhr.send();
  */

  /* 
    0. use authentification to call Twitter API
    1. search Twitter by keyword and limit to 10 results upon button click
    2. display results in left column list
    3. make left-column items draggable
    4. make a hotspot in right-column so left-column items can be dropped there
    5. upon drop, save these Tweets to HTML5 Local Storage
  */
  return (
    <div>
      Response: { response }
    </div>
  );
}

export default App;
