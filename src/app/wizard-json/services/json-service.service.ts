import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { Invoice } from 'src/app/types/Invoce';

@Injectable({
  providedIn: 'root',
})
export class JsonServiceService {
  info: any = {};
  loading = false;
  fileUrl: any;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.getJSON().subscribe((data) => {
      console.log(data);
    });
    this.getEmptyJSON().subscribe((data) => {
      console.log(data);
    });
    this.getLists().subscribe((data) => {
      console.log(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('../../../assets/ejemplo.json');
  }

  public getEmptyJSON(): Observable<any> {
    return this.http.get('../../../assets/emptyJson.json');
  }

  public getLists(): Observable<any> {
    return this.http.get('../../../assets/listaSelect.json');
  }

  public saveJSON(
  ) {
    console.log('Se descargo el JSON');
  }
}
