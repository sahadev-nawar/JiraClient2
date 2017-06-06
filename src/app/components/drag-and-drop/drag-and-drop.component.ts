import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {
  private fileList : any = [];
  constructor() { }

  ngOnInit() {
  }
  onFilesChange(fileList: FileList) {
    this.fileList = fileList;
  }
}
