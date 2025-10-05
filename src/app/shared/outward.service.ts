import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Outward {
  outward_id?: number;
  dispatch_date: string;
  recipient_details: string;
  subject: string;
  document_type: string;
  dispatch_mode?: string;
  tracking_number?: string;
  logged_by_user_id: number;
}
// Define an interface for the Outward object

@Injectable({
  providedIn: 'root'
})
export class OutwardService {
 private apiUrl = 'http://localhost:5000/api/outward';

  constructor(private http: HttpClient) { }

  // GET: all outward entries
  getAll(): Observable<Outward[]> {
    return this.http.get<Outward[]>(this.apiUrl);
  }

  // POST: create a new outward entry
  create(data: Outward): Observable<Outward> {
    return this.http.post<Outward>(this.apiUrl, data);
  }

  // Additional methods you might need later
  // GET: a single entry by ID
  // getById(id: number): Observable<Outward> {
  //   return this.http.get<Outward>(`${this.apiUrl}/${id}`);
  // }

  // PUT: update an existing entry
  // update(id: number, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${id}`, data);
  // }
}
