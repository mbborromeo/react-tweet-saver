const TweetItem = ({ tweetId, index, text, username, profileImage, dateCreated }) => {
  const dragstart_handler = (ev) => {                            
    ev.dataTransfer.setData("text/plain", tweetId); // ev.target.id
  };

  return (
    <div 
      id={ tweetId }
      data-index={ index }
      draggable="true"
      onDragStart={ dragstart_handler }
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
