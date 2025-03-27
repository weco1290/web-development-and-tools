export function render({ state, appEl }) {
  const html = `
   <main class="main-content">
     ${generateStatusHtml(state)}
     ${generateLoginHtml(state)}
     ${generateContentHtml(state)}
   </main>
  `;
  appEl.innerHTML = html;
}

function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return ``;
  }

  const getMessageList = state.isMessagePending
    ? `<div class="messages__waiting">Loading Messages...</div>`
    : `<ol class="messages">` +
      state.messages
        .map(
          (item) => `
      <li>
          <div class="message">
            <div class="sender-info">
              <span class="username">${item.sender}</span>
            </div>
          <p class="message-text">${item.text}</p>
          </div>
      </li>`
        )
        .join("") +
      `</ol>`;
  const getUserList = state.isUserPending
    ? `<div class="users__waiting">Loading User's list...</div>`
    : `<aside class="sidebar"><ul class="users">` +
      Object.values(state.users)
        .map(
          (user) => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `
        )
        .join("") +
      `</ul></aside>`;
  return `
      <form action="/logout" method="POST">
                <button class="logout" type="submit">Logout</button>
                </form>
                ${getUserList}
          <h1>Welcome, ${state.username}!</h1>
                
                ${getMessageList}
                <div class="outgoing">
                <form action="/update" method="POST">
                <label for="to-send">Message:</label>
                <input type="text" class="to-send" id="to-send" name="newWord"/>
                <button class ="update" type="submit">Send</button>
                </form>
                </div>
  `;
}

export function updateStoredWords(storedWordList) {
  const messagesList = storedWordList
    .map(
      (item) => `
  <li>
      <div class="message">
        <div class="sender-info">
          <span class="username">${item.sender}</span>
        </div>
      <p class="message-text">${item.text}</p>
      </div>
  </li>`
    )
    .join("");

  const storedWordsEl = document.querySelector(".messages");
  if (storedWordsEl) {
    storedWordsEl.innerHTML = messagesList;
    storedWordsEl.scrollTop = storedWordsEl.scrollHeight;
  }
}

export function updateUserLists(userList) {
  const updateUserLists = userList
    .map(
      (user) => `
<li>
  <div class="user">
    <span class="username">${user}</span>
  </div>
</li>
`
    )
    .join("");

  const userListsEl = document.querySelector(".users");
  if (userListsEl) {
    userListsEl.innerHTML = updateUserLists;
  }
}

function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `;
  }
  if (state.isLoggedIn) {
    return ``;
  }

  if (!state.username) {
    return `
      <div class="login">
        <form id="loginForm">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
            <button class ="login" type="submit">Login</button>
      </div>
  `;
  }
}

function generateStatusHtml(state) {
  return `
      <div class="status">${state.errorMessage}</div>
  `;
}
