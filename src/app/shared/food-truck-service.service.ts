import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FoodTruck } from '../shared/food-truck';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FoodTruckServiceService {
  apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {

  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch FoodTruck list
  getFoodTrucks(): Observable<FoodTruck> {
    return this.http
      .get<FoodTruck>(this.apiURL + '/foodtruck')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch FoodTruck List By Date
  getFoodTrucksByDate(date: string): Observable<FoodTruck> {
    return this.http
      .get<FoodTruck>(this.apiURL + '/foodtruck/' + date)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => add foodtruck
  createFoodTruck(foodtruck: any): Observable<FoodTruck> {
    return this.http
      .post<FoodTruck>(
        this.apiURL + '/foodtruck',
        JSON.stringify(foodtruck),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update foodtruck
  updateFoodTruck(foodtruck: any): Observable<FoodTruck> {
    return this.http
      .put<FoodTruck>(
        this.apiURL + '/foodtruck',
        JSON.stringify(foodtruck),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete foodtruck
  deleteFoodTruck(id: string) {
    return this.http
      .delete<FoodTruck>(this.apiURL + '/foodtruck/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
