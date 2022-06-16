export class ShowView {
  view:any;
  constructor(view){
      this.view=view
  }
  //update show flag
  show(viewName){
      if(viewName){
      let si:any;
      for(si in this.view){
        this.view[si]=false
      }
      this.view[viewName]=true
    }
  }
}
