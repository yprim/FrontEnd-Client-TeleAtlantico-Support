import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _hideModal: boolean = true;

  public newIssue:EventEmitter<boolean> = new EventEmitter<boolean>();

  openModal(){   
      this._hideModal = false;
    }
  
  closeModal(){   
    this._hideModal = true;
  }

  get hideModal(){
    return this._hideModal;
  }
}
