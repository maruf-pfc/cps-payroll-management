import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { Salary } from './salary.entity';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  // Example: /salary?userId=1
  @Get(':userId')
  getAll(@Param('userId') userId: number) {
    return this.salaryService.findAll(userId);
  }

  @Post(':userId')
  create(@Param('userId') userId: number, @Body() body: Salary) {
    return this.salaryService.create({ ...body, userId });
  }

  @Patch(':id/:userId')
  update(
    @Param('id') id: number,
    @Param('userId') userId: number,
    @Body() body: Partial<Salary>,
  ) {
    return this.salaryService.update(id, userId, body);
  }

  @Delete(':id/:userId')
  remove(@Param('id') id: number, @Param('userId') userId: number) {
    return this.salaryService.delete(id, userId);
  }
}
