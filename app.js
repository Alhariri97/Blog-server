const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");
const { render } = require("ejs");

// expresss app
const app = express();

// conect to data base
const dbURI =
  "mongodb+srv://abdul:abdul@cluster0.ze4bj.mongodb.net/node-js?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);

    console.log("conected to data base");
  })
  .catch((err) => {
    console.log("err");
  });
// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//

//
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) //to change the order
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// HANDleing the delete coming from js front end from the details page
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Creat New Blog" });
});

// 404 not found
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
