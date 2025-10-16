import { Component , OnInit} from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  imports: [RouterOutlet],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.css'
})
export class StudentLayoutComponent  implements OnInit {
 pageTitle = '';
  public _userName: string = '';
  public _userRole: string = ''

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
  }

  ngOnInit(): void {
    // this.updatePageTitle();
        const userName = localStorage.getItem('name');
    const userRole = localStorage.getItem('role');
    if (userName && userRole) {
      this._userName = userName;
      this._userRole = userRole;
    }
  }
  updatePageTitle() {
    const url = this.router.url;
    if (url.includes('dashboard')) this.pageTitle = 'Dashboard';
    else if (url.includes('manage-students')) this.pageTitle = 'Manage Students';
    else if (url.includes('manage-teachers')) this.pageTitle = 'Manage Teachers';
    else if (url.includes('fee-management')) this.pageTitle = 'Fee Management';
    else if (url.includes('result-upload')) this.pageTitle = 'Result Upload';
    else if (url.includes('id-card')) this.pageTitle = 'ID Card Generator';
    else if (url.includes('notifications')) this.pageTitle = 'Notifications';
    else this.pageTitle = 'Dashboard';

    const _currentRouterLink = url.split('/')[2];
    this.pageTitle = _currentRouterLink.charAt(0).toUpperCase() + _currentRouterLink.slice(1).replace('-', ' ');
    switch(_currentRouterLink){
      case 'dashboard':
        this.pageTitle = 'Dashboard';
        break;
      case 'manage-students':
        this.pageTitle = 'Manage Students';
        break;
      case 'manage-teachers':
        this.pageTitle = 'Manage Teachers';
        break;
      case 'fee-management':
        this.pageTitle = 'Fee Management';
        break;
      case 'result-upload':
        this.pageTitle = 'Result Upload';
        break;
      case 'id-card':
        this.pageTitle = 'ID Card Generator';
        break;
      case 'notifications':
        this.pageTitle = 'Notifications';
        break;
      default:
        this.pageTitle = 'Dashboard';
    }
  }

  logout() {
    // TODO: Add auth service logout logic
    this.router.navigate(['/login']);
  }

  navigateToRouter(route: string){
    switch(route){
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'manage-students':
        this.router.navigate(['/manage-students']);
        break;
      case 'manage-teachers':
        this.router.navigate(['/manage-teachers']);
        break;
      case 'fee-management':
        this.router.navigate(['/fee-management']);
        break;
      case 'result-upload':
        this.router.navigate(['/result-upload']);
        break;
      case 'id-card':
        this.router.navigate(['/id-card']);
        break;
      case 'notifications':
        this.router.navigate(['/notifications']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}
