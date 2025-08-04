const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
         // 👉 Affiche le contenu de l'en-tête Authorization
    console.log('Authorization header:', req.headers.authorization);
    
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        }

         next(); // 👉 NÉCESSAIRE POUR PASSER AU CONTROLEUR

    } catch(error) {
        console.error('Erreur d’authentification :', error.message);
        res.status(401).json({ error });

    }

};