import { tokenVerifierService } from '../../application/services/TokenVerifierService.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader?.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] 
    : null;

  const tokenFromCookie = req.cookies?.token;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado o mal formado' });
  }

  const decoded = await tokenVerifierService.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }

  req.user = decoded;
  next();
}