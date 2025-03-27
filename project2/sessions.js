const uuid = require("crypto").randomUUID;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
  // Conditional Chaining operator ?.
  // Use MDN to learn more
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getAllSessions() {
  return Object.values(sessions);
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getAllSessions,
};
