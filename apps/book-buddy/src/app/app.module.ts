import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UiModule } from '@book-buddy/ui';
import { NgxsModule } from '@ngxs/store';
import { NotFoundModule } from '@book-buddy/features';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxsModule.forRoot([], { developmentMode: isDevMode() }), BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, UiModule, NotFoundModule],
  bootstrap: [AppComponent],
  providers: [
    {
        provide: 'apiUrl', useValue: environment.API_URL
    }
]
})
export class AppModule {}
