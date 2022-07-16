export interface DepartmentEmployeeFileUpload {
  fileUpload: any,
  selectedDepartmentId: string
}
export class Department {
  id?: string;
  name: string;
}
export interface DepartmentListItem {
  id: string,
  name: string,
  employeeCount: number
}
