import { Component, OnInit, Injectable,TemplateRef} from '@angular/core';
import{FoodTruckServiceService} from '../shared/food-truck-service.service'
import { FoodTruck } from '../shared/food-truck';
import { NotificationService } from '../shared/notification.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-food-truck-list',
  templateUrl: './food-truck-list.component.html',
  styleUrls: ['./food-truck-list.component.css']
})
export class FoodTruckListComponent implements OnInit {
 readonly DELIMITER = '-';
  FoodTrucks: any = [];
  isChecked:boolean;
  modalRef: BsModalRef;
  foodtruck:FoodTruck={id:'', name:'', date:''};
  constructor(public restApi: FoodTruckServiceService,
    private notify :NotificationService,
    private modalService: BsModalService,
    ) {
  }
  ngOnInit() {
    this.loadFoodTrucks();
  }
  myCallbackFunction = (): void => {
    if(this.isChecked){
        this.loadFoodTrucksByDate();
      }else{
          this.loadFoodTrucks();
      }
  }
  // Get employees list
  loadFoodTrucks():void {
    this.restApi.getFoodTrucks().subscribe((data: {}) => {
      this.FoodTrucks = data;
    });
  }

  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.foodtruck.id = id;
  }

  confirm(): void {
    this.modalRef.hide();
    this.delete();
  }

  delete():void{
    this.restApi.deleteFoodTruck(this.foodtruck.id).subscribe((data: any) => {
        this.notify.showSuccess(data.message,"");
        if(this.isChecked){
          this.loadFoodTrucksByDate();
        }else{
          this.loadFoodTrucks();
        }
      });
  }

  decline(): void {
    this.modalRef.hide();
  }

  editFoodTrucks(id:string, name:string, date:string):void {
   this.foodtruck.id=id;
   this.foodtruck.name=name;
   this.foodtruck.date=date;
  }
  checkValue(value:any){
    if(value==1){
     this.loadFoodTrucksByDate();
    }else{
      this.loadFoodTrucks();
    }

  }
  loadFoodTrucksByDate():void{
   let todayDate=new Date();
      let formattedDate=this.formatNumber(todayDate.getDate())+this.DELIMITER+this.formatNumber(todayDate.getMonth()+1)+this.DELIMITER +todayDate.getFullYear();
      this.restApi.getFoodTrucksByDate(formattedDate).subscribe((data: {}) => {
        this.FoodTrucks = data;
      });
  }
  formatNumber(number:number):string {
      return (number < 10 ? '0' : '') + number
   }
}
