import { useState, useEffect, useCallback } from 'react';
import FormInput from './components/FormInput';
import TweetItem from './components/TweetItem';
import './App.css';

// Resource: https://stackoverflow.com/questions/56727680/using-node-js-to-retrieve-twitter-from-user-input-from-browser
function App() {  
  const [searchResultTweets, setSearchResultTweets] = useState([]);
  const [savedTweets, setSavedTweets] = useState([]);

  const dragover_handler = (ev) => {
    ev.preventDefault();
  };

  const saveTweet = useCallback(
    (tid) => {
      const tweetObject = searchResultTweets.find( (tweet) => (tweet.id === tid) );

      // Add tweet on saved list on right column
      const savedTweetsUpdated = [...savedTweets, tweetObject];
      setSavedTweets(savedTweetsUpdated);
      
      // HTML5 localStorage can only store text, so need to change array/object to String before saving, 
      // which removes Javascript functionality.      
      const savedTweetsGlobalArrayStringified = JSON.stringify( savedTweetsUpdated );
      localStorage.setItem("savedTweetsGlobalArrayLocalStorage", savedTweetsGlobalArrayStringified);
    
      // Remove tweet from search list on left column
      const resultTweets = searchResultTweets.filter(t => (t.id !== tid));
      setSearchResultTweets(resultTweets); 
    },
    [searchResultTweets, savedTweets]
  );

  const drop_handler = useCallback(
    (ev) => {
      ev.preventDefault();
      const tweetID = parseInt( ev.dataTransfer.getData("text") );

      if(savedTweets && savedTweets.length > 0){
        const isTweetAlreadySaved = (tweet) => (tweet.id === tweetID);
        // Check if dragged tweet exists in saved list. findIndex returns -1 if no element found
        const tweetArrayIndex = savedTweets.findIndex( isTweetAlreadySaved );

        if(tweetArrayIndex === -1){
          saveTweet(tweetID);
        }
      } else {
        // Saved tweets currenty empty
        saveTweet(tweetID);
      }
    }, 
    [savedTweets, saveTweet]
  );

  // Run after component has mounted
  useEffect(
    () => {
      // Load Tweets saved onto HTML5 localStorage
      let dataAsString = localStorage.getItem("savedTweetsGlobalArrayLocalStorage");

      if( dataAsString ){
        // Change string back to Javascript object
        const dataAsObject = JSON.parse(dataAsString)
        setSavedTweets( dataAsObject ); 
      }
    },
    []
  );

  const searchTweets = (keyword) => {
    fetch(
      'http://localhost:4000/search', // Equiv to https://api.twitter.com/1.1/search/tweets.json
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
    .then( dataObj => (dataObj.data.statuses) )
    .then( searchResults => setSearchResultTweets(searchResults) )
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
          { searchResultTweets && searchResultTweets.length > 0 &&
            searchResultTweets.map( (item, i) => (
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
          { savedTweets && savedTweets.length > 0 &&
            savedTweets.map( (item, i) => (
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
      </div>
    </div>
  );
}

export default App;
