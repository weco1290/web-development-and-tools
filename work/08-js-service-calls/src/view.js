export function renderHomePage(username, storedWord) {
  const appEl = document.getElementById("express-login");
  appEl.innerHTML = `
        <h1>Welcome, ${username}!</h1>
              <p>Your stored word: <strong>${storedWord}</strong></p>
              <form action="/update" method="POST">
              <label for="newWord">Enter new word</label>
              <input type="text" id="newWord" name="newWord"/>
              <button class ="update" type="submit">Update Word</button>
              </form>
              <form action="/logout" method="POST">
              <button class="logout" type="submit">Logout</button>
              </form>
      `;
}

export function renderLoginView() {
  const appEl = document.querySelector("#express-login");
  appEl.innerHTML = `
          
              <h1>Login</h1>
          <form id="loginForm">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" />
          <button class ="login" type="submit">Login</button>
        </form>
          
      `;
}

export function renderErrorMessageView(errorMessage) {
  const appEl = document.querySelector("#express-login");
  appEl.innerHTML = `
          <div id="error-content">
              <p id="error-message">${errorMessage}</p>
              <button class="go-home">Go back to home page</button>
          </div>
      `;
}
