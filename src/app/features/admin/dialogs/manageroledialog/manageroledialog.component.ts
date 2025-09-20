import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Roles } from '../../models/roles';
import { RoleServiceService } from '../../../../shared/services/role-service.service';

@Component({
  selector: 'app-manageroledialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manageroledialog.component.html',
  styleUrls: ['./manageroledialog.component.css']
})
export class ManageroledialogComponent implements OnInit {
roleForm: FormGroup;

  // roles: string[] = ['Admin', 'Teacher', 'Clerk', 'Student', 'Principal', 'Vice Principal', 'Accountant', 'Librarian', 'Counselor', 'Transport Manager', 'Hostel Manager', 'Lab Assistant', 'Sports Coach', 'Nurse', 'Receptionist', 'Security', 'Cleaner', 'Gardener' ,'SchoolBus-Driver', 'SchoolBus-Conductor', 'Cafeteria-Staff', 'IT-Support', 'Event-Coordinator', 'Volunteer', 'Parent', 'Alumni'];

// public roles: string[] = [];
  roles: string[] = ['Admin', 'Teacher', 'Clerk', 'Student'];
  action: 'create' | 'edit' | 'view' | 'delete';

  ngOnInit(): void {
    // this.loadRoles();
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RoleServiceService,
    public dialogRef: MatDialogRef<ManageroledialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: 'create' | 'edit' | 'view' | 'delete'; role?: Roles }
  ) {
    this.action = data.action;
    this.roleForm = this.fb.group({
      name: [data.role ? data.role.name : '', Validators.required],
      description: [data.role ? data.role.description : '']
    });

    if (this.action === 'delete' || this.action === 'view') {
      this.roleForm.disable();
    }
  }



  onSubmit() {
    if (this.action === 'delete') {
      this.dialogRef.close(true);
    } else if (this.roleForm.valid) {
      this.dialogRef.close(this.roleForm.value);
    }
  }
}
