export class Register {
    public constructor(init?: Partial<Register>) {
        Object.assign(this, init);
    }
    cin: string;
    nom: string;
    prenom : string;
    role : string;
    telephone : string;
    addresse : string;
    email : string;
    statut : string = "pending";
}
