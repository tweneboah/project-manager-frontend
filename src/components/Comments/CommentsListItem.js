import React from "react";

const CommentsListItem = (props) => {
  const { message, user } = props.comment;
  const username = user && user.username;
  console.log("comment item", message, user);
  return (
    <div>
      <p>{message}</p>
      <p>Auther : {username}</p>
    </div>
  );
};

export default CommentsListItem;
