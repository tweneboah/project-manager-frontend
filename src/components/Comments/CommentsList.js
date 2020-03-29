import React from "react";
import { connect } from "react-redux";
import CommentsListItem from "./CommentsListItem";

const CommentsList = (props) => {
  const { comments } = props;
  console.log("comments comp", comments);
  return (
    <div>
      {comments.length > 0 && (
        <div>
          {comments.map((comment) => {
            return (
              <div>
                <CommentsListItem comment={comment} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    comments: state.projects.comments
  };
};

export default connect(mapStateToProps, null)(CommentsList);
