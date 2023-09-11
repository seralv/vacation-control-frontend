import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkInformationService {
  private baseUrl = 'http://localhost:8000/api/work-information/';
  private work_information: any;
  constructor(private http: HttpClient) { }

  getWorkInformations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getWorkInformation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}/`);
  }

  createWorkInformation(vacation: any): Observable<any> {
    return this.http.post(this.baseUrl, this.work_information);
  }

  updateWorkInformation(id: number, vacation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, this.work_information);
  }

  deleteWorkInformation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }

  getVacationsByEmployee(employeeId: number): Observable<any[]> {
    const url = `${this.baseUrl}?employee=${employeeId}`;
    return this.http.get<any[]>(url);
  }

  assignWorkInformation(data: any) {
    this.work_information = data;
  }

  getWorkInformationCurrent() {
    return this.work_information;
  }
}
