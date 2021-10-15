const TweetItem = ({ text, username, profileimage, datecreated }) => {
  return (
    <div>
      <img src={ profileimage } alt={ username } />
      <br />
      <span><b>{ username }</b></span>
      <br />
      <span>{ text }</span>
      <br />
      <span>{ datecreated }</span>
    </div>
  );
};

export default TweetItem;
