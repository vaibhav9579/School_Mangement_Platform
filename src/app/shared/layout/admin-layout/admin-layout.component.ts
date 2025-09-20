import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})

export class AdminLayoutComponent implements OnInit {
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
    else if (url.includes('student')) this.pageTitle = 'Manage Students';
    else if (url.includes('teacher')) this.pageTitle = 'Manage Teachers';
    else if (url.includes('fee')) this.pageTitle = 'Fee Management';
    else if (url.includes('result')) this.pageTitle = 'Result Upload';
    else if (url.includes('id')) this.pageTitle = 'ID Card Generator';
    else if (url.includes('user')) this.pageTitle = 'Manage User';
    else if (url.includes('class')) this.pageTitle = 'Manage Classes';
    // else if (url.includes('notification')) this.pageTitle = 'Notifications';
    else this.pageTitle = '';

    const _currentRouterLink = url.split('/')[2];

    switch (_currentRouterLink) {
      case 'dashboard':
        this.pageTitle = 'Dashboard';
        break;
      case 'student':
        this.pageTitle = 'Manage Students';
        break;
      case 'teacher':
        this.pageTitle = 'Manage Teachers';
        break;
      case 'fee':
        this.pageTitle = 'Fee Management';
        break;
      case 'result':
        this.pageTitle = 'Result Upload';
        break;
      case 'id':
        this.pageTitle = 'ID Card Generator';
        break;
      case 'user':
        this.pageTitle = 'Manage User';
        break;
      case 'class':
        this.pageTitle = 'Manage Classes';
        break;
      // case 'notification':
      //   this.pageTitle = 'Notifications';
      //   break;
      default:
        this.pageTitle = '';
    }
  }

  logout() {
    // TODO: Add auth service logout logic
    this.router.navigate(['/login']);
  }

  navigateToSelDash(navigation: string) {
    console.log('navigate function is activating');
    this.router.navigate(['admin/user']);

    switch (navigation) {
      case "dashboard":
        this.router.navigate(['admin/dashboard']);
        break;

      case "user":
        this.router.navigate(['admin/user']);
        break;

      case "class":
        this.router.navigate(['admin/class']);
        break;

      case "fee":
        this.router.navigate(['admin/fee']);
        break;

      // case "teacher":
      //   this.router.navigate(['admin/teacher']);
      //   break;

      case "result":
        this.router.navigate(['admin/result']);
        break;

      case "id":
        this.router.navigate(['admin/id']);
        break;

      case "leave":
        this.router.navigate(['admin/leave']);
        break;

      case "notification":
        this.router.navigate(['admin/notification']);
        break;

      case "leave":
        this.router.navigate(['admin/leave']);
        break;

      case "addrole":
        this.router.navigate(['admin/addrole']);
        break;

      case "Allotleave":
        this.router.navigate(['/admin/Allotleave']);
        break;

      case "notification":
        this.router.navigate(['admin/notification']);
        break;
    }
  }
}
