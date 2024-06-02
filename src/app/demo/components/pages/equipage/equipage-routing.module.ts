import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EquipageComponent } from './equipage.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EquipageComponent }
	])],
	exports: [RouterModule]
})
export class EquipageRoutingModule { }
