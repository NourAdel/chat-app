const Users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = Users.find(
    user => user.room === room && user.name === name
  );
  if (existingUser) {
    return  "Username is already taken" ;
  }

  const user = { id, name, room };
  Users.push(user);
  return user;
};

const removeUser = id => {
  const index = Users.findIndex(user => user.id === id);

  if (index) {
    return Users.splice(index, 1)[0];
  }
};

const getUser = id => Users.find(user => user.id === id);

const getUsersInRoom = room => Users.filter(user => user.room === room);

module.exports = { addUser, getUser, getUsersInRoom, removeUser };
