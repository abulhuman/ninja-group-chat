// DOM queries
const chatlist = document.querySelector('.chat-list');
const newChatFrom = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const roomBtns = document.querySelectorAll('button.btn');

// add new chat
newChatFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = newChatFrom.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatFrom.reset())
    .catch((err) => console.error(err));
});

// update username
newNameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateUsername(newName);

  // reset the form
  newNameForm.reset();

  // show notification of the name change
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMssg.innerText = ''), 3000);
});

// update the chat room
rooms.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    roomBtns.forEach((btn) => {
      btn.classList.remove('current');
    });
    e.target.classList.add('current');

    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

// check localstorage for a name
const username = localStorage.username
  ? localStorage.username
  : `newUser${Math.floor(Math.random() * 1000000)}`;

// class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats((data) => chatUI.render(data));
