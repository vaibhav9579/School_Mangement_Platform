import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { RoleServiceService } from '../../../shared/services/role-service.service';
import { Roles } from '../../admin/models/roles';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;
  public _roles: Roles[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private roleService: RoleServiceService,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  /**
   * @description: Load Roles from service
   */

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles: Roles[]) => this._roles = roles,
      error: (err) => console.error('Error loading roles:', err)
    });
  }

  /**
   * @description : Used for login 
   */
  login() {
    if (this.form.valid) {
      const { username, password } = this.form.value;

      this.authService.login(username, password).subscribe({
        next: (res) => {
          const _roleId = res.user.role;
          const _userId = res.user.id;
          this.roleService.getRoleById(_roleId).subscribe({
            next: (roleData) => {
              // this.authService.setRoleName(roleData.name);
              switch (roleData.name) {
                case 'Admin':
                  
                  this.authService.setSession(roleData.name);
                  this.authService.setName(res.user.username);
                  this.authService.setUserId(_userId);
                  this.router.navigate(['/admin']);
                  break;
                case 'Teacher':
                  
                  this.authService.setSession(roleData.name);
                  this.authService.setName(res.user.username);
                  this.authService.setUserId(_userId);
                  this.router.navigate(['/teacher']);
                  break;

                case 'Student':
                  this.authService.setSession(roleData.name);
                  this.authService.setName(res.user.username);
                     this.authService.setUserId(_userId);
                  this.router.navigate(['/student']);
                  break;

                case 'Clerk':
                  this.authService.setSession(roleData.name);
                  this.authService.setName(res.user.username);
                     this.authService.setUserId(_userId);
                  this.router.navigate(['/clerk']);
                  break;
                default:
                  this.router.navigate(['/login']);
                  break;
              }

              //
              // if (res.user.role === 'Admin') this.router.navigate(['/admin']);
              // else if (res.user.role === 'Teacher') this.router.navigate(['/teacher']);
              // else if (res.user.role === 'Student') this.router.navigate(['/student']);
              // else if (res.user.role === 'Clerk') this.router.navigate(['/clerk']);
              // else this.router.navigate(['/login']);
            }
          });
        },

        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid username or password');
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
