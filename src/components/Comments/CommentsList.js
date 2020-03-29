import React from "react";
import { connect } from "react-redux";
import CommentsListItem from "./CommentsListItem";

const CommentsList = (props) => {
  console.log(props);
  return (
    <div>
      <CommentsListItem />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    comments: state.projects.comments
  };
};

export default connect(mapStateToProps, null)(CommentsList);
