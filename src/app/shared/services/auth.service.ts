import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestClientService } from './restClient.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  loginInfo: any;
  constructor(private restClient: RestClientService, public router: Router) { }

  login(username: string, password: string) {
    /*return this.restClient.post({ hasAuth: false, url: 'users/api/auth',payload:{username: username, password: password}})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          this.router.navigateByUrl('role/' + result.role + '/dashboard');
          return true;
        })
      );*/
      return new Promise((resolve,reject) => {
        this.restClient.post({ hasAuth: false, url: 'login',payload:{username: username, password: password}}).subscribe((data) => {
            resolve(data);
        },
        (err) => {reject(err);}
      );
    })
  }


  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}