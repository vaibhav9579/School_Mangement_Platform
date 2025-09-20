import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Roles } from '../../features/admin/models/roles';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
 private apiUrl = 'http://localhost:5000/roles';

  constructor(private http: HttpClient) {}

  // ✅ Get all roles
  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.apiUrl);
  }

  // ✅ Get role by ID
  getRoleById(id: number): Observable<Roles> {
    return this.http.get<Roles>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add new role
  addRole(role: Roles): Observable<Roles> {
    return this.http.post<Roles>(this.apiUrl, role);
  }

  // ✅ Update role
  updateRole(id: number, role: Roles): Observable<Roles> {
    return this.http.put<Roles>(`${this.apiUrl}/${id}`, role);
  }

  // ✅ Delete role
  deleteRole(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
