// src/app/admin/services/academic.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Institution { id?: number; name: string; type: 'school' | 'college'; }
export interface Department { id?: number; institution_id: number; name: string; }
export interface Program { id?: number; department_id: number; name: string; }
export interface ClassModel { id?: number; institution_id: number; program_id?: number | null; name: string; classteacher: number | null }
export interface Section { id?: number; class_id: number; name: string; }

@Injectable({ providedIn: 'root' })
export class AcademicServiceService {
  base = 'http://localhost:5000/api/academic';
  constructor(private http: HttpClient) { }

  // institutions
  listInstitutions(): Observable<Institution[]> { return this.http.get<Institution[]>(`${this.base}/institutions`); }
  createInstitution(i: Institution) { return this.http.post<Institution>(`${this.base}/institutions`, i); }
  updateInstitution(id: number, i: Institution) { return this.http.put<Institution>(`${this.base}/institutions/${id}`, i); }
  deleteInstitution(id: number) { return this.http.delete(`${this.base}/institutions/${id}`); }

  // departments
  listDepartments(institutionId?: number) { return this.http.get<Department[]>(`${this.base}/departments${institutionId ? '?institutionId=' + institutionId : ''}`); }
  createDepartment(d: Department) { return this.http.post<Department>(`${this.base}/departments`, d); }
  updateDepartment(id: number, d: Partial<Department>) { return this.http.put<Department>(`${this.base}/departments/${id}`, d); }
  deleteDepartment(id: number) { return this.http.delete(`${this.base}/departments/${id}`); }

  // programs
  listPrograms(departmentId?: number) { return this.http.get<Program[]>(`${this.base}/programs${departmentId ? '?departmentId=' + departmentId : ''}`); }
  createProgram(p: Program) { return this.http.post<Program>(`${this.base}/programs`, p); }
  updateProgram(id: number, p: Partial<Program>) { return this.http.put<Program>(`${this.base}/programs/${id}`, p); }
  deleteProgram(id: number) { return this.http.delete(`${this.base}/programs/${id}`); }

  // classes
  listClasses(opts?: any) {
    const qs = opts ? Object.keys(opts).map(k => `${k}=${opts[k]}`).join('&') : '';
    return this.http.get<ClassModel[]>(`${this.base}/classes${qs ? ('?' + qs) : ''}`);
  }

  getParticularClassByclassId(classId: number): Observable<any> {
    return this.http.get<any>(`${this.base}/classes/${classId}`);
  }

  createClass(c: ClassModel) {
    console.log("create class", `${this.base}/classes`, c);
    return this.http.post<ClassModel>(`${this.base}/classes`, c);
  }

  updateClass(id: number, c: Partial<ClassModel>) {
    console.log("data", `${this.base}/classes/${id}`, c);
    return this.http.put<ClassModel>(`${this.base}/classes/${id}`, c);
  }
  deleteClass(id: number) { return this.http.delete(`${this.base}/classes/${id}`); }

  // sections
  listSections(classId?: number) { return this.http.get<Section[]>(`${this.base}/sections${classId ? ('?classId=' + classId) : ''}`); }
  createSection(s: Section) { return this.http.post<Section>(`${this.base}/sections`, s); }
  updateSection(id: number, s: Partial<Section>) { return this.http.put<Section>(`${this.base}/sections/${id}`, s); }
  deleteSection(id: number) { return this.http.delete(`${this.base}/sections/${id}`); }

  // full structure
  fullStructure(institutionId: number) { return this.http.get<any>(`${this.base}/structure/${institutionId}`); }
}
