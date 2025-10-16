import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Inward {
  inward_id?: number;
  received_date: string;
  sender_details: string;
  subject: string;
  document_type: string;
  status?: string;
  remarks?: string;
  logged_by_user_id: number;
  forwarded_to_department_id?: number;
  forwarded_to_user_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class InwardService {
  private apiUrl = 'http://localhost:5000/api/inward';

  constructor(private http: HttpClient) { }

  // GET: all inward entries
  getAll(): Observable<Inward[]> {
    return this.http.get<Inward[]>(this.apiUrl);
  }

  // POST: create a new inward entry
  create(data: Inward): Observable<Inward> {
    return this.http.post<Inward>(this.apiUrl, data);
  }

  // PUT: update an existing entry
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    console.log("Inward Service Delete ID: ", id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
