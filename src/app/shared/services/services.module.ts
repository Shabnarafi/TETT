import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestClientService } from './restClient.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CourseService } from './course.service';
import { ModalService } from './modal.service';
import { LayoutModule } from '../../layout/layout.module';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  declarations: [],
  providers: [
    RestClientService,
    UserService,
    AuthService,
    CourseService,
    ModalService
  ]
})
export class ServicesModule { }