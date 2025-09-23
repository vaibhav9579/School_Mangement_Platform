// admission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🎯 Admission model interface
// Defines the structure of an admission record returned from the backend
export interface Admission {
  id?: number;
  admission_no?: string;
  full_name: string;
  dob?: string;
  gender?: string;
  guardian_name?: string;
  contact?: string;
  address?: string;
  institution_type?: string;
  school_class?: string;
  school_section?: string;
  college_department?: string;
  college_program?: string;
  college_year?: string;
  college_section?: string;
  fee_structure_id?: string;
  initial_payment_received?: boolean;
  initial_payment_amount?: number;
  status?: string;     // e.g. "pending", "approved", "rejected"
  remarks?: string;    // rejection remarks or approval comments
  documents?: any[];   // uploaded document references
}

@Injectable({ providedIn: 'root' })
export class AdmissionService {
  // Base URL for the admissions API
  private base = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  /**
   * 🔍 Fetch all admissions (optionally with filters)
   * @param filters - object like { status: 'pending', institution_type: 'school' }
   * @returns Observable<Admission[]>
   */
  getAdmissions(filters?: any): Observable<Admission[]> {
    let q = `${this.base}/admissions`;
    if (filters) {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(k => filters[k] && params.set(k, filters[k]));
      const qs = params.toString();
      if (qs) q += `?${qs}`;
    }
    return this.http.get<Admission[]>(q);
  }

  /**
   * 📄 Fetch a single admission by ID
   * @param id - Admission ID
   * @returns Observable<Admission>
   */
  getAdmission(id: number): Observable<Admission> {
    return this.http.get<Admission>(`${this.base}/admissions/${id}`);
  }

  /**
   * ➕ Create a new admission
   * @param formData - FormData containing admission details & optional documents
   * @returns Observable<Admission>
   */
  createAdmission(formData: FormData): Observable<Admission> {
    return this.http.post<Admission>(`${this.base}/admissions`, formData);
  }

  /**
   * ✏️ Update an existing admission
   * @param id - Admission ID
   * @param data - Partial<Admission> with fields to update
   * @returns Observable<Admission>
   */
  updateAdmission(id: number, data: Partial<Admission>) {
    return this.http.put<Admission>(`${this.base}/admissions/${id}`, data);
  }

  /**
   * ✅ Approve an admission
   * @param id - Admission ID
   */
  approveAdmission(id: number) {
    return this.http.put(`${this.base}/admissions/${id}/approve`, {});
  }

  /**
   * ❌ Reject an admission
   * @param id - Admission ID
   * @param remarks - Reason for rejection
   */
  rejectAdmission(id: number, remarks: string) {
    return this.http.put(`${this.base}/admissions/${id}/reject`, { remarks });
  }

  /**
   * 📤 Upload documents for a given admission
   * @param id - Admission ID
   * @param formData - FormData containing one or more files
   */
  uploadDocuments(id: number, formData: FormData) {
    return this.http.post(`${this.base}/admissions/${id}/documents`, formData);
  }

  /**
   * 🗑 Delete a specific document by ID
   * @param docId - Document ID
   */
  deleteDocument(docId: number) {
    return this.http.delete(`${this.base}/documents/${docId}`);
  }
}
