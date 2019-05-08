import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CourseService } from '../../shared/services/course.service';
import { ServerDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [routerTransition()]
})
export class CoursesComponent implements OnInit {

  //currentUser: any;
  courses: any[];
  message: string;
  headerMessage: string;

  settings = {
    defaultStyle: false,
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'view',
          title: 'View ',
        }
      ],
    },
    columns: {
      course_name: {
        title: 'Course Name',
        type: 'string',
        width: '25%'
      },
      duration: {
        title: 'Duration',
        type: 'string',
        width: '25%'
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%'
      },
      author: {
        title: 'Author',
        type: 'string',
        width: '25%'
      }
    },
  };

  source: ServerDataSource;

  constructor(private courseService: CourseService, private router:Router, public modalService: ModalService) {

  }

  onCustom(event) {
    //this.router.navigateByUrl('/role/' + this.currentUser['role'] + '/course-details');
  }

  async ngOnInit() {
    this.message = "Your Session Expired, Please Login again";
    this.headerMessage = "Session Expired";
    this.courses = await this.courseService.getCourses();
    if(this.courses['statusCode'] === 401 ){
      this.modalService.openModal(this.headerMessage, this.message).then((result) => {
        this.router.navigateByUrl('login');
      })
    }
    console.log(this.courses);
  }

}
