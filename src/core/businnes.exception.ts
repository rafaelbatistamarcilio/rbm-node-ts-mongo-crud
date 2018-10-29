
export class BusinessException {
    public message: string;
    public error: any;

    constructor(message: string, error?: any) {
        this.message = message;
        this.error = error;
    }

}