
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  pageTitle = 'Dashboard';
  public _userName: string = '';
  public _userRole: string = '';
  searchTerm: string = '';
  isSidebarOpen = true; // Controls the sidebar state (open/closed)

  public menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi-speedometer2', path: 'dashboard' },
    { label: 'Add Role', icon: 'bi-person-plus', path: 'addrole' },
    { label: 'Manage User', icon: 'bi-people', path: 'user' },
    { label: 'Academic Structure', icon: 'bi-diagram-3', path: 'academic-structure' },
    { label: 'Admission Approval', icon: 'bi-person-check', path: 'admission-approve' },
    { label: 'Apply Class Teacher', icon: 'bi-person-badge', path: 'apply-classteacher' },
    { label: 'Time Table', icon: 'bi-calendar-week', path: 'time-table' },
    { label: 'Manage Classes', icon: 'bi-journal-text', path: 'class' },
    { label: 'Leave Policy', icon: 'bi-file-earmark-text', path: 'leave-policy' },
    { label: 'Leave Approval', icon: 'bi-check2-square', path: 'leave' },
    { label: 'Leave Allotment', icon: 'bi-calendar-plus', path: 'Allotleave' },
    { label: 'Notifications', icon: 'bi-bell', path: 'notification' },
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updatePageTitle(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    // Set initial sidebar state based on screen width.
    // On mobile screens (< 768px), the sidebar will be closed by default.
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
    
    const userName = localStorage.getItem('name');
    const userRole = localStorage.getItem('role');

    if (userName && userRole) {
      this._userName = userName;
      this._userRole = userRole;
    } else {
      this._userName = 'Guest';
      this._userRole = 'Unknown';
    }
    
    this.updatePageTitle(this.router.url);
  }

  // Toggles the sidebar open and closed
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  filteredMenuItems(): MenuItem[] {
    if (!this.searchTerm.trim()) {
      return this.menuItems;
    }

    const term = this.searchTerm.toLowerCase();
    return this.menuItems.filter(item =>
      item.label.toLowerCase().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  updatePageTitle(url: string): void {
    const currentRoute = url.split('/').pop() || '';
    const activeItem = this.menuItems.find(item => item.path === currentRoute);
    
    this.pageTitle = activeItem ? activeItem.label : 'Admin';
  }

  logout(): void {
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  navigateToSelDash(page: string): void {
    // Navigation is handled by [routerLink] in the template.
  }
}