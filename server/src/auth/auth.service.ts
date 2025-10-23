import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService, private config: ConfigService) {}

  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    await this.db.client`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashed})
    `;
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const result = await this.db.client`
      SELECT * FROM users WHERE email = ${email}
    `;
    const user = result[0];
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const secret = this.config.get<string>('jwt.secret') ?? '';
    if (!secret) {
      throw new Error('JWT_SECRET is missing in environment variables');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      secret,
      { expiresIn: '7d' },
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
