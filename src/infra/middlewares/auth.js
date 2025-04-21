const jwt    = require('jsonwebtoken');
const config = require('../../config/config');


exports.verifyToken = async (req,res,next)=>{
    try {
        console.log('Verify Token')
        /*
        const token_user = req.headers["x-access-token"]
        if(!token_user) return res.status(403).json({error: 'Es necesario Token'})

        const token_decode = jwt.verify(token_user,config.SECRET)
        const user_id = token_decode.id

        const user_result = await user_model.finById({ id: user_id });
        */

        const user_result = true;
        if (user_result) {
            next();
        } else {
            return res.status(401).json({ error: 'No tiene autorización' });
        }

    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ error: 'Error al verificar el token' });
    }
}