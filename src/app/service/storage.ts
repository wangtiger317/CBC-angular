import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { config } from '../config';
import { CommonService } from './common.service'

@Injectable()
export class Storage {
    cfg = config;
    key: string;
    res: any;

    constructor(private http: HttpClient,private cs:CommonService) {    }

    get(obj, parseResult2JsonFlag = false, cb,paramId,meta): void { // type of the content, obj:{type:'',id:'',content:''}
        if (obj && obj.type && obj.id) {
            obj.lan=this.cs.lan;
            //get the content from local storage
  /*          this.key = obj.type + "_" + obj.id + "_" + obj.lan;
            this.res = this.cs.getItem(this.key); //todo: what if localStorage not work
            if (this.res) {
                if (parseResult2JsonFlag) {
                    obj.content = JSON.parse(this.res)
                } else {
                    obj.content = this.res;
                }
                //update meta description
                if(meta)
                    if(paramId=='home'){
                        meta.updateTag({ name: 'description', content: "Concordia Boston provides comprehensive financial services that help you achieve your capital goals in real estate, insurance, investment, estate planning, and funding strategy for prominent life events such as mortgage, child education, retirement, and family trust" });
                    }else{
                        meta.updateTag({ name: 'description', content: obj.content?obj.content.substring(1,320).replace(/<(?:.|\n)*?>/gm, ''):'' });
                    }
                if (cb) {
                    if(obj.content.search("container")==-1){
                        let ctn="<div class='container'><div class='row'>"
                        obj.trustedContent = cb(ctn+obj.content+"</div></div>")
                    }else{
                        obj.trustedContent = cb(obj.content)
                    }
                }
            }
            if(!obj.content){
                this.cs.alert.type="warning";
                this.cs.alert.msg=config.trans.underConstruction
            }
*/
            //get the content from backend and update local storage & the obj.content
            let theParam = new HttpParams().set('id', obj.id).set('lan', obj.lan).set('type', obj.type);
            this.http.get(this.cfg.url[obj.type]['get'], { params: theParam }).subscribe((data) => {
                this.cs.alert.type="default";
                this.cs.alert.msg={en:"",zh:""}
                if (data) {
                    if (data instanceof Array) { // the data returned by get
                        if (data[0]) {
                            obj.content = data[0].content;
                            obj.title = data[0].title;
                            obj.tag = data[0].tag;
                            obj.md = data[0].md;
                        //    this.cs.setItem(this.key, obj.content);
                            if(obj.content.search("container")==-1){
                                let ctn="<div class='container'><div class='row'>"
                                obj.trustedContent = cb(ctn+obj.content+"</div></div>")
                            }else{
                                obj.trustedContent = cb(obj.content)
                            }
                            //update meta description
                            if(meta)
                                if(paramId=='home'){
                                    meta.updateTag({ name: 'description', content: "Concordia Boston provides comprehensive financial services that help you achieve your capital goals in real estate, insurance, investment, estate planning, and funding strategy for prominent life events such as mortgage, child education, retirement, and family trust" });
                                }else{
                                    meta.updateTag({ name: 'description', content: obj.content?obj.content.substring(1,320).replace(/<(?:.|\n)*?>/gm, ''):'' });
                                }
                        }else{
                            obj.content = '';
                            obj.title = '';
                            obj.tag = '';
                            obj.md = '';
                        }
                    }
                }
                if(!obj.content && obj.type==this.cfg.storageKey.page){
                    this.cs.alert.type="warning";
                    this.cs.alert.msg=config.trans.underConstruction
                }
            })
        }
    }

    post(obj, cb,perm): void { // type of the content, obj:{type:'',id:'',content:''}
        if (obj && obj.type && obj.id) {
            obj.lan = this.cs.lan;
            //post the content to backend
            var up = this.cs.getUserProfile();
            if(up && up.token){
                let theHeader = new HttpHeaders().set('Authorization', up.token); //todo:change the header
                var i;
                this.http.post(this.cfg.url[obj.type]['post'], obj, { headers: theHeader }).subscribe(function (i, perm,data) {
                    
                    let rkey=this.cfg.res.key;
                    if (data) {
                        if (data instanceof Array) { // the data returned by get
                            //not possible
                        } else {// the data returned by post
                            if (data[rkey.code]) {
                                if (data[rkey.code] == "success") {
                                    //post is successful
                                    obj.upd = true;
                                    perm.edit = true;
                                    perm.save = false;
                                    perm.cancel = false;
                                    perm.showContent = true;
                                    perm.showEditContent = false;
                                } else if (data[rkey.code] == "error") {
                                    //post failed
                                    obj.upd = false
                                }
                            }
                        }
                    } else {//nothing returned
                        obj.upd = false
                    }
                //    let key = obj.type + "_" + obj.id + "_" + obj.lan;
                //    this.cs.setItem(key, obj.content); //todo: what if localStorage not work
                //    this.cs.setItem(key + "_upd", obj.upd,false);
                    if (cb)
                        obj.trustedContent = cb(obj.content);
                }.bind(this, obj,perm))
            }
        }
    }
    
    set(): void {

    }
}
