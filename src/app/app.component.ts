import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { FileDetector } from 'selenium-webdriver/remote';
import { FileDto } from './Dto/file-dto';
import { ImageUploadServiceService } from './service/image-upload-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signature';
  file:File;
  fileDto:FileDto=new FileDto()
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
 
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'canvasBorder':80
  };
  private cx: CanvasRenderingContext2D;
  constructor(
    private imageUploadService:ImageUploadServiceService
  ) {
    // no-op
  }
 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth',0); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  getImage(){
    console.log(this.signaturePad.toDataURL());
    this.fileDto.url=this.signaturePad.toDataURL()
    this.imageUploadService.uploadImage(this.fileDto).subscribe(
      (result)=>{
          if(result){
            console.log("true")
          }
      })
    
  }

  clear(){
    this.signaturePad.clear()
  }
}
