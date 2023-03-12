import { Component, Injectable, Input, OnInit} from '@angular/core';
import {
	NgbCalendar,
	NgbDateAdapter,
	NgbDateParserFormatter,
	NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import{FoodTruckServiceService} from '../shared/food-truck-service.service'
import { FoodTruck } from '../shared/food-truck';
import { NotificationService } from '../shared/notification.service';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? this.formatNumber(date.day) + this.DELIMITER + this.formatNumber(date.month) + this.DELIMITER + date.year : null;
	}
  formatNumber(number:number):string {
      return (number < 10 ? '0' : '') + number
   }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '-';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
		return date ? this.formatNumber(date.day) + this.DELIMITER + this.formatNumber(date.month) + this.DELIMITER + date.year : '';
	}

   formatNumber(number:number):string {
      return (number < 10 ? '0' : '') + number
   }
}

@Component({
  selector: 'app-add-food-truck',
  templateUrl: './add-food-truck.component.html',
  styleUrls: ['./add-food-truck.component.css'],
  providers: [
		{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class AddFoodTruckComponent implements OnInit {
  readonly DELIMITER = '-';
   title = 'Food Truck Service';
   minDate:any;
   @Input() foodtruck: FoodTruck;
   @Input() callbackFunction: () => void;

   ngOnInit() {
   }

  constructor(private restApi: FoodTruckServiceService,
    private notifyService : NotificationService,
   ) {
  const current = new Date();
    this.minDate = {
      month: current.getMonth() + 1,
      day: current.getDate(),
      year: current.getFullYear()
    };

  }
  saveData():void{

   if(this.foodtruck.id!=""){
     this.restApi.updateFoodTruck(this.foodtruck).subscribe((data: any) => {
      this.foodtruck.name='';
      this.foodtruck.date='';
      this.foodtruck.id='';
      this.notifyService.showSuccess(data.message, "");
      this.callbackFunction();
    });
    }else{
      this.restApi.createFoodTruck(this.foodtruck).subscribe((data:any) => {
        this.foodtruck.name='';
        this.foodtruck.date='';
        this.foodtruck.id='';
        this.notifyService.showSuccess(data.message, "");
        this.callbackFunction();
    });
    }

  }

}
