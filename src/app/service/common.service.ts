import { Injectable } from '@angular/core';
import { config } from '../config';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { LZString } from 'lz-string';

interface Message {
  type: string;
  payload: any;
}

type MessageCallback = (payload: any) => void;

@Injectable()
export class CommonService {

  constructor() { }

  public lan: string = 'en'; //for language to be used globally

  private handler = new Subject<Message>();

  broadcast(type: string, payload: any) {
    this.handler.next({ type, payload });
  }

  subscribe(type: string, callback: MessageCallback): Subscription {
    return this.handler
      .filter(message => message.type === type)
      .map(message => message.payload)
      .subscribe(callback);
  }

  //for the sub page title
  public theTitle={};

  public setTitle(type,obj){
      this.theTitle[type]=obj
  }
  
  public userTemplate = {
    c: { //for common part btw. client & server
      id: "",
      userName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender:"",
      birthDate:"",
      icon: "",
      group: [],
      email: "",
      contact: {
        email2: "",
        address: {
          address:"",
          street_number:"",
          street:"",
          city: "",
          state: "",
          country: "",
          zip: ""
        },
        phone: {
          home: "",
          office: "",
          mobile: ""
        },
        social: {
          wechat: "",
          facebook: "",
          linkedIn: "",
          twitter: ""
        }
      }
    },
    token: "",
    password: "",
    rm: false, //for remember me
    privilege: []
  };

  public user = Object.assign({}, this.userTemplate, {});

  public isUserLogin() {
    if (this.user && this.user.c && this.user.c.email && this.user.token)
      return true;

    this.user = this.getUserProfile();
    if (this.user && this.user.c && this.user.c.email && this.user.token)
      return true;

    return false;
  }

  public getUserProfile() {
    if (this.user.c.email == "") {  //JSON.stringify(this.user) == JSON.stringify(this.userTemplate)){
      let res = this.getItem(config.storageKey.userProfile);
      if (res) {
        return JSON.parse(res);
      } else {
        return Object.assign({}, this.userTemplate, {});
      }
    }
    return this.user;
  }

  public alert = {
    type: "",
    msg: { en: "", zh: "" }
  };

  public resetAlertMsg() {
    this.alert.type = "";
    this.alert.msg = { en: "", zh: "" }
  }

  public currentProperty = {};

  public loginPanelTitle = {};

  public isObjEmpty = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  public getTheDate = function (obj) { //obj={month:n, day:m, date:k}, n/m/k>0 => future date, n/m/k<0 => previous date
    let res = "";
    let today = new Date();
    let newDay = today;

    if (obj["month"]) {
      newDay.setMonth(today.getMonth() + obj["month"])
    }

    if (obj["date"]) {
      newDay.setDate(today.getDate() + obj["date"])
    }

    let theMonth = newDay.getMonth() + 1;
    let theDate = newDay.getDate();

    res = newDay.getFullYear() + "-" + (theMonth < 10 ? "0" + theMonth : theMonth) + "-" + (theDate < 10 ? "0" + theDate : theDate);

    return res
  }

  public setItem(key, value, compressFlag = true) {
    if (key && value) {
      let newValue = value;
      if (compressFlag) {
        newValue = LZUTF8.compress(value, { outputEncoding: "Base64" })
      };
      localStorage.setItem(key, newValue);
    }
  }

  public getItem(key, compressFlag = true) {
    let res: string;
    if (key) {      
      res = localStorage.getItem(key);
      if (compressFlag && res) {
        res = LZUTF8.decompress(res, { inputEncoding: "Base64" })
      }
    }
    return res
  }

  public encpwd(str) {
    let res: string;
    if (str) {
      res = LZUTF8.compress(this.getStr(5) + str + this.getStr(8), { outputEncoding: "BinaryString" })
    }
    return res
  }

  public getStr(n) {
    let res: string;
    for (let i = 0; i < n; i++) {
      if (i == 0) {
        res = String.fromCharCode(Math.floor((Math.random() * 85) + 41))
      } else {
        res = res + String.fromCharCode(Math.floor((Math.random() * 85) + 41))
      }
    }
    return res
  }

  public reRoute(rt, theUrl, data) {
    rt.navigate(theUrl)
  }
}
