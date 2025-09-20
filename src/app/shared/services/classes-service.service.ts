import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Class } from '../../features/admin/models/class';
@Injectable({
  providedIn: 'root'
})
export class ClassesServiceService {
  private apiUrl = 'http://localhost:5000/classes';

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get<Class[]>(this.apiUrl);
  }

  getClassById(id: number) {
    return this.http.get<Class>(`${this.apiUrl}/${id}`);
  }

  addClass(newClass: Class) {
    return this.http.post(this.apiUrl, newClass);
  }

  updateClass(id: number, updatedClass: Class) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedClass);
  }

  deleteClass(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

