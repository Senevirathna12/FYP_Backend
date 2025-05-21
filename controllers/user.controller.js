const User = require("../models/user.model");


const handleCreateUserPostRequest = async (req , res) => {
try {
    const {username , email , password1 ,  password2} = req.body;
    const [existingEmail, existingUserName] = await Promise.all([
      User.findOne({ email: email }),
      User.findOne({ username: username }),
    ]);

    if (existingEmail || existingUserName) {
      return res.status(200).json({
        isSuccess: false,
        message: existingEmail
          ? "This email is already registered."
          : "This username is already registered.",
        content: null,
      });
    }
    res.status(200).json({
        isSuccess : true,
        message : "New user creation successfully!",
        content : {
            username,
            email,
            password1,
            password2
        }
    })
} catch (err) {
    console.error(err);
    res.status(500).json({
        isSuccess : false,
        message : "Internal server error",
        content : null
    })
}

}

module.exports = {
    handleCreateUserPostRequest
}