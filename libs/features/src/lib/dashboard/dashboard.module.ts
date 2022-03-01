import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '@book-buddy/ui';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, UiModule, DashboardRoutingModule],
})
export class DashboardModule {}
