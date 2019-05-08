import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestClientService } from './restClient.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable()
export class CourseService implements OnInit  {
    courseList: any;
    user: any;
  constructor(private restClient: RestClientService, public router: Router) { }
  public getCourseList(){
      this.user = localStorage.getItem('user_info');
      this.user = JSON.parse(this.user);
    /*return new Promise((resolve,reject) => {
        this.restClient.getApi({ hasAuth: true, url: 'courses/'+this.user['username']}).subscribe((data) => {
              resolve(data);
      });
    })*/
    return new Promise((resolve,reject) => {
        this.restClient.getApi({ hasAuth: true, url: 'courses/'+this.user['username']}).subscribe((data) => {
              resolve(data);
      },
      (err) => {reject(err);});
    })
  }

  async getCourses(){
      this.courseList = await this.getCourseList();
      return this.courseList;
  }

  ngOnInit(){
    //this.courseList = [];
  }


}