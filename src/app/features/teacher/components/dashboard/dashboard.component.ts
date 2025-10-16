import { CommonModule,  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../../shared/services/auth-service.service';
import { AcademicServiceService } from '../../../../shared/services/academic-service.service';
import { AdmissionService } from '../../../../shared/services/admission.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
myStudents = 3;
  assignedClassesCount = 1;
  homeworkAssigned = 1;
  assignedClasses : any[] = [];
public _totalStudents: number = 0;
  constructor(
    private router: Router,
    private _authService: AuthServiceService,
    private _academicService: AcademicServiceService,
    private _admissionService: AdmissionService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    const userId = this._authService.getUserId();

    if (userId !== null) {
      this._academicService.getParticularClassByclassId(userId).subscribe(data =>{
        this.assignedClasses = data;
        console.log("aassin", this.assignedClasses);
        if(this.assignedClasses.length > 0){
          this.getTotalStudents(this.assignedClasses[0].id)
        }
      });
    } else {
      console.error('User ID is null');
    }
  }

  getTotalStudents(classId:number){
    this._admissionService.getAdmissionsByClass(classId).subscribe((count: any) =>{
      if(count.length>0){
        this._totalStudents = count.length
      }
    })
  }

  markAttendance() {
    this.router.navigate(['teacher/attendance']);
  }

  uploadResults() {
    this.router.navigate(['teacher/class']);
  }

  assignHomework() {
    this.router.navigate(['teacher/assign-homework']);
  }

  chatWithStudents() {
    this.router.navigate(['teacher/chat']);
  }
}
