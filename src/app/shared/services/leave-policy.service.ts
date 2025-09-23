import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeavePolicy } from '../models/leave-policy';


@Injectable({
  providedIn: 'root'
})
export class LeavePolicyService {
  private apiUrl = 'http://localhost:5000/api/policies'; // ✅ adjust port if needed

  constructor(private http: HttpClient) {}

  getAllPolicies(): Observable<LeavePolicy[]> {
    return this.http.get<LeavePolicy[]>(this.apiUrl);
  }

  getPolicyByRole(roleId: number): Observable<LeavePolicy[]> {
    return this.http.get<LeavePolicy[]>(`${this.apiUrl}/${roleId}`);
  }

  addPolicy(policy: Partial<LeavePolicy>): Observable<LeavePolicy> {
    return this.http.post<LeavePolicy>(this.apiUrl, policy);
  }

  updatePolicy(policyId: number, policy: Partial<LeavePolicy>): Observable<LeavePolicy> {
    return this.http.put<LeavePolicy>(`${this.apiUrl}/${policyId}`, policy);
  }

  deletePolicy(policyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${policyId}`);
  }
}
