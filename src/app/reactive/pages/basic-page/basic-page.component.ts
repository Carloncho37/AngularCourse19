import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnSameUrlNavigation } from '@angular/router';
import { ValidatorsService } from '../../../shared/service/validators.service';


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})

export class BasicPageComponent implements OnInit{

  //! Se refactoriza para mejor legibilidad.
  //! Se utiliza el FormBuilder, evitando repetir "new FormControl"
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('',[],[]),
  //   price: new FormControl('',[],[]),
  //   inStorage: new FormControl('',[],[]),
  // //ejempplo: new FormControl("valor por defecto",[validaciones sincronas],[validaciones asincronas]),
  // })

  public myForm: FormGroup = this.fb.group({
    name:['', [ Validators.required, Validators.minLength(3) ] ],
    price:[0 ,[ Validators.required, Validators.min(0) ] ],
    inStorage:[0, [ Validators.required, Validators.min(0) ] ],
  })

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService
    )
    {};
  

  ngOnInit(): void {
    this.myForm.reset( );
  }

  //! Se inyecta el servicio de validacioes para no repetir codigo
  // isValidField(field: string): boolean| null {
  //   return this.myForm.controls[field].errors
  //     && this.myForm.controls[field].touched
  // }

  isValidField(field: string){
    return this.validatorService.isValidField( this.myForm, field)
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
    return null;;
  }

  onSave():void {
    if (this.myForm.invalid) {
       this.myForm.markAllAsTouched(); //? Marca todos los campos como tocados
      return;
    };
    console.log(this.myForm.value);
    // ? Reseteo ,y envio las propiedades y el valor para que se reestablezcan.
    this.myForm.reset( { price:0, inStorage: 0 } );
  }

}
