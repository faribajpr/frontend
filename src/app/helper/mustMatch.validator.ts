import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(control: AbstractControl): ValidationErrors | null {
    if (control) {
        const controlName = control.get('password')?.value;
        const matchingControlName = control.get('confirmPassword')?.value;
        
        if (matchingControlName.length == 0) {
            // return if another validator has already found an error on the matchingControl
            return null;
        }
        if (controlName == matchingControlName) {
            control.get('password')?.setErrors(null);
            control.get('confirmPassword')?.setErrors(null);
        } else{
            control.get('confirmPassword')?.setErrors({MustMatch: true});
            return ({MustMatch: true});
        }
    }
    
    return null
}