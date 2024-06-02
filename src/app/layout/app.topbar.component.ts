import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { LoginService } from '../demo/service/login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    nom : any
    prenom : any
    constructor(public layoutService: LayoutService,private loginService : LoginService,private router : Router) {
        this.nom = loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Nom
        this.prenom = loginService.getDecodedAccessToken(localStorage.getItem("jwt_token")).Prenom
    }
    logout()
    {
        this.loginService.logout().then(() => {
            this.router.navigate(["/auth/login"])
        })
    }
}
