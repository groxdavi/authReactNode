import validator from 'validator';

export const validateRegister = (req, res, next) => {
    const { email, password, name } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Verifica los campos requeridos, algo te está faltando",
            success: false,
        });
    }

    // Validaciones adicionales
    if (typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({
            message: "El nombre debe tener al menos 3 caracteres",
            success: false,
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "El email no es válido",
            success: false,
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "La contraseña debe tener al menos 6 caracteres",
            success: false,
        });
    }

    // Si todas las validaciones pasan, pasa al siguiente middleware
    next();
};