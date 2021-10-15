import { useState, useEffect } from 'react';
import FormInput from './components/FormInput';

/* Resource: https://stackoverflow.com/questions/56727680/using-node-js-to-retrieve-twitter-from-user-input-from-browser */
function App() {
  const [apiResponse, setApiResponse] = useState('');

  const searchTweets = (keyword) => {
    fetch(
      'http://localhost:4000/search', // https://api.twitter.com/1.1/search/tweets.json
      {
        method: "POST",
        body: JSON.stringify({
          searchQuery: keyword, // value from input field
          count: 10,
        }),        
        headers: {
          "Content-Type": "application/json"
        },
      }
    )
    .then( res => {
      const response = res.json();
      console.log('response is', response );
      return response;
    })
    .then(
      res => setApiResponse(res)
    )
    .catch( err => err );
  };
    
  /* 
    0. use authentification to call Twitter API
    1. search Twitter by keyword from input field and limit to 10 results upon button click
    2. display results in left column list
    3. make left-column items draggable
    4. make a hotspot in right-column so left-column items can be dropped there
    5. upon drop, save these Tweets to HTML5 Local Storage
  */
  return (
    <div>
      <FormInput searchFunction={ searchTweets } />
      <br />
      { apiResponse && apiResponse.data && apiResponse.data.statuses && apiResponse.data.statuses.length > 0 &&
        <span>Response number 1 is...: 
          { apiResponse.data.statuses[0].text }
        </span>    
      }
    </div>
  );
}

export default App;
