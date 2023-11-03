const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { ErrorMessage, SuccessMessage } = require("../Utils/ResponseMessage");
const jwt = require("jsonwebtoken");

function authController() {
  return {
    login: async (req, res) => {
      try {
        // validate the req
        if (!req.body.email || !req.body.password) {
          return ErrorMessage(res, 422, "Email and Password is required");
        }
        const loginSchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });

        const { error } = loginSchema.validate(req.body);
        if (error) {
          return ErrorMessage(res, 422, error.message);
        }

        // check useremail
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return ErrorMessage(res, 422, "Email or password incorrect");
        }

        // check user password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return ErrorMessage(res, 422, "Email or password incorrect");
        }

        const accessToken = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        // store  access token  token in cookies
        res.cookie("accesstoken", accessToken, {
          maxAge: 1000 * 60 * 60, // 1 hour
          httpOnly: true,
        });
        const userData = {
          _id: user._id,
          email: user.email,
        };
        return SuccessMessage(res, userData);
      } catch (error) {
        return ErrorMessage(res, 500);
      }
    },
    register: async (req, res) => {
      try {
        // validate req using joi
        const registerSchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{5,15}$"))
            .required()
            .min(8)
            .max(15)
            .messages({
              "string.pattern.base":
                "Password must include alphabets and numbers",
              "string.min": "Password must be minimum 8 character required",
              "string.max": "Password must be upto 15 characters ",
            }),
        });
        if (!req.body.email || !req.body.password) {
          return ErrorMessage(res, 422, "Email and Password is required");
        }
        const { error } = registerSchema.validate(req.body);
        if (error) {
          return ErrorMessage(res, 422, error.message);
        }

        // check if email has not register yet
        const { email, password } = req.body;
        const userEmail = await User.exists({ email: email });
        if (userEmail) {
          return ErrorMessage(res, "Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // register user
        const newUser = new User({
          email,
          password: hashedPassword,
        });

        const isSaved = await newUser.save();
        if (!isSaved) {
          return ErrorMessage(res);
        }

        return SuccessMessage(res, "All ok");
      } catch (error) {
        return ErrorMessage(res);
      }
    },
  };
}

module.exports = authController;
