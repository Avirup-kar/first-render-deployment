import { verifyToken } from '../services/authentication.js'

function checkAuthentication (cookiename) {
    return (req, res, next) => {
        const token = req.cookies[cookiename];
        if (!token) {
           return next()
        }
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            
        } catch (error) {}
       return next();
    }
}

export default checkAuthentication;