import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    error: string;
    submitted: boolean = false;

    constructor(private userService: UserService,public router: Router,private authService: AuthService, private modalService: ModalService) {}
    onLoggedin(form: NgForm) {
        this.authService.login("shabna.r", "sh@b786amen4")
      .then((data) => {
          console.log(data);
        //let user_info = {username: data['role']['username'], role: data['role']['role']};
        //localStorage.setItem('access_token', data['token']);
        //localStorage.setItem('user_info', JSON.stringify(user_info));
        //this.router.navigateByUrl('role/' + data['role']['role'] + '/dashboard' );
      })
      .catch((err) => {
          this.modalService.openModal(err.error, 'Please enter correct username & password').then((result) => {
            this.router.navigateByUrl('login');
            form.value.username = '';
            form.value.password = '';  
            
          })
      })
  }

    ngOnInit() {
        
    }

    
    }
