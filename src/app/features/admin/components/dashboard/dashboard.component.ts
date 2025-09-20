import { Component, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, MatIconModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit {
  // totalStudents = 5;
  // totalTeachers = 3;
  // totalClasses = 3;
  averageAttendance = 85; // Example value

  ngOnInit() {
    // TODO: Replace with API calls
  }
  
  totalStudents = 1200;
  totalTeachers = 75;
  totalClasses = 40;
  feesCollected = 850000;   // in rupees
  pendingFees = 150000;     // in rupees
  totalExpenses = 500000;   // in rupees

//   recentActivities = [
//     { activity: 'Admission of John Doe', date: '2025-08-14' },
//     { activity: 'Fee payment by Class 10', date: '2025-08-13' },
//     { activity: 'Sports event organized', date: '2025-08-10' },
//   ];

  ngAfterViewInit(): void {
    const chartDom = document.getElementById('attendanceChart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Attendance Overview'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Attendance (%)',
          type: 'bar',
          smooth: true,
          data: [95, 92, 88, 94, 90],
          areaStyle: {}
        }
      ]
    };

    myChart.setOption(option);

    // Make chart responsive
    window.addEventListener('resize', () => {
      myChart.resize();
    });





        // This is the correct place to initialize ECharts.
    this.createFinancialChart();
  }

// }

// import { Component, AfterViewInit, OnInit } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatListModule } from '@angular/material/list';
// import * as echarts from 'echarts';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true, // Use this for standalone components in Angular 19
//   imports: [
//     MatCardModule,
//     MatTableModule,
//     MatIconModule,
//     CommonModule,
//     MatButtonModule,
//     MatListModule
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css'
// })
// export class DashboardComponent implements OnInit, AfterViewInit {
  // Key Metrics
  // totalStudents: number = 0;
  // totalTeachers: number = 0;
  // totalClasses: number = 0;
  // feesCollected: number = 0;
  // pendingFees: number = 0;
  // totalExpenses: number = 0;
  // netProfit: number = 0;
  // newAdmissions: number = 0;

  // Data for additional sections
  recentActivities = [
    { activity: 'Admission of John Doe', date: new Date('2025-08-14') },
    { activity: 'Fee payment by Class 10', date: new Date('2025-08-13') },
    { activity: 'Sports event organized', date: new Date('2025-08-10') },
    { activity: 'New circular for summer holidays', date: new Date('2025-08-09') },
    { activity: 'Annual maintenance fee paid', date: new Date('2025-08-08') },
  ];

  upcomingExams = [
    { name: 'Mid-term Exam - Maths', class: 'Grade 9', date: new Date('2025-11-15') },
    { name: 'Annual Science Fair', class: 'All Grades', date: new Date('2025-12-01') },
    { name: 'Finals - English', class: 'Grade 12', date: new Date('2025-12-10') },
  ];

  announcements = [
    { type: 'alert', title: 'PTM on Saturday', message: 'Parent-Teacher Meeting for all classes this Saturday.', icon: 'campaign' },
    { type: 'info', title: 'New Library Books', message: 'The library has added new books on science and history.', icon: 'info' },
    { type: 'alert', title: 'Fee Payment Deadline', message: 'Last day to pay the second quarter fees is tomorrow.', icon: 'warning' },
  ];

  // constructor() {}

  // ngOnInit(): void {
  //   // Call the method to fetch initial data.
  //   // In a real application, you would use a service for this.
  //   this.fetchDashboardData();
  // }

  // ngAfterViewInit(): void {

  // }

  // This method simulates fetching data from a backend service
  // private fetchDashboardData(): void {
  //   // In a real application, replace these with HTTP requests to your API.
  //   this.totalStudents = 1250;
  //   this.totalTeachers = 85;
  //   this.totalClasses = 45;
  //   this.feesCollected = 1550000;
  //   this.pendingFees = 320000;
  //   this.totalExpenses = 980000;
  //   this.newAdmissions = 52;
  //   this.netProfit = this.feesCollected - this.totalExpenses;
  // }

  /**
   * Initializes and renders the ECharts Financial Overview chart.
   * This replaces your existing attendance chart logic.
   */
  private createFinancialChart(): void {
    const chartDom = document.getElementById('financialChart') as HTMLElement;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: 'Financial Overview',
          left: 'center',
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Fees Collected', 'Total Expenses'],
          bottom: '5%'
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '₹{value}',
            color: '#666'
          }
        },
        series: [
          {
            name: 'Fees Collected',
            type: 'line',
            data: [150000, 180000, 200000, 195000, 220000, 250000], // Mock data
            itemStyle: {
              color: '#3b82f6' // Tailwind blue-500
            }
          },
          {
            name: 'Total Expenses',
            type: 'line',
            data: [100000, 110000, 125000, 130000, 140000, 155000], // Mock data
            itemStyle: {
              color: '#ef4444' // Tailwind red-500
            }
          }
        ]
      };
      myChart.setOption(option);

      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
  }
}