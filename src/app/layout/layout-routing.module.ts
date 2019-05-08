import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'add-courses', component: AddCourseComponent },
            { path: 'course-details', component: CourseDetailsComponent },
            { path: 'progress-tracker', component: ProgressTrackerComponent },
            { path: 'report', component: ReportComponent }
        ]
    },
    {
        path: 'user',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: UserDashboardComponent },
            { path: 'course-progress', component: CoursesComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
