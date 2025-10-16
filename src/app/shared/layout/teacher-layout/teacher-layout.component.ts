import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-layout',
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css'
})

export class TeacherLayoutComponent  implements OnInit{
 pageTitle = '';
 public _userName : string = '';
 public _userRole : string = '';

  isSidebarOpen = true;
  searchTerm = '';

teacherMenuItems = [
  { path: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },           // Dashboard overview
  { path: 'my-students', label: 'My Students', icon: 'bi-people-fill' },        // Group of students
  { path: 'attendance', label: 'Attendance', icon: 'bi-calendar-check-fill' },  // Attendance tracking
  { path: 'assign-homework', label: 'Assign Homework', icon: 'bi-pencil-square' }, // Homework assignment
  { path: 'chat', label: 'Chat', icon: 'bi-chat-left-text-fill' },              // Messaging/chat
  { path: 'studentLeave', label: 'Student Leave', icon: 'bi-person-x-fill' },   // Student leave requests
  { path: 'leaverequest', label: 'Leave Request', icon: 'bi-envelope-open-fill' }, // Incoming leave requests
  { path: 'myleave', label: 'My Leave', icon: 'bi-calendar-minus-fill' },       // Teacher’s own leave
  { path: 'class', label: 'Fill Mark', icon: 'bi-journal-check' }               // Mark entry
];



  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
  }

  ngOnInit(): void {
    const userName = localStorage.getItem('name');
    const userRole = localStorage.getItem('role');

    if(userName && userRole){
      this._userName = userName;
      this._userRole = userRole;
    }
  }



  filteredMenuItems() {
    const term = this.searchTerm.toLowerCase();
    return this.teacherMenuItems.filter(item => item.label.toLowerCase().includes(term));
  }

  clearSearch() {
    this.searchTerm = '';
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  updatePageTitle() {
    const url = this.router.url;
    if (url.includes('dashboard')) this.pageTitle = 'Dashboard';
    else if (url.includes('my-students')) this.pageTitle = 'My Students';
    // else if (url.includes('upload-result')) this.pageTitle = 'Upload Result';
    else if (url.includes('assign-homework')) this.pageTitle = 'Assign Homework';
    else if (url.includes('chat')) this.pageTitle = 'Chat';
    else if (url.includes('attendance')) this.pageTitle = 'Attendance';
    else if (url.includes('studentLeave')) this.pageTitle = 'Student Leave';
    else if (url.includes('myleave')) this.pageTitle = 'My Leave';
    else if (url.includes('leaverequest')) this.pageTitle = 'Leave Request';
    else if (url.includes('class')) this.pageTitle = 'Classes';
    else this.pageTitle = '';
    }

  logout() {
    // TODO: Add auth service logout logic
    this.router.navigate(['/login']);
  }

  navigateToSelectedPage(selectedPage: string) {
    this.router.navigate([`/teacher/${selectedPage}`]);
  }
}
