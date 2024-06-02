import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LoginService } from 'src/app/demo/service/login/login.service';
import { Equipage } from 'src/app/demo/model/equipage/equipage';
import { EquipageService } from 'src/app/demo/service/equipage/equipage.service';
import { BateauService } from 'src/app/demo/service/bateau/bateau.service';
import { EquipageBateau } from 'src/app/demo/model/equipage/equipage-bateau';
import { Bateau } from 'src/app/demo/model/bateau/bateau';

@Component({
    templateUrl: './equipage.component.html',
    providers: [MessageService]
})
export class EquipageComponent implements OnInit {

    equipageDialog: boolean = false;
    deleteEquipageDialog: boolean = false;
    listDeleteEquipageDialog: boolean = false;
    equipages: EquipageBateau[] = [];
    selectedEquipage : EquipageBateau[] = [];
    equipage : EquipageBateau
    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    postes : any[] = [];

    bateaux : any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private equipageService : EquipageService,private loginService:LoginService,
        private bateauService : BateauService ,private messageService: MessageService) { }

    ngOnInit() {
        const idProp = Number(this.loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Id)
        this.equipageService.ExecuteGetAllBateauIdProprietaire(idProp).subscribe( res => {
            this.equipages = res.data
        })
        this.cols = [
            { field: 'nom', header: 'Nom' },
            { field: 'prenom', header: 'Prenom' },
            { field: 'cin', header: 'Cin' },
            { field: 'passport', header: 'Passport' },
            { field: 'poste', header: 'Poste' }
        ];

        this.statuses = [
            { label: 'à bort', value: 'In' },
            { label: 'non', value: 'Out' }
        ];
        this.postes = [
            { label: 'Conducteur', value: 'Conducteur' },
            { label: 'Passager', value: 'Passager' }
        ];
        this.bateauService.ExecuteGetAllBateau().subscribe( res =>{
            this.bateaux = res.data;
            this.bateaux = this.bateaux.filter(x => x.idProprietaire == idProp)
        })
    }

    openNew() {
        this.equipage = new EquipageBateau();
        this.submitted = false;
        this.equipageDialog = true;
    }

    deleteSelectedEquipage() {
        this.listDeleteEquipageDialog = true;
    }

    editEquipage(equipage: EquipageBateau) {
        this.equipage = { ...equipage };
        this.equipageDialog = true;
    }

    deleteEquipage(equipage: EquipageBateau) {
        this.deleteEquipageDialog = true;
        this.equipage = { ...equipage };
    }

    confirmDeleteSelected() {
        let concatId = ""
        this.selectedEquipage.forEach(element =>{
            concatId += (element.id + ",")
        })
        if(concatId.length > 0)
            concatId = concatId.slice(0,-1);

        this.equipageService.ExecuteDeleteEquipageByConcatId(concatId).subscribe(res =>{
            this.listDeleteEquipageDialog = false;
            this.equipages = this.equipages.filter(val => !concatId.split(",").includes(val.id.toString()));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
            this.selectedEquipage = [];
        });
    }
    mapValueBateau(idBateau)
    {
        return this.bateaux.find( x => x.id == idBateau).nom
    }
    confirmDelete() {
        this.equipageService.ExecuteDeleteEquipage(this.equipage.id).subscribe(res =>{
            this.deleteEquipageDialog = false;
            this.equipages = this.equipages.filter(val => val.id !== this.equipage.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
            this.equipage = null;
        })
    }

    hideDialog() {
        this.equipageDialog = false;
        this.submitted = false;
    }
    private refreshTable()
    {
        this.equipages = [...this.equipages];
        this.equipageDialog = false;
        this.equipage = null;
    }

    saveEquipage() {
        this.submitted = true;

        if (this.equipage.id) {
            this.equipageService.ExecuteUpdateEquipage(this.equipage).subscribe(res =>{
                let index = this.equipages.findIndex(x => x.id == this.equipage.id)
                this.equipages[index] = this.equipage;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                this.refreshTable()
            });

        } else {

            this.equipageService.ExecuteInsertEquipage(this.equipage).subscribe(res =>{

                this.equipages.push(res.data);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                this.refreshTable()

            })
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
