import { useState, useEffect, useCallback } from 'react';
import FormInput from './components/FormInput';
import TweetItem from './components/TweetItem';
import './App.css';

/* Resource: https://stackoverflow.com/questions/56727680/using-node-js-to-retrieve-twitter-from-user-input-from-browser */
function App() {
  const [apiResponse, setApiResponse] = useState({});
  const [newlySavedTweets, setNewlySavedTweets] = useState([]);
  const [previouslySavedTweets, setPreviouslySavedTweets] = useState([]);
  console.log('App apiResponse', apiResponse)
  console.log('App newlySavedTweets', newlySavedTweets)
  console.log('App previouslySavedTweets', previouslySavedTweets)

  const dragover_handler = (ev) => {
    ev.preventDefault();
  };

  const drop_handler = useCallback(
    (ev) => {
      ev.preventDefault();
      
      //get ID of the item dropped
      const fromID = ev.dataTransfer.getData("text"); 
      console.log( "inside drop - element's ID is: " + fromID );
      
      //get div element of the item dragged from search list and dropped in save area
      const htmlDiv = document.getElementById( fromID );
      
      //append HTML element to the drop zone/save area
      ev.target.appendChild( htmlDiv );    
  
      //get the index of the dragged tweet
      const indexOfDraggedTweet = htmlDiv.dataset.index;
      console.log('drop_handler - index of dragged tweet', indexOfDraggedTweet)
  
      /********** save to HTML5 Local Storage ********************/
      //populate tweetObject using the index reference, before pushing it to global array
      const tweetObject = apiResponse.data.statuses[indexOfDraggedTweet];
      
      //push tweet object to top of array
      const copyOfSavedTweets = [...newlySavedTweets, tweetObject];
      setNewlySavedTweets( copyOfSavedTweets );

      const oldAndNewSavedTweets = [...previouslySavedTweets, ...newlySavedTweets, tweetObject];
  
      //can only store text, so need to stringify. Remove Javascript related functionality.            
      const savedTweetsGlobalArrayStringified = JSON.stringify( oldAndNewSavedTweets );
  
      //locally save newlySavedTweets.  localStorage is a Javascript built-in variable, https://www.w3schools.com/html/html5_webstorage.asp
      localStorage.setItem("savedTweetsGlobalArrayLocalStorage", savedTweetsGlobalArrayStringified);
    }, 
    [apiResponse, previouslySavedTweets, newlySavedTweets]
  );

  /* run after component has mounted */
  useEffect(
    () => {
      // load saved Tweets
      let dataAsText = localStorage.getItem("savedTweetsGlobalArrayLocalStorage");

      if( dataAsText ){
        setPreviouslySavedTweets( JSON.parse(dataAsText) ); //adds back Javascript functionality, because it is now a Javascript object.
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
          { previouslySavedTweets && previouslySavedTweets.length > 0 &&
            previouslySavedTweets.map( (item, i) => (
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
