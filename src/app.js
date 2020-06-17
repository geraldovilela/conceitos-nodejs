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
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repoIndexId = repositories.findIndex(repositorie => repositorie.id == id);
  var updatedRepositorie = {};
  if (repoIndexId < 0) {
    return response.status(400).json({ erro: "invalid repositorie." })
  } else {
    updatedRepositorie = repositories[repoIndexId];
    updatedRepositorie.title = title;
    updatedRepositorie.url = url;
    updatedRepositorie.techs = techs;
  }
  repositories[repoIndexId] = updatedRepositorie;

  return response.json(repositories[repoIndexId]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndexId = repositories.findIndex(repositorie => repositorie.id == id);
  if (repoIndexId < 0) {
    return response.status(400).json({ erro: "invalid repositorie." })
  }
  repositories.splice(repoIndexId, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id, like } = request.params
  const repoIndexId = repositories.findIndex(repositorie => repositorie.id == id);
  var updatedRepositorie = {};
  if (repoIndexId < 0) {
    return response.status(400).json({ erro: "invalid repositorie." })
  } else {
    updatedRepositorie = repositories[repoIndexId];
    updatedRepositorie.likes = updatedRepositorie.likes + 1
  }
  repositories[repoIndexId] = updatedRepositorie;

  response.json(repositories[repoIndexId]);
});

module.exports = app;
