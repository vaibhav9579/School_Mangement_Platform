import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmissionService } from '../../../shared/services/admission.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { SubjectService } from '../../../shared/services/subject.service';
import { AcademicServiceService } from '../../../shared/services/academic-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-mark',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './fill-mark.component.html',
  styleUrl: './fill-mark.component.css'
})

export class FillMarkComponent implements OnInit {
  public _classes: any[] = [];
  classesMap: {[key: number]:string } = {};
  public selTeacherClassId: number[] = [] ;

  constructor(
    private _admissionService: AdmissionService,
    private _authservice: AuthServiceService,
    private _subjectService: SubjectService,
    private _academicsService: AcademicServiceService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const userId: any = this._authservice.getUserId();
    this.getteacherConnectedClasses(userId);
    this.getClasses();
  }

  getteacherConnectedClasses(_recUserId: number) {
    this._subjectService.getSubjectsByTeacher(_recUserId).subscribe(data => {
      if(data.length >0){
        data.map(dt=>{
        if( dt.class_id !== null && dt.class_id !== undefined){
          this.selTeacherClassId.push(dt.class_id)
          }
        })
      }
      console.log("ths.1111", this.selTeacherClassId)
    })
  }

  getClasses() {
    this._academicsService.listClasses().subscribe(res => {
      this._classes = res
      console.log("res",res);
     if(res.length){
         this.classesMap = res.reduce((acc: any, role: any) => {
          acc[role.id] = role.name;
          return acc;
        }, {});
     }
    }
    );
  }

  getClassName(classId:number){
    console.log("ths.clas", this.classesMap);
    return this.classesMap[classId] || "Unknown";
  }

  navigateTofillMark(classId:any){
    this._router.navigate(['teacher/fill_mark' , classId])
  }
}
