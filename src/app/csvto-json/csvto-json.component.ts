import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UploadCSVService } from '../services/upload-csv.service';
import { ResponseJira } from '../object/response-jira';

@Component({
  selector: 'app-csvto-json',
  templateUrl: './csvto-json.component.html',
  styleUrls: ['./csvto-json.component.css'],
  providers:[UploadCSVService]
})
export class CSVToJsonComponent implements OnInit {
  closeResult: string;
  @ViewChild('fileInput') fileInput;
  test: ResponseJira[];
  constructor(private modalService: NgbModal, private uploadCSVService: UploadCSVService) { }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
  }
  addFile(): void {
    console.log('inside uplad method');
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        this.uploadCSVService.upload(fileToUpload)
        .subscribe( data => {
                     this.test = data;
                    console.log(JSON.stringify(this.test));
        });
    }
  }
}