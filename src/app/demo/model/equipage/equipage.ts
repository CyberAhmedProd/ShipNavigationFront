export class Equipage {
    public constructor(init?: Partial<Equipage>) {
        Object.assign(this, init);
    }
    id: number;
    nom: string;
    prenom: string;
    cin : string ;
    passport : string;
    poste : string;
    nationalite : string;
    status : string;
    idBateau : number;
}
