export class CreateSpecialityModel {
    public code: string;
    public name: string;
    public description: string;
    public user_creator: string;

    constructor() {
        this.code = '';
        this.name = '';
        this.description = '';
        this.user_creator = '';
    }

    reset() {
        this.code = '';
        this.name = '';
        this.description = '';
        this.user_creator = '';
    }
}