import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {

  deleteType!: String

  constructor() { }

  setDeleteType(deleteType: String): void {
    this.deleteType = deleteType
  }

  getDeleteType(): String {
    return this.deleteType
  }
}
