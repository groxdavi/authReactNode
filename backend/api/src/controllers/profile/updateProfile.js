import User from "../../models/User.js";

  export const updateProfile = async (req, res) => {
	try {
	  const { _id: userId } = req.user; // Suponiendo que el ID del usuario está en req.user
	  const updates = req.body; // Los datos de actualización se envían en el cuerpo de la solicitud

	  // Encuentra al usuario por ID y actualiza sus datos
	  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
		new: true,
		runValidators: true, // Esto se asegura de que los datos cumplan con las validaciones del modelo
	});
	  
	  if (!updatedUser) {
		return res.status(404).json({ message: "Usuario no encontrado" });
	  }
  
	  res.json(updatedUser);
	} catch (error) {
	  res.status(500).json({ message: "Server error", error: error.message });
	}
  };