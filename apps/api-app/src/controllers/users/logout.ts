import { users } from "@/models/users"
import type { Request, Response } from "express"

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  if (!refreshToken) return res.sendStatus(204)
  const user = await users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  })
  if (!user) return res.sendStatus(204)
  await users.update(
    { refresh_token: null },
    {
      where: {
        id: user.id,
      },
    },
  )
  res.clearCookie("refreshToken")
  res.clearCookie("accessToken")
  return res.sendStatus(200)
}
