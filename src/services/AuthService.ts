import { sign } from 'jsonwebtoken'

class AuthService {
  public generateToken (id: string, role: string): string {
    return sign(
      { id, role },
      process.env.PRIVATE_KEY,
      { expiresIn: 43200 }
    )
  }
}

export default new AuthService()
