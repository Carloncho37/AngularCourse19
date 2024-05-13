import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber, delay, of, subscribeOn } from 'rxjs';

@Injectable({providedIn: 'root'})
export class emailValidator implements AsyncValidator  {

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email= control.value;
  //   console.log({ email } )

  //   return of ({
  //     emailTaken: true
  //   })
  // }


  validate(control: AbstractControl ): Observable<ValidationErrors | null> {
    const email= control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({ email });

      if (email === 'carlos@gmail.com'){
        subscriber.next({ emailTaken: true });
        subscriber.complete();
      };

      subscriber.next(null);
      subscriber.complete();
      // return

    }).pipe (
      delay(3000)
    )
    ;

    return httpCallObservable;
  }

}

