const {
  userSignUpSchema,
  userLoginSchema
} = require('../lib/validators/userValidator');

const UserService = require('../services/userService');
const AppError = require('../errors/index');
const JWT = require('jsonwebtoken');
const User = require('../models/User.model');



async function handleSignUp(req, res) {
    console.log("Signup request body:", req.body);
    
    const validationResult = await userSignUpSchema.safeParseAsync(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.errors });
    }
  
    const { name, email, password, role } = validationResult.data; // ✅ Role included
  
    try {
        const token = await UserService.signupWithEmailAndPassword({
            name,
            email,
            password,
            role  // ✅ Role is now passed correctly
        });
  
        return res.status(201).json({ status: "success", data: { token } });
  
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.code).json({ status: "error", message: err.message });
        }
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
  

async function handleSignIn(req, res) {
  console.log("Sign-in request body:", req.body);
  
  const validationResult = await userLoginSchema.safeParseAsync(req.body);
  if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.errors });
  }

  const { email, password } = validationResult.data;
  try {
      const token = await UserService.signinWithEmailAndPassword({ email, password });

      console.log("Token generated in handleSignIn:", token);

      return res.status(200).json({
          status: 'success',
          message: `Successfully signed in for ${email}`,
          token 
      });

  } catch (err) {
      if (err instanceof AppError) {
          return res.status(err.code).json({ status: 'error', message: err.message });
      }
      return res.status(500).json({ status: 'error', error: err.message });
  }
}


module.exports = { handleSignUp, handleSignIn };



