import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimetableEntry } from '../models/timetable.models';

@Injectable({ providedIn: 'root' })
export class TimetableService {
  private apiUrl = 'http://localhost:8080/api/timetable';
  constructor(private http: HttpClient) {}

  getForClass(classId: number, sectionId: number): Observable<TimetableEntry[]> {
    return this.http.get<TimetableEntry[]>(`${this.apiUrl}/class/${classId}/${sectionId}`);
  }

  getForTeacher(teacherId: number): Observable<TimetableEntry[]> {
    return this.http.get<TimetableEntry[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  createEntry(entry: any): Observable<TimetableEntry> {
    return this.http.post<TimetableEntry>(this.apiUrl, entry);
  }

  deleteEntry(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}