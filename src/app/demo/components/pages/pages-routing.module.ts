import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'bateau', loadChildren: () => import('./bateau/bateau.module').then(m => m.BateauModule) },
        { path: 'equipage', loadChildren: () => import('./equipage/equipage.module').then(m => m.EquipageModule) },
        { path: 'avis', loadChildren: () => import('./avisApareillage/avis-apareillage/avis-apareillage.module').then(m => m.AvisApareillageModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'compte-controlleur', loadChildren: () => import('./compte-controlleur/compte-controlleur.module').then(m => m.CompteControlleurModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
