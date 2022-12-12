import jwt from "jsonwebtoken"

const auth = {
    userlogin: "emerson",
    password: "ejcf-a3",
    secret: "Meu segredo super secreto-359782*-6-*-sssdd",

    getToken() {
        let token = jwt.sign({ user: auth.username }, auth.secret, { expiresIn: 3600 })
        return token
    },

    async middlewareAuth(req, res, next) {
        const authHeader = req.headers.authorization
        if (authHeader == undefined) {
            res.status(400).json({ error: "Token not found" })
            return
        }
        let parts = authHeader.split(" ")
        let token = ""
        if (parts.length > 1) {
            token = parts[1]
        } else {
            token = parts[0]
        }
        jwt.verify(token, auth.secret, (err, tokenDecoded) => {
            if (err) {
                res.status(400).json({ error: "INAVLID Token" })
                return
            }
            console.log(tokenDecoded);
            next()
        })
    },

    // POST - getToken
    authentication(req, res) {
        let username = req.body.username
        let password = req.body.password
        console.log('recebi requisição post rota /auth/getToken',{username,password});
        if (username == auth.userlogin && password == auth.password) {
            let token = auth.getToken()
            res.status(200).json({ msg: "ok", token })
            return
        } else {
            res.status(400).json({ error: "Invalid user/password" })
            return
        }
    }
}

export default auth