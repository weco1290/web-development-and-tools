// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatView = {
  chatPage: function (model) {
    // chatPage() returns the HTML for the page
    // it calls the other methods to generate the HTML for different sections
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatView.getUserList(model)}
            ${chatView.getMessageList(model)}
            ${chatView.getSendMessageForm(model)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (model) {
    return (
      `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      model.messages
        .map(
          (item) => `
      <li>
          <div class="message">
            <div class="sender-info">
              <img
                  class="avatar"
                  alt="user avatar"
                  src="/images/avatar-${item.sender.toLowerCase()}.jpg"
              />
              <span class="username">${item.sender}</span>
            </div>
          <p class="message-text">${item.text}</p>
          </div>
      </li>`
        )
        .join("") +
      `</ol>`
    );
  },

  getUserList: function (model) {
    // This is a bit of a complex structure
    // Lookup Object.values() in MDN
    // .map() generates a new array based on calling the callback
    // on each element of the array
    // So this .map() converts the user names to an array of HTML
    // and .join() converts the array of HTML into a single HTML string
    return (
      `<ul class="users">` +
      Object.values(model.users)
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
      `</ul>`
    );
  },

  getSendMessageForm: function () {
    // Fill in
    // Generate the HTML for a form to send a message
    return `<div class="outgoing">
    <form action="/chat" method="POST">
      <label for="username">
        Username:
        <select id="username" name="username" class="username">
          <option value="Amit">Amit</option>
          <option value="Bao">Bao</option>
        </select>
      </label>

      <label for="to-send">
        Message:
        <input id="to-send" class="to-send" name="text" value=""/>
      </label>

      <button type="submit">Send</button>
    </form>
  </div>
`;
  },
};

// These files demonstrating various ways of building our exports
// so they are inconsistent in ways "real" projects usually wouldn't want

module.exports = chatView;
