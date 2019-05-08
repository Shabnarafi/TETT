import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../../environments/config';

interface Options {
  hasAuth ?: boolean;
  url: string;
  header?:HttpHeaders;
  payload?: any;
  params?:HttpParams;
}

interface ServerResponse{
    hasError: boolean;
    message: string;
    payload?: any;
    statusCode: number;
    graph?:any;
    pagination ? :any;
    token: string;
    role: string;
}
//TO DO : Handle Errors in another service
@Injectable()
export class RestClientService{
    constructor(private httpClient: HttpClient){}

    private hostUrl = "http://localhost:3000/";
    //private hostUrl = Config.baseUrl;

    post(options:Options){
        let hasAuth = options.hasAuth || true;
        let url = options.url;
        let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
        let payload = options.payload;
        if(hasAuth){
            header = header.append('Authorization', 'Bearer '+ localStorage.getItem('access_token'));
        }
        return this.httpClient.post<ServerResponse>(this.hostUrl+url,payload,{headers:header});
        
    }

    // postForArrayResponse(options:Options){
    //     let hasAuth = options.hasAuth || true;
    //     let url = options.url;
    //     let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
    //     let payload = options.payload;
    //     if(hasAuth){
    //         header = header.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    //     }
    //     return this.httpClient.post<{response:ServerResponse[]}>(this.hostUrl+url,payload,{headers:header});
    // }

    get(options:Options){        
        let hasAuth = options.hasAuth || true;
        let url = options.url;
        let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
        let params = options.params;
        if(hasAuth){
            header = header.append('Authorization', 'Bearer '+ localStorage.getItem('access_token'));
        }
        return this.httpClient.get<ServerResponse>(this.hostUrl + url,{headers:header, params: params});
    }

     getApi(options:Options): Observable<any>{
         let hasAuth = options.hasAuth || true;
         let url = options.url;
         let header = options.header || new HttpHeaders().set('Content-Type', 'application/json');
         let params = options.params;
         if(hasAuth){
             console.log('token' + localStorage.getItem('access_token'));
             header = header.append('Authorization', 'Bearer '+ localStorage.getItem('access_token'));
         }
         return this.httpClient.get<any>(this.hostUrl + url,{headers:header, params: params});
     }

}