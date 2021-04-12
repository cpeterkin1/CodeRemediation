export class userRegister {
    
    private firstname: string;
    private lastname: string;
    private email: string;
    private role: string;
    private password: string;

    constructor(firstname: string, lastname: string, email: string, role: string, password: string){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email
        this.role = role;
        this.password = password;
    }
}