import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvisApareillageComponent } from './avis-apareillage.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AvisApareillageComponent }
	])],
	exports: [RouterModule]
})
export class AvisApareillageRoutingModule { }
