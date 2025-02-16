import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true, // yhe be js open ayhonm yemiseraw http sihon nw endezih yemadregu importanceu degmo  xss kemibal attack save yadergenal 
		secure: process.env.NODE_ENV === "production", //development ley http nw production ley degmo https nw yemhinoew
		sameSite: "strict", // csrf kemil attack save yadergenal endezih maletachn
		maxAge: 7 * 24 * 60 * 60 * 1000, // cookie works for seven days nw
	});

	return token;
};
