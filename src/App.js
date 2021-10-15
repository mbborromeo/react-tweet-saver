import { useState, useEffect, useCallback } from 'react';
import FormInput from './components/FormInput';
import TweetItem from './components/TweetItem';
import './App.css';

/* Resource: https://stackoverflow.com/questions/56727680/using-node-js-to-retrieve-twitter-from-user-input-from-browser */
function App() {
  const [apiResponse, setApiResponse] = useState('');
  const [savedTweetsGlobalArray, setSavedTweetsGlobalArray] = useState([]);

  const dragover_handler = (ev) => {
    ev.preventDefault();
    console.log( "inside dragover" );
  };

  /* save to HTML5 Local Storage */
  const drop_handler = useCallback(
    (ev) => {
      ev.preventDefault();
      
      //get ID of the item dropped
      const fromID = ev.dataTransfer.getData("text"); 
      console.log( "inside drop - element's text is: " + fromID );
      
      //get div element of the item dragged from search list and dropped in save area
      const htmlDiv = document.getElementById( fromID );
      
      //append HTML element to the drop zone/save area
      ev.target.appendChild( htmlDiv );    

      //get the index of the dragged tweet
      var indexOfDraggedTweet = htmlDiv.dataset.index;
      console.log('drop_handler - index of dragged tweet', indexOfDraggedTweet)

      //populate tweetObject using the index reference, before pushing it to global array
      var tweetObject = {
        user_name: apiResponse.data.statuses[indexOfDraggedTweet].user.name,
        text: apiResponse.data.statuses[indexOfDraggedTweet].text,
        createdAt: apiResponse.data.statuses[indexOfDraggedTweet].created_at,
        user_profileImageUrlHttps: apiResponse.data.statuses[indexOfDraggedTweet].user.profile_image_url
      }
    
      //push tweet object to top of array allPosts.
      const copyOfSavedTweets = [...savedTweetsGlobalArray, tweetObject];
      //copyOfSavedTweets.push( tweetObject );
      //savedTweetsGlobalArray.push( tweetObject );  
      setSavedTweetsGlobalArray( copyOfSavedTweets );

      //can only store text, so need to stringify. Remove Javascript related functionality.            
      var savedTweetsGlobalArrayStringified = JSON.stringify( savedTweetsGlobalArray );

      //locally save savedTweetsGlobalArray.  localStorage is a Javascript built-in variable, https://www.w3schools.com/html/html5_webstorage.asp
      localStorage.setItem("savedTweetsGlobalArrayLocalStorage", savedTweetsGlobalArrayStringified);
      
    }, 
    [apiResponse.data.statuses, savedTweetsGlobalArray]
  );

  /* run after component has mounted */
  useEffect(
    () => {
      const divSavedTweets = document.getElementById("savedTweets");

      /* add event listeners */
      divSavedTweets.addEventListener("dragover", dragover_handler, false );
      divSavedTweets.addEventListener("drop", drop_handler, false );

      /* load saved Tweets *********************************************************/
      let dataAsText = localStorage.getItem("savedTweetsGlobalArrayLocalStorage");

      if( dataAsText ){
        setSavedTweetsGlobalArray( JSON.parse(dataAsText) ); //adds back Javascript functionality, because it is now a Javascript object.
      }
      /* end - load saved Tweets *********************************************************/
    },
    [drop_handler]
  );

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

          <div id="savedTweets" className="list">   
          { savedTweetsGlobalArray && savedTweetsGlobalArray.length > 0 &&
            savedTweetsGlobalArray.map( (item, i) => (
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
