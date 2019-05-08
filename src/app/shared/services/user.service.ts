import { Injectable } from '@angular/core';
import { RestClientService } from './restClient.service';
import { Config } from '../../../environments/config';
import * as _ from "lodash";

@Injectable()
export class UserService {

  private userArray: any;
  private currentUser: {};
  users: any;

  constructor(private restClient: RestClientService) {}

  async currentloggedUser(){
    if(!_.isEmpty(this.currentUser)){
      return this.currentUser;
    }
    else{
      this.currentUser = await this.getCurrentUser();
      return this.currentUser;
    }
  }

  private getEndUserList(){
    return new Promise((resolve,reject) => {
        this.restClient.get({ hasAuth: false, url: 'users' }).subscribe((data) => {
          //this.restClient.get({ hasAuth: false, url: Config.apiEndpoints.userList }).subscribe((data) => {
            resolve(data);
        });
      })
  }

  setUser(email) {
    return new Promise((resolve,reject) => {
      this.getEndUserList().then((userList) => {
        this.userArray = userList;
        var userIndex = _.findIndex(this.userArray,['email', email]);
        if(userIndex == -1) {
          userIndex = 0;
        }
        this.currentUser = this.userArray[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        resolve();
      });
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      if(!this.currentUser) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }
      resolve(this.currentUser);
    });
  }

  logoutUser() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}