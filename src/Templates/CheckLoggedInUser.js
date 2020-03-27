const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    currentUser: state.userAuth.currentUser
  };
};
const actions = {
  setCurrentUser,
  fetchAllProjectsByUser
};
