import {  Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class Rest {
    headers:Headers;
    constructor(private http:Http){
        //this.headers.append('Content-Type', 'application/json');
        this.headers =  new Headers({ 'Content-Type': 'application/json' });
    }

    get(theUrl:string,theParams:any){
        //update header
         let options:any;
         if(theParams)
            options = new RequestOptions({ headers: this.headers, params:theParams });
         else
            options = new RequestOptions({ headers: this.headers});

        //return the get result
        return this.http.get(theUrl,options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    

    post(theUrl:any,body:any){
        //update header
         let options = new RequestOptions({ headers: this.headers });

        //return the get result
        return this.http.post(theUrl,body,options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    extractData(res:Response){
        let body=res.json();
        return body.data||{}
    }

    handleError(error:Response|any){
        let errMsg:string;
        if(error instanceof Response){
            const body=error.json()||'';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`
        }else{
            errMsg = error.message?error.message:error.toString()
        }
        console.error(errMsg);
        return Observable.throw(errMsg)
    }
}
