import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BateauComponent } from './bateau.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BateauComponent }
	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
