export class DateHelper {
    static formatDate(value: string, separator: string = '-'): string {

        let initialDate = new Date(value);

        let year = initialDate.getFullYear().toString();
        let month = (initialDate.getMonth() + 1).toString();
        let date = initialDate.getDate().toString();

        if (parseInt(month) < 10) {
            month = '0' + month;
        }

        return date + separator + month + separator + year;
    }
}
