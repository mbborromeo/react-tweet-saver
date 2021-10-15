const TweetItem = ({ clickHandler, text, username, profileImage, dateCreated, tweetId, index }) => {
  const dragstart_handler = (ev) => {                            
    ev.dataTransfer.setData("text/plain", ev.target.id);   
  };

  return (
    <div 
      id={ tweetId } 
      onClick={ clickHandler }
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
