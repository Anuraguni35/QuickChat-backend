import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      phoneNumber,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists with the same phone Number" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      phoneNumber,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      const token = generateTokenAndSetCookie(newUser._id);
      await newUser.save();

      res.status(201).json({
        newUser,
        token: token,
        status: true,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { password, phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Invalid user phone number or password" });
    }

    const token = generateTokenAndSetCookie(user._id);

    res.status(200).json({
      user,
      token: token,
      status: true,
      message: "user Logged in successfully",
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

export const validateUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }
     
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
     
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
      res.json({ user, status: true });
  } catch (error) {
    console.log("Error in validateUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// export const logout = (req, res) => {
// 	try {
// 		res.cookie("jwt", "", { maxAge: 0 });
// 		res.status(200).json({ message: "Logged out successfully" });
// 	} catch (error) {
// 		console.log("Error in logout controller", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };
