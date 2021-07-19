const User = require("../models/user");

module.exports.profile = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log("err in finding profile");
      return;
    }
    return res.render("profile", { profile_user: user });
  });
};

module.exports.update = (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.profile_name, email: req.body.profile_email },
      (err, user) => {
        req.flash("success", "Profile updated.");
        return res.redirect("back");
      }
    );
  } else {
    req.flash("error", "You can only edit your own profile.");
    return res.status(401).send("unauthorised");
  }
};
