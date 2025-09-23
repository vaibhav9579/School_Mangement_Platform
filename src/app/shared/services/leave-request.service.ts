import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveRequestService {
  private apiUrl = 'http://localhost:5000/api/requests';

  constructor(private http: HttpClient) {}

  applyLeave(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getLeaveRequestsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getLeaveBalance(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/balance/${userId}`);
  }

  updateLeaveRequest(requestId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${requestId}`, data);
  }

  deleteLeaveRequest(requestId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${requestId}`);
  }
}
