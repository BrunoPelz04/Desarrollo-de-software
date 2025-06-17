//CRUD en memoria

//Liberia que nos ayuda a gestionar la aplicación web
const express = require("express");
const app = express();

//Libreria que nos ayuda leer el body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.json({ mensaje: "Hola mundo" });
});

let peliculas = [
  {
    id: 1,
    titulo: "Thelma",
    resumen: "Un anciana ha sido estafada, pero el dara con el culpable",
    visto: false,
  },
  {
    id: 2,
    titulo: "RRR",
    resumen: "Primeros levantamientos de la India en la colonización inglesa",
    visto: true,
  },
];

function obtenerPorId(id) {
    let pelicula = peliculas.find((x) => x.id == id);

  return pelicula;
}

function obtenerTodos() {
    
  return peliculas;
}

function agregar(pelicula) {
  let id = peliculas.length + 1;
  pelicula.id = id;
  peliculas.push(pelicula);

  return id;
}

app.get("/api/peliculas", (req, res) => {
  let peliculas = obtenerTodos();
  res.status(200).json(peliculas);
});

app.get("/api/peliculas/:id", (req, res) => {
  //console.log(req.params.id)
  let pelicula = obtenerPorId(req.params.id);
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

app.listen(3000, () => {
  console.log("http://localhost:3000");
});