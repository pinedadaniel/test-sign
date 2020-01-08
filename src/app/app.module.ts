import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ImageUploadServiceService } from './service/image-upload-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SignaturePadModule 
  ],
  providers: [
    ImageUploadServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
