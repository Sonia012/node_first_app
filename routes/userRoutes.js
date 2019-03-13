const jsonfile = require('jsonfile');
const file_path = `./DB/users.json`;

module.exports = app => {
  app.get("/users", (req, res) => {
    console.log("Fetching all users");

    jsonfile.readFile(file_path, function(err, content) {
      res.send(content)
    })
  });


  app.post("/users/new", (req, res) => {
    console.log(req.body);
    let email = req.body.email
    let username = req.body.username

    jsonfile.readFile(file_path, function(err, content) {

      content.push({
        email: email,
        username: username
      });

      console.log("added " + email + "to DB");

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });
      res.sendStatus(200);
    })
  })


  app.delete("/users/destroy", (req, res) => {
    let email = req.body.email;
    jsonfile.readFile(file_path, function(err, content) {
      for(let i = content.length - 1; i >= 0; i--) {
        if(content[i].email === email) {
          console.log("removing " + content[i].email + " from DB");
          content.splice(i, 1)
        }
      }
      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err)
      });
      res.sendStatus(200)
    })
  })


  app.put("/user", (req, res) => {

    let user;
    let username = req.body.username;
    let email = req.query.email;

    jsonfile.readFile(file_path, function(err, content) {
      for(let i = content.length - 1; i >= 0; i--) {
        if(content[i].email === req.query.email) {
          console.log("updated user " + req.query.email + " has now username : " + username);

          user = content[i];
          user.username = username;
        }
      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err)
      });
    });
    res.send(user);
  })

  app.get("/user", (req, res) => {
    let user;
    let email = req.query.email;

    jsonfile.readFile(file_path, function(err, content) {
      for(let i = content.length - 1; i >= 0; i--) {
        if(content[i].email === email) {
          console.log("found user" + content[i]);
          console.log(content[i]);
          user = content[i]
        }
      }
      res.send(user);
    })
  })
}
