let users = [];

const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  
  if (!name || !room || !id) {
    return { error: "Field is empty!" };
  }
  
  let existingUser = users.find((user) => user.room === room && user.name === name);
  
  if (existingUser) {
    return { error: "Username is taken!" };
  }
  
  let user = {id,name,room};

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  let index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getAllUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getAllUsersInRoom, getUser };
