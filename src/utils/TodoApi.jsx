import _superagent from "superagent";
const SuperagentPromise = require("superagent-promise");
const superagent = SuperagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_URL || "http://localhost:8000/";

const responseBody = (res) => res.body;

let token = "";
const tokenPlugin = (req) => {
  if (token) {
    console.log("finalToken =>", token);
    req.set("Authorization", `Bearer ${token}`);
  }
};

// console.log("token is ", token);

const requests = {
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Users = {
  list: () => requests.get(`users`),
  get: (id) => requests.get(`users/${id}`),
  update: (id, body) => requests.put(`users/${id}`, body),
  create: (item) => requests.post(`users/register`, item),
  login: (item) => requests.post(`users/login`, item),
  delete: (id) => requests.del(`users/${id}`),
};

const Tasks = {
  list: () => requests.get(`tasks`),
  get: (id) => requests.get(`tasks/${id}`),
  update: (id, body) => requests.put(`tasks/${id}`, body),
  create: (item) => requests.post(`tasks`, item),
  delete: (id) => requests.del(`tasks/${id}`),
};

const UserTasks = {
  list: () => requests.get(`usertasks`),
  get: (id) => requests.get(`usertasks/${id}`),
  getByUser: (id) => requests.get(`usertasks/user/${id}`),
  update: (id, body) => requests.put(`usertasks/${id}`, body),
  create: (item) => requests.post(`usertasks/`, item),
  delete: (id) => requests.del(`usertasks/${id}`),
};

const TodoApi = {
  Users,
  Tasks,
  UserTasks,
  setToken: (_token) => {
    token = _token;
  },
};

export default TodoApi;
