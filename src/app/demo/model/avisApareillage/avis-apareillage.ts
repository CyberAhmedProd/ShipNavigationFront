import { Equipage } from "../equipage/equipage";

export class AvisApareillage {
    public constructor(init?: Partial<AvisApareillage>) {
        Object.assign(this, init);
    }
    id: number;
    matriculeBateau: string;
    nationaliteBateau : string;
    code : string;
    destination : string;
    dateEntree  : string;
    dateSortie   : number;
    idBateau : number;
    etat : string;
    idProprietaire : number;
    equipages : Equipage[]
}
