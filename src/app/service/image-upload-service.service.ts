import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { FileDto } from '../Dto/file-dto';
import { Observable } from 'rxjs';

const URLS="http://localhost:8080/file/save"
@Injectable()
export class ImageUploadServiceService {

  constructor(private http:HttpClient) { }

  uploadImage(filedto:FileDto):Observable<boolean>{
    return this.http.post<boolean>(URLS,filedto);
  }
}
