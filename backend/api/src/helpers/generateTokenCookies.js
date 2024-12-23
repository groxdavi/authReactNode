import jwt from "jsonwebtoken";

//use user id to generate token
export const generateTokens = (id) => {
	// token must be returned to the client
	return jwt.sign({ id }, process.env.JWT_SECRET, {
	  expiresIn: "30d",
	});
  };
  


//cookies
export const setCookies = (res, token) => {
	res.cookie("token", token, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
	});
};