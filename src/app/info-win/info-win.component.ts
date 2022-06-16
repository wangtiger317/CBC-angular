import { Component, OnInit,Input } from '@angular/core';
import { config } from '../config';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-info-win',
  templateUrl: './info-win.component.html',
  styleUrls: ['./info-win.component.css']
})
export class InfoWinComponent implements OnInit {
  @Input() list_no:String;
  @Input() desc:String;
  theImgSrc:String;
  
  //constructor(private router:Router) { }

  printLifeCycleFlag:boolean=false;
  ngOnInit(){
	  this.theImgSrc = "https://h3a.mlspin.com/photo/photo.aspx?mls="+this.list_no;
    if(this.printLifeCycleFlag)console.log("== onInit")
  }
  ngOnChanges(){
    if(this.printLifeCycleFlag)console.log("== onChanges")
  }
  ngDoCheck(){
    if(this.printLifeCycleFlag)console.log("== doCheck")
  }
  ngAfterContentInit(){
    if(this.printLifeCycleFlag)console.log("== onAfterContentInit")
  }
  ngAfterContentChecked(){
    if(this.printLifeCycleFlag)console.log("== onAfterContentChecked")
  }
  ngAfterViewInit(){
    if(this.printLifeCycleFlag)console.log("== onAfterViewInit")
  }
  ngAfterViewChecked(){
    if(this.printLifeCycleFlag)console.log("== onAfterViewChecked")
  }
  ngOnDestroy(){
    if(this.printLifeCycleFlag)console.log("== onDestroy")
  }


  mouseClick(){
    //this.router.navigate(['/property/'+this.list_no])
    window.location.assign(config.url.base+"/property/?pid=" + this.list_no)
  }

}