import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-clerk-layout',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './clerk-layout.component.html',
  styleUrls: ['./clerk-layout.component.css']
})

export class ClerkLayoutComponent {
  pageTitle = '';
  public _userName: string = '';
  public _userRole: string = '';
  searchTerm = '';
  isSidebarOpen = true;

  menuItems = [
    // { path: 'dashboard', label: 'Dashboard', icon: 'bi-house' },
    { path: 'inward', label: 'Inward', icon: 'bi-cash-stack' },
    { path: 'outward', label: 'Outward', icon: 'bi-cash-stack' },
    { path: 'admission', label: 'Admission', icon: 'bi-person-badge' },
    { path: 'fee', label: 'Fee Management', icon: 'bi-people' },
    { path: 'attendance', label: 'Attendence Reports', icon: 'bi-calendar' },
    { path: 'studentrecord', label: 'Student Records', icon: 'bi-person-video3' },
    { path: 'subject-assign', label: 'Assign Subjects', icon: 'bi-cash-stack' },
    { path: 'class-teacher', label: 'Class Teacher Assign', icon: 'bi-cash-stack' },
    { path: 'subject-teacher', label: 'Assign Teacher to Subject', icon: 'bi-cash-stack' },
    { path: 'mark_memo', label: 'Mark Memo', icon: 'bi-cash-stack' }
  ];

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

    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
  }

  // Toggles the sidebar open and closed
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  filteredMenuItems() {
    const term = this.searchTerm.toLowerCase();
    return this.menuItems.filter(item => item.label.toLowerCase().includes(term));
  }

  clearSearch() {
    this.searchTerm = '';
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

      case "attendance":
        this.router.navigate(['clerk/attendance']);
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

      case "subject-assign":
        this.router.navigate(['clerk/subject-assign']);
        break;

      case "payment":
        this.router.navigate(['clerk/payment']);
        break;

      case "class-teacher":
        this.router.navigate(['clerk/class-teacher']);
        break;

      case "subject-teacher":
        this.router.navigate(['clerk/subject-teacher']);
        break;

      case "mark_memo":
        this.router.navigate(['clerk/mark_memo']);
        break;

      case "inward":
        this.router.navigate(['clerk/inward']);
        break;

      case "outward":
        this.router.navigate(['clerk/outward']);
        break;
    }
  }
}
