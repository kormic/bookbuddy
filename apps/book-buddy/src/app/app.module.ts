import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { UiModule } from '@book-buddy/ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundModule } from '@book-buddy/features';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, UiModule, NotFoundModule],
  bootstrap: [AppComponent],
  providers: [
    {
        provide: 'apiUrl', useValue: environment.API_URL
    }
]
})
export class AppModule {}
