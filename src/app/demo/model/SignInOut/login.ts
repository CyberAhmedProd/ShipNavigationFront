export class Login {
    public constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }
    cin: string;
    password: string;
}
