import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan";
import router from './routes/index.js'; // Asegúrate de usar la extensión .js

//--------------------------------------------------------------------------------------------
const app = express();
// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con tu dominio
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
};
//--------------------------------------------------------------------------------------------
// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
//--------------------------------------------------------------------------------------------
// Rutas
app.use('/', router);
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
// Manejo de Errores
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
  console.error(err.stack); // Log más detallado
    res.status(status).json({status,message});
});
//--------------------------------------------------------------------------------------------
// Exportar la instancia de la aplicación
export default app;