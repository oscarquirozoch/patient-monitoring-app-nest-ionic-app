export class UpdateManagementTypeModel {
    public id: string;
    public name: string;
    public description: string;
    public type: string;
    public status: boolean;

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.type = '';
        this.status = true;
    }
}