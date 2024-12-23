import User from "../../models/User.js";
import { generateTokens, setCookies } from "../../helpers/generateTokenCookies.js";



export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
            return res.status(401).json({
                message: "Verifica los campos requeridos!",
                success: false,
            });
        }


		const user = await User.findOne({ email });
		if (!user) {
            return res.status(401).json({
                message: "email o contraseña incorrectos",
                success: false,
            });
        }


		if (user && (await user.comparePassword(password))) {
			const token = generateTokens(user._id);
			setCookies(res, token);

			res.json({
				message: `Welcome back ${user.name}`,
				id: user._id,
				name: user.name,
				email: user.email,
				
			});
		} else {
			res.status(400).json({ message: "email o contraseña incorrectos", success: false, });
		}
	} catch (error) {
		console.log("Error en login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};