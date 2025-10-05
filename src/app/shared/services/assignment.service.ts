import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../models/timetable.models';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private apiUrl = 'http://localhost:8080/api/assignments';
  constructor(private http: HttpClient) {}

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.apiUrl);
  }

  createAssignment(assignment: { teacher_id: number, subject_id: number }): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment);
  }

  deleteAssignment(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}