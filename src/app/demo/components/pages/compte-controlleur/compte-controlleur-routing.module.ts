import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompteControlleurComponent } from './compte-controlleur.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CompteControlleurComponent }
	])],
	exports: [RouterModule]
})
export class CompteControlleurRoutingModule { }
