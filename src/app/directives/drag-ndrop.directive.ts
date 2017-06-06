import { Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appDragNDrop]'
})
export class DragNDropDirective {
  @Output() private filesChangeEmiter: EventEmitter<FileList> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
        this.filesChangeEmiter.emit(files);
    }
    console.log('file is empty' + JSON.stringify(files.file));
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if(files.length > 0){
      this.filesChangeEmiter.emit(files);
    }
  }
}
