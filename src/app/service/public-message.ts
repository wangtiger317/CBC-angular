export class PublicMessage {
    msg:any={type:"",msg:""}; // message to be shown, such as notification
    update(type,msg){
        this.msg={type:type,msg:msg};
    }
    clean(){
        this.msg={type:null,msg:null}
    }
}
