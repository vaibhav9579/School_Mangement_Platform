import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeSlot } from '../models/timetable.models';

@Injectable({ providedIn: 'root' })
export class TimeSlotService {
  private apiUrl = 'http://localhost:8080/api/time-slots'; // Adjust port if needed
  constructor(private http: HttpClient) {}

  getTimeSlots(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(this.apiUrl);
  }

  createTimeSlot(slot: { start_time: string, end_time: string, is_break: boolean }): Observable<TimeSlot> {
    return this.http.post<TimeSlot>(this.apiUrl, slot);
  }

  deleteTimeSlot(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}