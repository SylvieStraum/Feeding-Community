const rejectNotOvernight = (req, res, next) => {
  // check if logged in and if account type is specific for logging save-day at start of each day
  if (req.isAuthenticated() && req.user.account_type <= 8) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectNotOvernight };
