import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Class } from '../../models/class';

@Component({
  selector: 'app-manage-class-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './manage-class-dialog.component.html',
  styleUrl: './manage-class-dialog.component.css'
})

export class ManageClassDialogComponent implements OnInit {
  classForm: FormGroup;
  action: 'create' | 'edit' | 'delete';
  roles: string[] = ['Admin', 'Teacher', 'Clerk', 'Student'];
  public teacherData: User[] = [];
  public _className: string = "";

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'create' | 'edit' | 'delete'; class?: Class, teacherData: User[] }
  ) {
    this.action = data.action;
    this.classForm = this.fb.group({
      classname: [
        data.class ? data.class.classname : '',
        [Validators.required, Validators.minLength(3)],
      ],
      classteacher: [
        data.class ? data.class.classteacher : '',
      ],
    });

    if (this.action === 'delete') {
      this.classForm.disable();
    }
  }

  ngOnInit(): void {
    console.log('data', this.data);

    // assigning teacher data to local variable
    this.teacherData = this.data.teacherData;
  }

  /** Reset form fields */
  onReset() {
    this.classForm.reset();
  }

  /** Submit form */
  onSubmit() {
    if (this.action === 'delete') {
      if (this._className === this.data.class?.classname) {
        this.dialogRef.close(true); // send "true" to confirm delet
      }
    } else if (this.classForm.valid) {
      const { classname, classteacher } = this.classForm.value;

      console.log('form values', this.classForm.value);
      // Map form values back to Class structure
      const result: Partial<Class> = {
        classname,
        classteacher
      };

      this.dialogRef.close(result);
    }
  }
}
