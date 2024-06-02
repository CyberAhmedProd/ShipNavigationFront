import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { AvisApareillage } from 'src/app/demo/model/avisApareillage/avis-apareillage';
import { Bateau } from 'src/app/demo/model/bateau/bateau';
import { AvisApareillageService } from 'src/app/demo/service/avisApareillage/avis-apareillage.service';
import { BateauService } from 'src/app/demo/service/bateau/bateau.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { EquipageService } from 'src/app/demo/service/equipage/equipage.service';
import { LoginService } from 'src/app/demo/service/login/login.service';
import { ProductService } from 'src/app/demo/service/product.service';
interface expandedRows {
    [key: string]: boolean;
}
@Component({
  selector: 'app-avis-apareillage',
  templateUrl: './avis-apareillage.component.html',
  styleUrl: './avis-apareillage.component.scss',
  providers : [ MessageService]
})
export class AvisApareillageComponent implements OnInit {

    avisDialog: boolean = false;
    deleteAvisDialog : boolean = false;
    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    bateaux: any[];

    selectedBateaux: any;

    statuses: any[] = [];
    submitted  =  false;

    listAvis: AvisApareillage[] = [];

    avisApareillage : AvisApareillage

    stateOptions: any[] = [{label: 'valide', value: 'valide'}, {label: 'attente', value: 'attente'}];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private loginService : LoginService,private customerService: CustomerService, private avisService: AvisApareillageService,private bateauService : BateauService,private equipageService : EquipageService,private messageService: MessageService) { }

    ngOnInit() {
        const idProp = Number(this.loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Id)
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
           });

            this.avisService.ExecuteGetAllAvis().subscribe(data =>
            {
                this.listAvis = data.data.filter(x => x.idProprietaire == idProp);
            });
            this.bateauService.ExecuteGetAllBateau().subscribe(data => {
            this.bateaux = data.data
            this.bateaux = this.bateaux.filter(x => x.idProprietaire == idProp)
        }
          );


        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    openNew() {
        this.avisApareillage = new AvisApareillage();
        this.submitted = false;
        this.avisDialog = true;
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    deleteAvis(avis: AvisApareillage) {
        this.deleteAvisDialog = true;
        this.avisApareillage = { ...avis };
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }
    saveAvis() {
        this.submitted = true;
        this.avisApareillage.idBateau = this.selectedBateaux.id;
        this.avisService.ExecuteInsertAvis(this.avisApareillage).subscribe(data => {
            console.log(data.data);
            let dataAvis : AvisApareillage = data.data
            this.equipageService.ExecuteGetAllEquipageByIdBateau(dataAvis.idBateau).subscribe(data => {
                dataAvis.equipages = data.data
                dataAvis.etat = "attente";
                this.listAvis.push(dataAvis)
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Avis ajouté avec succés', life: 3000 });
            })

        })

        this.avisDialog = false;
    }
    confirmDelete()
    {
        this.avisService.ExecuteDeleteAvis(this.avisApareillage.id).subscribe(data =>{
            this.deleteAvisDialog = false;
            this.listAvis = this.listAvis.filter(x => x.id != this.avisApareillage.id)
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Avis Supprimé avvec succés', life: 3000 });
        })
    }
    expandAll() {
        if (!this.isExpanded) {
            this.listAvis.forEach(avis => avis && avis.equipages ? this.expandedRows[avis.idBateau] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
