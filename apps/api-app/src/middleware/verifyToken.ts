import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"

interface RequestWithUser extends Request {
  email?: string
}

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const authCookie = req.cookies.accessToken
  let token = authHeader?.split(" ")[1]
  if (authCookie) token = authCookie
  if (!token) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: VerifyErrors | null, decoded) => {
    if (err) return res.sendStatus(403)
    if (decoded) req.email = (decoded as JwtPayload).email
    next()
  })
}
