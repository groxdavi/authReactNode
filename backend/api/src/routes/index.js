import { Router } from "express";
import { login } from "../controllers/auth/authLogin.js";
import { logout } from "../controllers/auth/authLogout.js";
import { register } from "../controllers/auth/authRegister.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { validateRegister } from "../middleware/validator.js";
import { getProfile } from "../controllers/profile/getProfile.js";
import { updateProfile } from "../controllers/profile/updateProfile.js";
import { OAuth2Client } from 'google-auth-library';
import User from "../models/User.js";

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.get("/", (req,res)=>{
    res.send("Backend")
})

//autenticar
router.post("/api/register", validateRegister, register)
router.post("/api/login", login)
router.post("/api/logout", logout);
router.get('/authenticate', protectRoute, (req, res) => {
  
  return res.json({
    user: req.user,
  });
});
// Login con Google
router.post('/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({ email, name, googleId });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', jwtToken, { httpOnly: true }).json({ message: 'Login con Google exitoso' });
  } catch (error) {
    res.status(500).json({ error: 'Error con Google Auth' });
  }
});


//Perfil del usuario
router.get("/api/user/profile", protectRoute, getProfile);
// Ruta para actualizar el perfil del usuario actual
router.put('/api/user/update-profile', protectRoute,updateProfile);

export default router;