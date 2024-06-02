import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Login } from 'src/app/demo/model/SignInOut/login';
import { Register } from 'src/app/demo/model/SignInOut/register';
import { CountryService } from 'src/app/demo/service/country.service';
import { LoginService } from 'src/app/demo/service/login/login.service';
import { RegisterService } from 'src/app/demo/service/register/register.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

    `],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit{

    // valCheck: string[] = ['remember'];
    // password!: string;
    loading = [false, false, false, false];
    loginForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        telephone: ['', Validators.required],
        addresse : ['', Validators.required],
        cin: ['', Validators.required],
        role : ['', Validators.required],
        password: ['',Validators.required],
        email : ['', Validators.required],
        nationalite : ['', Validators.required],
        dateNaissance : ['', Validators.required],
      });
      selectedState: any = null;

    states: any[] = [
        {name: 'Arizona', code: 'Arizona'},
        {name: 'California', value: 'California'},
        {name: 'Florida', code: 'Florida'},
        {name: 'Ohio', code: 'Ohio'},
        {name: 'Washington', code: 'Washington'}
    ];

    dropdownItems = [
        { name: 'Adminstrateur', code: 'admin' },
        { name: 'Opérateur', code: 'operate' },
        { name: 'Utilisateur', code: 'uilisateur' }
    ];


    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

    constructor(public layoutService: LayoutService,private formBuilder: FormBuilder,private messageservice: MessageService,
        private router: Router , private registerService:RegisterService,private countryService: CountryService)
    {

    }


    private goToHome()
    {
        this.router.navigate(['/']);
    }
    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }


    private showErrorViaToast(detail : any) {
        this.messageservice.add({ key: 'tst', severity: 'error', summary: 'Erreur', detail: detail });
    }

    private showSuccessViaToast(detail : any) {
        this.messageservice.add({ key: 'tst', severity: 'success', summary: 'Succés', detail: detail });
    }


    load(index: number) {
        this.loading[index] = true;
        this.registerService.ExecuteRegister(new Register(this.loginForm.value)).subscribe(async (res:any) => {
            if(res.success)
            {
                (async () => {
                    this.showSuccessViaToast(res.message);
                    await this.delay(1000);
                })();
            }
            else
            {
                this.showErrorViaToast(res.message);
                console.error("erreur de connection")

            }

        })
        setTimeout(() => this.loading[index] = false, 1000);
        console.log(this.loginForm.value)
    }

    ngOnInit() {

    }


}
