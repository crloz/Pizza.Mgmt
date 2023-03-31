export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  hourlyRate: number;
  isActive: boolean;
}
export type CreateEmployeeInput = Omit<Employee, 'id'>;
export function isEmployee(obj: Employee | CreateEmployeeInput): obj is Employee {
  return (obj as Employee).id !== undefined;
}
