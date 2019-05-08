import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoursesModule } from './courses/courses.module';
import { ProgressTrackerModule } from './progress-tracker/progress-tracker.module';
import { ReportModule } from './report/report.module';
import { PopupComponent } from './components/popup/popup.component';



@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        DashboardModule,
        CoursesModule,
        ProgressTrackerModule,
        ReportModule,
        AngularFontAwesomeModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, PopupComponent],
    entryComponents: [PopupComponent]
})
export class LayoutModule {}
