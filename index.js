const express = require("express");

const server = express();

server.use(express.json());

const projetos = [];

// Creating Middlewares

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const projeto = projetos.find((proj) => proj.id == id);

  if (!projeto) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  next();
}

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: [],
  };

  projetos.push(project);

  return res.json(projetos);
});

server.get("/projects", (req, res) => {
  return res.json(projetos);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;

  const novoProjeto = req.body;

  projetos[id] = novoProjeto;

  return res.json(projetos);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projetos.splice(id, 1);

  return res.json(projetos);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;

  const { title } = req.body;
  console.log("estou aqui");

  const project = projetos.find((p) => p.id == id);

  project.tasks.push(title);

  return res.json(projetos[id]);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
