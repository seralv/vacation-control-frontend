import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8000/employees/';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}/`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
