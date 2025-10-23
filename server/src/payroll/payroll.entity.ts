export class Salary {
  id: number;
  profilePic?: string;
  name: string;
  salaryType: 'Task Based' | 'Monthly';
  monthName?: string;
  assignedDate: string;
  deadline: string;
  status: 'Pending' | 'Paid';
  userId: number;
}
