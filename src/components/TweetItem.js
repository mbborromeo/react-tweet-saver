const TweetItem = ({ clickHandler, text, username, profileImage, dateCreated, tweetId, index }) => {
  return (
    <div 
      id={ tweetId } 
      onClick={ clickHandler }
      data-index={ index }
    >
      <img src={ profileImage } alt={ username } />
      <br />
      <span><b>{ username }</b></span>
      <br />
      <span>{ text }</span>
      <br />
      <span>{ dateCreated }</span>
    </div>
  );
};

export default TweetItem;
