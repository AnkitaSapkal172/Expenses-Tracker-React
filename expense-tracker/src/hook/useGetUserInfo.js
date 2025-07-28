export const useGetUserInfo = () => {
  const authInfo = JSON.parse(localStorage.getItem("auth"));
  if (!authInfo) return {};

  const { name, profilePhoto, userId, isAuth } = authInfo;
  return { name, profilePhoto, userId, isAuth };
};
