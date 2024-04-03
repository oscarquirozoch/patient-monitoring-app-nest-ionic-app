import { UserCreatorModel } from "./user-creator.model";

export class UpdateSpecialityModel {
    public id: string;
    public code: string;
    public name: string;
    public description: string;
    public status: boolean;
    public user_creator: UserCreatorModel;

    constructor() {
        this.id = '';
        this.code = '';
        this.name = '';
        this.description = '';
        this.status = true;
        this.user_creator = new UserCreatorModel();
    }
}