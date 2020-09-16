const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { hashPassword, comparePassword } = require("./helpers/auth");
const { User } = require("./models");

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ where: { email: email } });

        // If not, handle it
        if (!user) return done(null, false, { message: "User not found." });

        // Check if the password is correct
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Password doesnot match." });

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        console.log(error);
        done(error, false, { message: "Eror" });
      }
    }
  )
);
