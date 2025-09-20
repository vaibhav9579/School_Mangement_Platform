// auth-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log('data sending to api', `${this.apiUrl}/login`, { username, password });
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  setSession(role: string) {
    localStorage.setItem('role', role);
  }

  setName(name : string){
    localStorage.setItem('name' , name);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('role');
  }
}
