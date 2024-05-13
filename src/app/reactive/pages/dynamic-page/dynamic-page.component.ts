import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})

export class DynamicPageComponent {

  //? Creo las propiedades
  public myForm: FormGroup = this.fb.group(
    {
    name: ['', [ Validators.required, Validators.minLength(3) ],[]],
    favoriteGames: this.fb.array([
      ['Metal gear', Validators.required,[] ],
      ['Deadth Stranding', Validators.required,[] ]
    ])
    }
  )

  public newFavorite: FormControl = new FormControl('', Validators.required);


    constructor (
      private fb:FormBuilder,
      private validatorService: ValidatorsService)
      {};

    //? Creo Getter
    get favoriteGames() {
      return this.myForm.get('favoriteGames') as FormArray;
    }

    //? Creo metodos
    //! Se inyecta el servicio 
    // isValidField(field: string): boolean| null {
    //   return this.myForm.controls[field].errors
    //     && this.myForm.controls[field].touched
    // }

    isValidField(field: string){
      return this.validatorService.isValidField( this.myForm, field)
    }

    isValidFieldInArray( formArray:FormArray, index:number ){
      return formArray.controls[index].errors
        && formArray.controls[index].touched
    }


    getFieldError(field: string): string | null {
      if ( !this.myForm.controls[field] ) return null;

      const errors = this.myForm.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
        switch(key) {
          case 'required':
            return 'Este campo es requerido.'

          case 'minlength':
            return `Minimo ${ errors['minlength'].requiredLength } caracteres.`

        }
      }
      return null;
    }

    onAddFavorites(){
      if (this.newFavorite.invalid) return;
      const newGame = this.newFavorite.value;
      // this.favoriteGames.push( new FormControl( newGame, Validators.required) );
      this.favoriteGames.push(
        this.fb.control(newGame,Validators.required)
      )
      this.newFavorite.reset();

    }

    onDeleteFavorite( index: number): void {
      this.favoriteGames.removeAt(index);
    }

    onSubmit (): void {

      if ( this.myForm.invalid ) {
        this.myForm.markAllAsTouched();
        return;
      }

      console.log(this.myForm.value);
      (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
      this.myForm.reset();
    }
}
