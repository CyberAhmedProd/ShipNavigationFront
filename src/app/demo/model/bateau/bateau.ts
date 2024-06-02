export class Bateau {
    public constructor(init?: Partial<Bateau>) {
        Object.assign(this, init);
    }
    id: number;
    nom: string;
    matricule : string;
    nationalite : string;
    specialite : string;
    portDetache : string;
    longueur : number;
    tirantEau : number;
    tonnage : number;
    moteur : string;
    puissance : number;
    couleur : string;
    etat : string ;
    idProprietaire : number;

}
