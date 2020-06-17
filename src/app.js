const express = require("express");
const cors = require("cors");
const { isUuid, uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  var likes = 0;
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes,
  };
  repositories.push(repositorie);

  response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
