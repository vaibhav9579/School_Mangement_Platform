import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-clerk-layout',
  imports: [RouterOutlet],
  templateUrl: './clerk-layout.component.html',
  styleUrls: ['./clerk-layout.component.css']
})

export class ClerkLayoutComponent {
  pageTitle = '';
  public _userName: string = '';
  public _userRole: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
  }

  ngOnInit(): void {
    // fetch current user name
    const userName = localStorage.getItem('name');
    const userRole = localStorage.getItem('role');
    if (userName && userRole) {
      this._userName = userName;
      this._userRole = userRole;
    }
  }

  updatePageTitle() {
    const url = this.router.url; // /admin/dashboard
    console.log('url:', url);
    if (url.includes('dashboard')) this.pageTitle = 'Dashboard';
    else if (url.includes('fee')) this.pageTitle = 'Fees Management';
    else if (url.includes('admission')) this.pageTitle = 'Admission Management';
    else if (url.includes('attendence')) this.pageTitle = 'Manage Attendance';
    else if (url.includes('studentrecord')) this.pageTitle = 'Manage Student Records';
    else if (url.includes('teacherreacord')) this.pageTitle = 'Manage Teacher Records';
    else if (url.includes('payment')) this.pageTitle = 'Payment Management';
    else if (url.includes('admission-confirm')) this.pageTitle = "Admission Confirmation";
    // else if (url.includes('notification')) this.pageTitle = 'Notifications';
    else this.pageTitle = '';
  }

  logout() {
    // TODO: Add auth service logout logic
    this.router.navigate(['/login']);
  }

  navigateToSelDash(navigation: string) {
    console.log('navigate function is activating');
    this.router.navigate(['clerk/user']);

    switch (navigation) {
      case "dashboard":
        this.router.navigate(['clerk/dashboard']);
        break;

      case "admission":
        this.router.navigate(['clerk/admission']);
        break;
        
      case "fee":
        this.router.navigate(['clerk/fee']);
        break;

      case "attendence":
        this.router.navigate(['clerk/attendence']);
        break;

      case "studentrecord":
        this.router.navigate(['clerk/studentrecord']);
        break;

      case "teacherrecord":
        this.router.navigate(['clerk/teacherrecord']);
        break;

      case "admission-confirm":
        this.router.navigate(['clerk/admission-confirm']);
        break;
        
      case "payment":
        this.router.navigate(['clerk/payment']);
        break;
    }
  }
}
