import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teacher-layout',
  imports: [RouterOutlet],
  templateUrl: './teacher-layout.component.html',
  styleUrl: './teacher-layout.component.css'
})
export class TeacherLayoutComponent  implements OnInit{
 pageTitle = '';
 public _userName : string = '';
 public _userRole : string = '';

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

  updatePageTitle() {
    const url = this.router.url;
    if (url.includes('dashboard')) this.pageTitle = 'Dashboard';
    else if (url.includes('my-students')) this.pageTitle = 'My Students';
    else if (url.includes('upload-result')) this.pageTitle = 'Upload Result';
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
