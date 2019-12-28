const Users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = Users.find(
    user => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is already taken" };
  }

  const user= {id, name,room}

  Users.push(user)
  return(user)
};

const removeUser = () => {};

const getUser = () => {};

const getUsersInRoom = () => {};
