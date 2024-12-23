import User from "../../models/User.js";

export const register = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Intenta con un correo diferente",
                success: false,
            });
        };

		// Crea el nuevo usuario y almacena el resultado en una variable
        const newUser = await User.create({
            name,
            email,
            password,
        });

		res.status(201).json({
			message: "Cuenta creada con éxito",
			success: true,
			email: newUser.email,
		});
	} catch (error) {
		console.log("Error en register controller", error.message);
		res.status(500).json({ message: error.message });
	}
};