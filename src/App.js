import { useState, useEffect, useCallback } from 'react';
import FormInput from './components/FormInput';
import TweetItem from './components/TweetItem';
import './App.css';

/* Resource: https://stackoverflow.com/questions/56727680/using-node-js-to-retrieve-twitter-from-user-input-from-browser */
function App() {  
  const [apiResponse, setApiResponse] = useState({});
  const [savedTweets, setSavedTweets] = useState([]);
  console.log('App apiResponse', apiResponse)
  console.log('App savedTweets', savedTweets)

  const dragover_handler = (ev) => {
    ev.preventDefault();
  };

  const saveTweet = useCallback(
    (tid) => {
      //populate tweetObject using the index reference, before pushing it to global array
      const tweetObject = apiResponse.data.statuses.filter( (tweet) => (tweet.id === tid) );
      console.log('tweetObject', tweetObject)
      
      const savedTweetsUpdated = [...savedTweets, tweetObject];
      console.log('savedTweetsUpdated', savedTweetsUpdated)
      // add tweet on saved list on right column (add to saved tweet array)
      setSavedTweets(savedTweetsUpdated);
      
      //can only store text, so need to stringify. Remove Javascript related functionality.            
      const savedTweetsGlobalArrayStringified = JSON.stringify( savedTweetsUpdated );

      //locally save tweets.  localStorage is a Javascript built-in variable, https://www.w3schools.com/html/html5_webstorage.asp
      localStorage.setItem("savedTweetsGlobalArrayLocalStorage", savedTweetsGlobalArrayStringified);
    
      // remove tweet from search list on left column (remove from searched tweet array)
      const searchResultTweets = apiResponse.data.statuses.filter(t => t.id !== tid);
      console.log('searchResultTweets', searchResultTweets)
      setApiResponse(searchResultTweets); 
    },
    [apiResponse, savedTweets]
  );

  const drop_handler = useCallback(
    (ev) => {
      ev.preventDefault();
      
      //get ID of the item dropped
      const tweetID = ev.dataTransfer.getData("text"); 
      console.log( "inside drop - element's ID (Tweet ID) is: " + tweetID );

      if(savedTweets && savedTweets.length > 0){
        console.log('savedTweets not empty')
        // check if dragged tweet exists in saved list
        const isTweetAlreadySaved = (tweet) => (tweet.id === tweetID);
        // findIndex returns -1 if no element is found
        const tweetArrayIndex = savedTweets.findIndex( isTweetAlreadySaved );
        console.log('tweetArrayIndex', tweetArrayIndex)

        // if it does, then do not proceed. else continue
        if(tweetArrayIndex === -1){
          saveTweet(tweetID);
        } else {
          console.log('tweet already saved - tweetArrayIndex returned:', tweetArrayIndex)
        }
      } else {
        console.log('savedTweets currenty empty')
        saveTweet(tweetID);
      }
    }, 
    [savedTweets, saveTweet]
  );

  /* run after component has mounted */
  useEffect(
    () => {
      // load saved Tweets
      let dataAsText = localStorage.getItem("savedTweetsGlobalArrayLocalStorage");

      if( dataAsText ){
        setSavedTweets( JSON.parse(dataAsText) ); //adds back Javascript functionality, because it is now a Javascript object.
      }
    },
    []
  );

  const searchTweets = (keyword) => {
    fetch(
      'http://localhost:4000/search', // https://api.twitter.com/1.1/search/tweets.json
      {
        method: "POST",
        body: JSON.stringify({
          searchQuery: keyword,
          count: 10,
        }),        
        headers: {
          "Content-Type": "application/json"
        },
      }
    )
    .then( res => (res.json()) )
    .then( dataObj => setApiResponse(dataObj) )
    .catch( err => err );
  };
    
  return (
    <div>
      <h1>Tweet Saver</h1>
      <hr />
      <br />

      <div className="flex-wrapper">
        <div className="col-half">
          <FormInput searchFunction={ searchTweets } />
          
          <div id="searchResults" className="list">
          { apiResponse && apiResponse.data && apiResponse.data.statuses && apiResponse.data.statuses.length > 0 &&
            apiResponse.data.statuses.map( (item, i) => (
              <TweetItem 
                key={ item.id }
                tweetId={ item.id }                
                index={ i }
                username={ item.user.name }
                profileImage={ item.user.profile_image_url }
                text={ item.text } 
                dateCreated={ item.created_at }
              />
            ))          
          }
          </div>
        </div>

        <div className="col-half">
          <div className="top-wrapper">
            <h3>Saved Tweets</h3>
          </div>

          <div id="savedTweets" className="list" onDrop={ drop_handler } onDragOver={ dragover_handler }>   
          {/* { savedTweets && savedTweets.length > 0 &&
            savedTweets.map( (item, i) => (
              <TweetItem 
                key={ item.id }
                tweetId={ item.id }                
                index={ i }
                // username={ item.user.name }
                // profileImage={ item.user.profile_image_url }
                text={ item.text } 
                dateCreated={ item.created_at }
              />
            ))
          } */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
