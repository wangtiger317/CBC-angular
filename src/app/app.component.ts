import { Component, OnInit, ViewChildren, ViewChild, QueryList, ElementRef, NgZone } from '@angular/core';
import { AgmCoreModule, AgmInfoWindow, MapsAPILoader, GoogleMapsAPIWrapper, AgmMap, LatLngBounds } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
//import { Router } from '@angular/router';
import { InfoWinComponent } from './info-win/info-win.component';
import { config } from './config';
import { CommonService } from './service/common.service';
import * as $ from 'jquery';
//import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'cbc-find-property',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 title = [];
  IMg = [{Photo: "Images/1.jpg"},{Photo: "Images/1.jpg"},{Photo: "Images/1.jpg"}];

  @ViewChildren(AgmInfoWindow) iw: QueryList<AgmInfoWindow>;
  @ViewChild("locSearch",{static: false}) searchLoc: ElementRef;
  @ViewChild("theMap",{static: false}) theMap: AgmMap;
  @ViewChild("iModal",{static: false}) im:ElementRef;
  niw: QueryList<AgmInfoWindow>;
  iwArray: AgmInfoWindow[];
  //location:Location;
  trans = {
    exceedMaxCountAlert: { en: "Too many properties found to be shown, please refine your search criteria!", zh: "找到了太多物业而无法显示, 请精简您的搜索条件!" },
    address:{zh:"地址,城市或邮编",en:"Address,City,Zip"}
  };
  exceedFlag = {maxCount: false,other:false};
  search = config.gmap.search;
  searchOption = config.gmap.searchOption;
  iw_opened = -1;
  autocomplete: any;
  markers={list:[]};// marker[];
  markerUrl: any;
  nzoom = 0;
  // initial center position for the map
  mapParam: any = config.gmap.map.initial;

  boundary = {
    ne: { lat: "", lng: "" },
    sw: { lat: "", lng: "" }
  }

  customizePriceFlag=false;

  constructor(private wrapper: GoogleMapsAPIWrapper, private mapsAPILoader: MapsAPILoader, private http: HttpClient, private cs: CommonService){//}, private router: Router) {
  }
  //constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {    super(mapsAPILoader, ngZone);  }

  printLifeCycleFlag: boolean = false;

  srcObj = {};
  m: {};

  ngOnInit() {
    this.cs.alert.type = "default";
    this.cs.alert.msg = { en: "", zh: "" };

    // assign value for mapParam
    let slat = this.cs.getItem(config.storageKey.mapCenterLat);
    this.mapParam.center.lat = slat ? parseFloat(slat) : config.gmap.map.initial.center.lat;
    let slng = this.cs.getItem(config.storageKey.mapCenterLng);
    this.mapParam.center.lng = slng ? parseFloat(slng) : config.gmap.map.initial.center.lng;
    let szoom = this.cs.getItem(config.storageKey.mapZoom);
    this.mapParam.zoom = szoom ? parseInt(szoom) : config.gmap.map.initial.zoom;

    //update the initial value of search input
    this.search.priceInput = this.searchOption.list_price[this.search.list_price].desc[this.cs.lan];
    this.search.bedroomInput = this.searchOption.no_bedrooms[this.search.no_bedrooms].desc[this.cs.lan];
    this.search.bathInput = this.searchOption.baths[this.search.baths].desc[this.cs.lan];

    //udpate search criteria
    if (this.search.no_bedrooms != "0")
      this.srcObj["no_bedrooms"] = this.searchOption.no_bedrooms[this.search.no_bedrooms].val;
    if (this.search.baths != "0")
      this.srcObj["baths"] = this.searchOption.baths[this.search.baths].val;
    if (this.search.list_price != "0")
      this.srcObj["list_price"] = this.searchOption.list_price[this.search.list_price].val;

    //update the url
    let uo = window.location;
    this.markerUrl = config.gmap.map.getMarkerUrl;//this.getMarkerUrl(uo.protocol,uo.host,uo.port,config.gmap.map.getMarkerUrl);

    //autocomplete for the address input form
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        this.searchLoc.nativeElement,
        { types: ['geocode'] });

      // When the user selects an address from the dropdown, populate the address fields in the form.
      this.autocomplete.addListener('place_changed', function () {
        let selectedPlace = this.autocomplete.getPlace();
        if (selectedPlace) {
          this.mapParam.center.lat = selectedPlace.geometry.location.lat();
          this.mapParam.center.lng = selectedPlace.geometry.location.lng();
          this.cs.setItem(config.storageKey.mapCenterLat, String(this.mapParam.center.lat));
          this.cs.setItem(config.storageKey.mapCenterLng, String(this.mapParam.center.lng));
        }
        //google.maps.event.trigger(map, "resize");
        this.mapParam.zoom = 18;
        this.cs.setItem(config.storageKey.mapZoom, "18");
        this.map.triggerResize(true);
        //this.updateMarker();
      }.bind({ "map": this.theMap, "mapParam": this.mapParam, "autocomplete": this.autocomplete, "cs": this.cs }));
    })
  }

  getMarkerUrl(protocol, host, port, url) {
    let res: string = "";
    res = protocol + "://" + host;
    if (port)
      res = res + ":" + port;
    if (url)
      res = res + "/" + url

    return res
  }

  clickedMarker(label: string, index: number) {
    //this.router.navigate(["/property/" + this.markers.list[index].list_no]) //window.location.href = 'http://concordiaboston.com';
    window.location.assign(config.url.base+"/property/?pid=" + this.markers.list[index].list_no);
  }

  mapClicked($event: MouseEvent) {
    if (this.iw_opened != -1) {
      if (this.iwArray[this.iw_opened].isOpen) this.iwArray[this.iw_opened].close();
      this.iw_opened = -1;
    }
  }

  hoverMarker(label, i) {
    this.iwArray = this.iw.toArray();
    if (i != this.iw_opened) {
      if (this.iw_opened > -1 && this.iwArray[this.iw_opened])
        this.iwArray[this.iw_opened].close();
    }
    this.iwArray[i].open();
    this.iw_opened = i;
  }

  mouseOutMarker(i, type) {
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */this.searchLoc.nativeElement,
      { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = this.autocomplete.getPlace();
  }

  parseStr(str,theType){

    let res={"pre":"","num":-1,"post":""}
    //find the number
    let tmpNum = str.match(/\d+/g);
    if(tmpNum){
      res.num=tmpNum.map(Number)[0];

      var tmp1 = str.split(tmpNum[0]);
      //find the 2 non-empty character right before the number
      let preStr = tmp1[0].trim();
      let postStr = tmp1[1].trim();
      if(preStr){
        let preCh = preStr.charAt(preStr.length-1);
        if(preCh==">"||preCh=="<"){
          res.pre=preCh
        }else if(preCh=="="){
          res.pre=preCh;
          //check to see if there is > or < before that
          if(preStr.length>1){
            let tmp2=preStr.substr(0,preStr.length-2).trim();
            if(tmp2){
              let tmp3 = tmp2.charAt(tmp2.length-1);
              if(tmp3==">"||tmp3=="<")
                res.pre=tmp3+res.pre
            }
          }
        }
      }else if(postStr){
        //find the 1 non-empty character right after the number
        let postCh = postStr.charAt(0);
        if(postCh=="+"||postCh=="-")
          res.post=postCh
      }
    }
    if(theType == 'price' && res.num>-1){
        res.num = this.parseUnit(str,res.num);
    }
    return res;
  }
  buildJson(obj){
    let res={};
    if(obj && obj.num>-1){
      switch(obj.pre){
        case ">": res={$gt:obj.num};break;
        case ">=": res={$gte:obj.num};break;
        case "=":res={$eq:obj.num};break;
        case "<":res={$lt:obj.num};break;
        case "<=":res={$lte:obj.num};break;
        default :
          if(obj.post){
            switch(obj.post){
              case "+":res={$gte:obj.num};break;
              case "-":res={$lte:obj.num};break;
            }
          }else{
            res={$gte:obj.num} // use $lte instead of $te as by default the descriptions are for Number & beyond
          }
      }
    }
    return res
  }
  parseBedInput(str){

    //check if it's empty or not
    if(!(str && str.trim())) return {};

    return this.buildJson(this.parseStr(str,''));
  }
  parseBathInput(str){
    return this.parseBedInput(str)
  }
  parseUnit(str,theNum){
    if(!str) return theNum;

    if(str.includes("K"))
      return theNum*1000;
    else if(str.includes("M"))
      return theNum*1000000;
    else if(str.includes("万"))
      return theNum *10000;
  }

  parseRange(str,separator){
    let res={};
    let preNum=null;
    let postNum=null;

    //split the number
    let tmp1 = str.split(separator);

    //get both number
    if(tmp1[0] && tmp1[0].trim()){
      let tmp2 = tmp1[0].trim().match(/\d+/g);
      if(tmp2){
        let tmp3=tmp2.map(Number);
        preNum = tmp3[tmp3.length-1];
        preNum = this.parseUnit(tmp1[0],preNum);
      }
    }
    if(tmp1[1] && tmp1[1].trim()){
      let tmp2 = tmp1[1].trim().match(/\d+/g);
      if(tmp2){
        let tmp3=tmp2.map(Number);
        postNum = tmp3[0];
        postNum = this.parseUnit(tmp1[1],postNum)
      }
    }

    //build the json
    if(preNum && postNum) {
      if(preNum<=postNum)
        res = {$gte:preNum,$lte:postNum};
      else
        res = {$gte:postNum,$lte:preNum};
    }else if(preNum && !postNum){
      res = {$gte:preNum}
    }else if(!preNum && postNum){
      res = {$lte:postNum}
    }

    return res;
  }
  parsePriceInput(str){
    let res={};
    //empty or not?
    if(!(str && str.trim())) return res;

    let tmp =str.trim();

    if(tmp.includes("-")){
      res = this.parseRange(tmp,"-");
    }else if(tmp.includes("~")){
      res = this.parseRange(tmp,"~");
    }else{
      res= this.buildJson(this.parseStr(tmp,'price'));
    }

    return res;
  }
  //when searchInput is changed
  updateSearchInput(inputType){
    switch(inputType){
      case 'bed':
        this.srcObj["no_bedrooms"] = this.parseBedInput(this.search.bedroomInput);
        break;
      case 'bath':
        this.srcObj["baths"] = this.parseBathInput(this.search.bathInput);
        break;
      case 'price':
        this.srcObj["list_price"] = this.parsePriceInput(this.search.priceInput);
        break;
    }
    this.updateMarker()
  }
  //when select is changed
  updateSelect(inputType){
    switch(inputType){
      case 'bed':
        this.search.bedroomInput = this.searchOption.no_bedrooms[this.search.no_bedrooms].desc[this.cs.lan];
        if (this.search.no_bedrooms != "0")
          this.srcObj["no_bedrooms"] = this.searchOption.no_bedrooms[this.search.no_bedrooms].val;
        break;
      case 'bath':
        this.search.bathInput = this.searchOption.baths[this.search.baths].desc[this.cs.lan];
        if (this.search.baths != "0")
          this.srcObj["baths"] = this.searchOption.baths[this.search.baths].val;
          break;
      case 'price':
        this.search.priceInput = this.searchOption.list_price[this.search.list_price].desc[this.cs.lan];
        if (this.search.list_price != "0")
          this.srcObj["list_price"] = this.searchOption.list_price[this.search.list_price].val;
          break;
    }

    this.updateMarker();
  }
  //update marker once user finish the action with map
  updateMarker() {
    this.exceedFlag.maxCount = false;

    //update the current map center and the zoom level
    let nlat = (parseFloat(this.boundary.ne.lat) + parseFloat(this.boundary.sw.lat)) / 2;
    let nlng = (parseFloat(this.boundary.ne.lng) + parseFloat(this.boundary.sw.lng)) / 2;
    this.cs.setItem(config.storageKey.mapCenterLat, String(nlat));
    this.cs.setItem(config.storageKey.mapCenterLng, String(nlng));
    this.nzoom = this.theMap.zoom;
    this.theMap.panControl=false;
    if (this.nzoom && this.nzoom != 0)
      this.cs.setItem(config.storageKey.mapZoom, String(this.nzoom));

    //udpate search criteria
    if (this.search.prop_type)
      this.srcObj["prop_type"] = this.search.prop_type;
    if (this.search.location)
      this.srcObj["location"] = this.search.location;

    //get new list of markers by web service
    this.http.post(this.markerUrl, { search: this.srcObj, boundary: this.boundary }, { headers: new HttpHeaders().set('charset', 'UTF-8') }).subscribe(function(data) {
      if (data) {
        let rKey = config.res.key;
        if (data[rKey.code] == "success") {
          let markersNew = [];
          if (data[rKey.properties] instanceof Array) {
            let pt = data[rKey.properties];
            /*
            for (let i = 0; i < pt.length; i++) {
              var idesc = "";
              if (pt[i].no_bedrooms) idesc = pt[i].no_bedrooms + " bed, ";
              if (pt[i].no_full_baths) idesc = idesc + pt[i].no_full_baths + " full bath, ";
              if (pt[i].no_half_baths) idesc = idesc + pt[i].no_half_baths + " half bath, ";
              if (pt[i].list_price) idesc = idesc + "$" + this.numberWithCommas(pt[i].list_price);

              var nm = {
                lat: pt[i].lat,
                lng: pt[i].lng,
                label: '1',
                draggable: false,
                list_no: pt[i].list_no,
                desc: idesc
              }
              markersNew.push(nm);
            }
            */
           this.updateMarkerArray(pt,this.markers.list);
          }
          //this.markers.list = markersNew;
        } else if (data[rKey.code] == "exceedMaxCount") { //show alarm

          this.exceedFlag.maxCount = true;
          //$('#myModal').modal('show');
          //window.alert(this.trans.exceedMaxCountAlert[this.cs.lan]);
        } else {

        }
      }
    }.bind({numberWithCommas:this.numberWithCommas,markers:this.markers,exceedFlag:this.exceedFlag,updateMarkerArray:this.updateMarkerArray,getListNofromArray:this.getListNofromArray,addTheElement:this.addTheElement}))
  }

  getListNofromArray(oa,a,mrmv){
    for(let i=0;i<oa.length;i++){
      if(oa[i] && oa[i]["list_no"]){
          a.push(oa[i].list_no);
      }else{
        mrmv.push(i)
      }
    }
  }
  addTheElement(dot,mRmv,mIdx,markers){
    var idesc = "";
    if (dot.no_bedrooms) idesc = dot.no_bedrooms + " bed, ";
    if (dot.no_full_baths) idesc = idesc + dot.no_full_baths + " full bath, ";
    if (dot.no_half_baths) idesc = idesc + dot.no_half_baths + " half bath, ";
    if (dot.list_price) idesc = idesc + "$" + this.numberWithCommas(dot.list_price);

    var nm = {
      lat: dot.lat,
      lng: dot.lng,
      label: '1',
      draggable: false,
      list_no: dot.list_no,
      desc: idesc
    }

    if(mIdx<mRmv.length){
      markers[mRmv[mIdx]]=nm
    }else{
      markers.push(nm)
    }

    return mIdx+1;
  }
  updateMarkerArray(pt,markers){
    /** loop markers to see
     *  - which marker is not in the list => can be assigned new value or to be removed
     *  - which pt is in the list => skip them
     */
    let mRmv=[];
    let pExist=[];
    let m =[];
    let p =[];

    if(pt && markers){
      //retrieve the list # from both array
      this.getListNofromArray(markers,m,mRmv);
      this.getListNofromArray(pt,p,null);

      //loop m
      for(let i=0;i<m.length;i++){
        let idx=p.indexOf(m[i]);
        if(idx==-1){
          mRmv.push(i);
        }else{
          pExist.push(idx)
        }
      }

      //assign value
      let mIdx=0;
      for(let j=0;j<p.length;j++){
        if(!(pExist && pExist.includes(j))){
          mIdx=this.addTheElement(pt[j],mRmv,mIdx,markers);
        }
      }

      //clean markers if mIdx not reached the last element of mRmv
      for(let k=mIdx;k<mRmv.length;k++){
        markers[mRmv[k]]={}
      }
    }

    //loop pt to see which

  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  boundsChange(event) {
    this.boundary.ne.lat = event.getNorthEast().lat();
    this.boundary.ne.lng = event.getNorthEast().lng();
    this.boundary.sw.lat = event.getSouthWest().lat();
    this.boundary.sw.lng = event.getSouthWest().lng();
  }
  //zoomChange(event){    this.nzoom = event;  }
  /*
  markers: marker[] = [
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
  */
  getBedrooms() {
    if (this.search.no_bedrooms) {
      var ops = config.gmap.searchOption.no_bedrooms;
      for (var i = 0; i < ops.length; i++) {
        if (ops[i].key == this.search.no_bedrooms) return ops[i].desc
      }
    }
    return ''
  }

  getBath() {
    if (this.search.baths) {
      var ops = config.gmap.searchOption.baths;
      for (var i = 0; i < ops.length; i++) {
        if (ops[i].key == this.search.baths) return ops[i].desc
      }
    }
    return ''
  }

  getPrice() {
    if (this.search.list_price) {
      var ops = config.gmap.searchOption.list_price;
      for (var i = 0; i < ops.length; i++) {
        if (ops[i].key == this.search.list_price) return ops[i].desc
      }
    }
    return ''
  }

  getPropType() {
    if (this.search.prop_type) {
      var ops = config.gmap.searchOption.prop_type;
      for (var i = 0; i < ops.length; i++) {
        if (ops[i].key == this.search.prop_type) return ops[i].desc
      }
    }
    return ''
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  list_no: string;
  desc: string;
}
