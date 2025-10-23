import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';

@Injectable()
export class DatabaseService {
  private readonly sql;

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('database.url') ?? '';
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is missing in environment');
    }

    this.sql = neon(databaseUrl);
  }

  get client() {
    return this.sql;
  }
}
