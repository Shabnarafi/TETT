import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule
  ],
  declarations: [CoursesComponent, AddCourseComponent, CourseDetailsComponent]
})
export class CoursesModule { }
