export class FormVal {

     //for form validation
     
  onFormChanged(currentForm,newForm,formElementArray,valMsgArray) {
    if (currentForm === newForm) { return; }
    newForm = currentForm;
    if (newForm) {
      newForm.valueChanges
        .subscribe(data => this.onFormValueChanged(newForm, formElementArray,valMsgArray,data));
    }
  }

  onFormValueChanged(newForm,formElementArray,valMsgArray,data?: any) {
    if (!newForm) { return; }
    const form = newForm.form;
    let si:any;
    let i:number;
    const defSearchLen = formElementArray.length;
    for (i=0;i<defSearchLen;i++) {
      si=formElementArray[i];
      // clear previous error message (if any)
      const field=si.code;
      valMsgArray[i] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        for (const key in control.errors) {
          valMsgArray[i] += this.getValidationErrorMessages(formElementArray,field,key) + ' ';
        }
      }
    }
  }

  getValidationErrorMessages(searchArray,field,key){
    let msg:string='';
    switch(key){
      case 'required':{
        msg=field+" is required.";
        break;
      }
      case 'min':{
        msg=field+" min value is "+this.getSearchFormConstraint(searchArray,field,key)+".";
        break;
      }
      case 'max':{
        msg=field+" max value is "+this.getSearchFormConstraint(searchArray,field,key)+".";
        break;
      }
      case 'minlength':{
        msg=field+" min length is "+this.getSearchFormConstraint(searchArray,field,key)+".";
        break;
      }
      case 'maxlength':{
        msg=field+" max length is "+this.getSearchFormConstraint(searchArray,field,key)+".";
        break;
      }
      case 'pattern':{
        msg=field+" must match pattern: "+this.getSearchFormConstraint(searchArray,field,key)+".";
        break;
      }
    }
    return msg;
  }
  getSearchFormConstraint(searchArray,field,key){
    let si:any;
    let i:number;
    for(i=0;i<searchArray.length;i++){
      si=searchArray[i];
      if(si.code==field){
        return si[key]
      }
    }
  }
}
