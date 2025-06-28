/**
 * Checks if userUsername URL param matches given user, usually from UserContext.
 *
 */
export const isDomainForOwner = (userObj, userUsernameParam) => {
  //   const { user } = useContext(UserContext);
  //   const { userUsername } = useParams();
  if (!userObj || !userUsernameParam) return false;

  return userObj.username === userUsernameParam;
};
