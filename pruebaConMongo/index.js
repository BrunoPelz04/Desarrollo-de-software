//Liberia que nos ayuda a gestionar la aplicación web
const express = require("express");
const app = express();

//Lamamos al repositorio
const {
  agregar,
  obtenerPorId,
  obtenerTodos,
} = require("./pelicula_repositorio");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("", (req, res) => {
  res.json({ mensaje: "Hola mundo" });
});

app.get("/api/peliculas", async (req, res) => {
  const peliculas = await obtenerTodos();
  res.status(200).json(peliculas);
});
app.get("/api/peliculas/:id", async (req, res) => {
  //console.log(req.params.id)
  let pelicula = await obtenerPorId(req.params.id);
  if (pelicula == undefined)
    return res
      .status(404)
      .json({ mensaje: "Pelicula no encontrada con el id: " + req.params.id });
  return res.status(200).json(pelicula);
});
app.post("/api/peliculas/", (req, res) => {
  console.log(req.body);
  let pelicula = {
    titulo: req.body.titulo,
    visto: false,
    resumen: req.body.resumen,
  };
  let id = agregar(pelicula);
  //pelicula.id = id
  res.status(201).json(pelicula);
});

app.listen(3001, () => {
    
  console.log("http://localhost:3001");
});