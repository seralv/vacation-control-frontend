import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private baseUrl = 'http://localhost:8000/api/vacations/';
  private vacation: any;
  constructor(private http: HttpClient) { }

  getVacations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getVacation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}/`);
  }

  createVacation(vacation: any): Observable<any> {
    return this.http.post(this.baseUrl, vacation);
  }

  updateVacation(id: number, vacation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, vacation);
  }

  deleteVacation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }

  getVacationsByEmployee(employeeId: number): Observable<any[]> {
    const url = `${this.baseUrl}?employee=${employeeId}`;
    return this.http.get<any[]>(url);
  }

  assignVacation(data: any) {
    this.vacation = data;
  }

  getVacationCurrent() {
    return this.vacation;
  }

}
