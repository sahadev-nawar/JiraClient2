import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UploadCSVService } from '../../services/upload-csv.service';
import { ResponseJira } from '../../object/response-jira';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-csvto-json',
  templateUrl: './csvto-json.component.html',
  styleUrls: ['./csvto-json.component.css'],
  providers: [UploadCSVService]
})
export class CSVToJsonComponent implements OnInit {
  closeResult: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  test: ResponseJira[];

  constructor(private modalService: NgbModal, private uploadCSVService: UploadCSVService) { }
  ngOnInit() {
  }
  addFile(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.uploadCSVService.upload(fileToUpload)
        .subscribe( data => {
                     this.test = data;
                    //console.log('this is coming JSON' + JSON.stringify(this.test));
                    //console.log(localStorage.getItem('r_Jira'));
                    localStorage.setItem('r_Jira', JSON.stringify(this.test));
        });
    }
  }
  getConvertedCSVInJson(): ResponseJira[] {
    return this.test;
  }
}
