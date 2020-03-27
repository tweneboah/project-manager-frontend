const getUserToken = async () => {
  const userToken = await JSON.parse(localStorage.getItem("user"));

  if (!userToken) return;
  return userToken;
};

export default getUserToken;
