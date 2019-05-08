import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { CourseService } from '../../../shared/services/course.service';
import { ModalService } from '../../../shared/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  animations: [routerTransition()]
})
export class AdminDashboardComponent implements OnInit {
  public alerts: Array<any> = [];
  courseList: any;
    
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
};
public barChartLabels: string[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012'
];
public barChartType: string = 'bar';
public barChartLegend: boolean = true;

public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];
  constructor(private courseService: CourseService, private modalService: ModalService, private router: Router) {}

  getCoursesToDisplay(){
    let cDict = {};
    this.courseList.forEach(element => {
    });
  }

  ngOnInit() {
    this.courseService.getCourseList().then((data) => {
      this.courseList = data;
    })
    .catch((err) => {
      this.modalService.openModal(err.error, 'Session Expired. Please Login again').then((result) => {
        this.router.navigateByUrl('login');
    })
    console.log(this.courseList);
  })

}
}
