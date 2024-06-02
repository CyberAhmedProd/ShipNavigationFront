import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { BateauService } from 'src/app/demo/service/bateau/bateau.service';
import { LoginService } from 'src/app/demo/service/login/login.service';
import { BateauUserData } from 'src/app/demo/model/bateau/bateau-user-data';

@Component({
    templateUrl: './bateau.component.html',
    providers: [MessageService]
})
export class BateauComponent implements OnInit {

    bateauDialog: boolean = false;
    deletebateauDialog: boolean = false;
    listDeletebateauDialog: boolean = false;
    bateaux: BateauUserData[] = [];
    selectedBateau : BateauUserData[] = [];
    bateau : BateauUserData

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService,private bateauService : BateauService,private loginService:LoginService, private messageService: MessageService) {

     }

    ngOnInit() {
        const idProp = Number(this.loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Id)
        this.bateauService.ExecuteGetAllBateauExtraDataUser(idProp).subscribe( res => {
            this.bateaux = res.data
        })
        this.cols = [
            { field: 'nom', header: 'Nom' },
            { field: 'matricule', header: 'Matricule' },
            { field: 'nationalite', header: 'Nationalite' },
            { field: 'specialite', header: 'Specialite' },
            { field: 'portDetache', header: 'PortDetache' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.bateau = new BateauUserData();
        this.submitted = false;
        this.bateauDialog = true;
    }

    deleteSelectedBateau() {
        this.listDeletebateauDialog = true;
    }

    editBateau(bateau: BateauUserData) {
        this.bateau = { ...bateau };
        this.bateauDialog = true;
    }

    deleteBateau(bateau: BateauUserData) {
        this.deletebateauDialog = true;
        this.bateau = { ...bateau };
    }

    confirmDeleteSelected() {
        let concatId = ""
        this.selectedBateau.forEach(element =>{
            concatId += (element.id + ",")
        })
        if(concatId.length > 0)
            concatId = concatId.slice(0,-1);

        this.bateauService.ExecuteDeleteBateauByConcatId(concatId).subscribe(res =>{
            this.listDeletebateauDialog = false;
            this.bateaux = this.bateaux.filter(val => !concatId.split(",").includes(val.id.toString()));
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            this.selectedBateau = [];
        });

    }

    confirmDelete() {
        this.bateauService.ExecuteDeleteBateau(this.bateau.id).subscribe(res =>{
            this.deletebateauDialog = false;
            this.bateaux = this.bateaux.filter(val => val.id !== this.bateau.id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
            this.bateau = null;
        })
    }

    hideDialog() {
        this.bateauDialog = false;
        this.submitted = false;
    }
    private refreshTable()
    {
        this.bateaux = [...this.bateaux];
        this.bateauDialog = false;
        this.bateau = null;
    }

    saveBateau() {
        this.submitted = true;

        if (this.bateau.id) {
            this.bateauService.ExecuteUpdateBateau(this.bateau).subscribe(res =>{
                let index = this.bateaux.findIndex(x => x.id == this.bateau.id)
                this.bateaux[index] = this.bateau;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                this.refreshTable()
            });

        } else {
            this.bateau.idProprietaire = Number(this.loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Id)
            this.bateauService.ExecuteInsertBateau(this.bateau).subscribe(res =>{

                this.bateaux.push(res.data);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: res.message, life: 3000 });
                this.refreshTable()

            })
        }
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
