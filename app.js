var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    // pg = require("pg"),
    db = require('./models'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// var config = {
//   database: "articles_app",
//   port: 5432,
//   host:"localhost"
// };

app.get("/articles", function (req, res) {
  console.log("GET /articles");
  db.articles.findAll()
    .then(function (articles) {
      res.render('articles/index', {articlesList: articles});
    });
});

app.get("/articles/new", function (req, res) {
  res.render("articles/new");
});

app.get("/articles/:id", function (req, res) {
  db.articles.find(req.params.id)
    .then(function (articles) {
      res.render("articles/show", {articles: articles});
    });
  // pg.connect(config, function(err, client, done){
  //       if (err) {
  //           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
  //       }
  //       client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
  //           done(); 
  //           console.log(result.rows); 
  //           if (result.rows.length) {
  //             res.render("articles/show", {article: result.rows[0]});
  //           } else {
  //             res.status(404).send("Article Not Found");
  //           }
  //         });
  //       });
  });

app.post("/articles", function (req, res) {
  var newArticles = req.body.articles;
    console.log(req.body.articles);
      db.articles.create({
        title: req.body.articles.title,
        author: req.body.articles.author,
        content: req.body.articles.content
      })
      .then(function (articles) {
        res.redirect("/articles");
      });
    // pg.connect(config, function(err, client, done){
    //     if (err) {
    //          console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    //     }
    //     client.query("INSERT INTO articles (title, author, content) VALUES ($1, $2, $3) RETURNING *", [newArticle.title, newArticle.author, newArticle.content], function (err, result) {
    //         done(); 
    //         console.log(result.rows);  
    //         var article = result.rows[0];   
    //         res.redirect("/articles/" + article.id);   
    //     });

    //   });
  
});

app.delete("/articles/:id", function (req, res) {
  db.articles.find(req.params.id)
  .then(function (articles) {
    articles.destroy()
    .then(function(){});
    res.redirect("/articles");
  });
  // pg.connect(config, function(err, client, done) {
  //   if (err) {
  //     console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
  //   }
  //   client.query("DELETE FROM articles WHERE id=$1", [req.params.id], function (err, result) {
  //     res.redirect("/articles");
  //     done();
  //     console.log(result.rows);
  //   });
  // });
});

app.get("/", function (req, res) {
  res.render("site/index");
});

app.get("/about", function (req, res) {
  res.render("site/about");
});

app.get("/contact", function (req, res) {
  res.render("site/contact");
});

app.get("/articles", function (req, res) {
  res.render("articles/index");
});

app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*")); 
});