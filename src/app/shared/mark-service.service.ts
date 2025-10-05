import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarkServiceService {
base = 'http://localhost:5000/api/marks';

  constructor(private http: HttpClient) {}

  list(params?: any): Observable<any[]> {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    console.log(this.base + qs);
    return this.http.get<any[]>(this.base + qs);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}`);
  }


   getMarkBystudetId(id: number): Observable<any> {
    console.log("data", `${this.base}/markbystudentid/${id}`);
    return this.http.get<any>(`${this.base}/markbystudentid/${id}`);
  }
  
  create(mark: any): Observable<any> {
    console.log("data sending to api", this.base, mark);
    return this.http.post<any>(this.base, mark);
  }

  update(id: number, mark: any): Observable<any> {
    return this.http.put<any>(`${this.base}/${id}`, mark);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.base}/${id}`);
  }
}
