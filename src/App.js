import { useEffect } from 'react';
import axios from 'axios-jsonp-pro'; //https://www.npmjs.com/package/axios-jsonp-pro

function App() {
  // let globalData = '';

  /*
  useEffect(
    () => {
      
    },
    []
  );
  */

  // Axios approach
  axios.jsonp(
    'http://localhost:4000/search', // https://api.twitter.com/1.1/search/tweets.json
    {
      timeout: 60*1000,
      params: {
        q: 'nyc',
        count: 10
      }
    }
  )
  .then(function (response) {
    console.log('response is', response);
    // globalData = response;
  })
  .catch(function (error) {
    console.log(error);
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
      Display response here: {/* globalData */}
    </div>
  );
}

export default App;
