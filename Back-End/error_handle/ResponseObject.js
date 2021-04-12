class ResponseObject{
    
    constructor(httpCode, type, body){
        this.httpCode = httpCode;
        this.type = type
        this.body = body;
    }

    returnJSON(){
        return{
            HTTPCode: this.httpCode,
            Body: this.body
        }
    }

}

export default ResponseObject;