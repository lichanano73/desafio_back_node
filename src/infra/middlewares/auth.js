const jwt    = require('jsonwebtoken');
const config = require('../../config/config');

let userRepo;
exports.setRepository = (repo) => {
    userRepo = repo;
};

exports.verifyToken = async (req,res,next)=>{
    try {
        
        const token_user = req.headers["x-access-token"]
        if(!token_user) return res.status(403).json({error: 'Es necesario Token'})

        const token_decode = jwt.verify(token_user,config.SECRET)
        const username = token_decode.username

        const myUser = await userRepo.findByUsername(username);
        
        if (myUser) {
            next();
        } else {
            return res.status(401).json({ error: 'No tiene autorización' });
        }

    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ error: 'Error al verificar el token' });
    }
}