import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { env } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = `${env.backendUrl}/employees`;
  employees$ = signal<Employee[]>([]);
  employee$ = signal<Employee>({} as Employee);
  
  constructor(private httpClient: HttpClient) { } 

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.url}`)
      .subscribe(employees => {
        this.employees$.set(employees);
      });
  }

  getEmployees() {
    this.refreshEmployees();
    return this.employees$();
  }

  getEmployee(id: string) {
    this.httpClient.get<Employee>(`${this.url}/${id}`).subscribe(employee => {
      this.employee$.set(employee);
      return this.employee$();
    });
  }

  createEmployee(employee: Employee) {
    return this.httpClient.post(`${this.url}`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee) {
    return this.httpClient.put(`${this.url}/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
