export class ManagementType {
    public id: string;
    public code: string;
    public name: string;
    public description: string;
    public data: string;
    public type: string;
    public status: boolean;

    constructor() {
        this.id= '';
        this.code= '';
        this.name= '';
        this.description= '';
        this.data= '';
        this.type= '';
        this.status= true;
    }
}