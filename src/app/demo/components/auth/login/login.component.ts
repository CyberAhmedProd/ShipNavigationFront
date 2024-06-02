import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Login } from 'src/app/demo/model/SignInOut/login';
import { LoginService } from 'src/app/demo/service/login/login.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit{

    // valCheck: string[] = ['remember'];
    // password!: string;
    loading = [false, false, false, false];
    loginForm = this.formBuilder.group({
        cin: ['', Validators.required],
        password: ['',Validators.required],
      });

    constructor(public layoutService: LayoutService,private formBuilder: FormBuilder,private messageservice: MessageService,
        private router: Router , private loginService:LoginService)
    {

    }
    ngOnInit(): void {

    }

    private goToHome()
    {
        this.router.navigate(['/']);
    }
    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    async onSubmit() {

        this.loginService.ExecuteLogin(new Login(this.loginForm.value)).subscribe(async (res:any) => {
            if(res.success)
            {
                localStorage.setItem("token",res.data);

                (async () => {
                    this.showSuccessViaToast(res.message);
                    await this.delay(1000);
                    this.router.navigate(["/"]);
                })();

            }
            else
            {
                this.showErrorViaToast(res.message);
                console.error("erreur de connection")

            }

        })
        console.warn(this.loginForm.value);
    }

    private showErrorViaToast(detail : any) {
        this.messageservice.add({ key: 'tst', severity: 'error', summary: 'Erreur', detail: detail });
    }

    private showSuccessViaToast(detail : any) {
        this.messageservice.add({ key: 'tst', severity: 'success', summary: 'Succés', detail: detail });
    }
}
