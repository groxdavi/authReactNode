 // Ajusta la ruta según tu estructura

 export const logout = async (req, res) => {
    try {
      // Limpiamos las cookies especificando el dominio y la ruta si se establecieron
      res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ message: "Deslogueado con éxito", success: true });
    } catch (error) {
      console.log("Error en logout controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };