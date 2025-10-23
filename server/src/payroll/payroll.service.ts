import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Salary } from './salary.entity';

@Injectable()
export class SalaryService {
  constructor(private db: DatabaseService) {}

  async create(salary: Salary) {
    const result = await this.db.client`
      INSERT INTO salary (profile_pic, name, salary_type, month_name, assigned_date, deadline, status)
      VALUES (${salary.profile_pic}, ${salary.name}, ${salary.salary_type}, ${salary.month_name}, ${salary.assigned_date}, ${salary.deadline}, ${salary.status})
      RETURNING *;
    `;
    return result[0];
  }

  async findAll() {
    return await this.db.client`SELECT * FROM salary ORDER BY id DESC`;
  }

  async update(id: number, data: Partial<Salary>) {
    const result = await this.db.client`
      UPDATE salary SET ${this.db.client(data)} WHERE id = ${id} RETURNING *;
    `;
    return result[0];
  }

  async delete(id: number) {
    await this.db.client`DELETE FROM salary WHERE id = ${id}`;
    return { message: 'Deleted successfully' };
  }
}
