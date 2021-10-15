const TweetItem = ({ text, username, profileImage, dateCreated, tweetId }) => {
  return (
    <div key={ tweetId }>
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
