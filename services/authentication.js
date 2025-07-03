import jwt from 'jsonwebtoken';

const SECRET = '@34%@9rhjfge#$%$#@!';

function generateToken (user) {
     const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
      }
      const token = jwt.sign(payload, SECRET);
        return token;
}

function verifyToken (token) {
    try {
        const decoded = jwt.verify(token, SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export { generateToken, verifyToken };