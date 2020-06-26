import passport from "passport";
import User from "../sequelize";

module.exports = (app) => {
  app.post("/registerUser", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        req.logIn(user, (error) => {
          const data = {
            username: user.username,
          };
          User.findOne({
            where: {
              username: data.username,
            },
          }).then((user) => {
            res.status(200).send({ message: "user created" });
          });
        });
      }
    })(req, res, next);
  });
};
