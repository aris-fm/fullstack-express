import type { User, UserRegister } from "@/types"
import { interceptedFetch } from "@/utils/fetchInterceptor"
import { apiUrl } from "./urls"

export const fetchUsers = async (): Promise<User[]> => {
  const response = await interceptedFetch(apiUrl.users)
  const users: User[] = await response.json()
  return users
}

export const createUsers = async ({ email, name, confPassword, password }: UserRegister) => {
  try {
    const response = await fetch(apiUrl.users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password, confPassword }),
    })
    if (!response.ok) throw new Error("An error occured, please try again")
  } catch (error) {
    return error
  }
}
