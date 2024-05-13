// import  * as customValidators from '../../../shared/validators/validator';
import { Component } from '@angular/core';
import { emailValidator } from '../../../shared/validators/email.validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    // name:['',[Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)],[] ],
    name:['',[Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)],[] ],
    // email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern) ],[ new emailValidator] ],
    email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern) ],[ this.emailValidator] ],
    username:['',[Validators.required, this.validatorService.cantBeStrider ]],
    password:['',[Validators.required, Validators.minLength(6)],[]],
    password2:['',[Validators.required, Validators.minLength(6)],[]],
  } , {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor (
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: emailValidator
    ){}

  isValidField(field: string){
    return this.validatorService.isValidField( this.myForm, field)
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }


}
