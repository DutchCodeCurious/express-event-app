import userData from "../../data/users.json" assert { type: "json" };

const getUsers = () => {
  let users = userData.users;
  return users;
};

export default getUsers;
