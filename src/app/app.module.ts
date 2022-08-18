import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmExampleComponent } from './agm-example/agm-example.component';

@NgModule({
  declarations: [
    AppComponent,
    AgmExampleComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAtir-aHClvceOXagz-gdSTlFzwgtUomrY',
      libraries: ['places', 'drawing', 'geometry']
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
