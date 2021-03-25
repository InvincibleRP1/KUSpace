import { Injectable } from '@angular/core'
import { Validator, FormGroup } from '@angular/forms'

@Injectable({ providedIn: 'root' })

export class MatchPassword implements Validator {
    validate(formGroup: FormGroup) {
       const passwordControl= formGroup.get('password');
       const passwordConfirmControl= formGroup.get('passwordConfirmation')
        if (passwordControl.value != passwordConfirmControl.value) {
            return { passwordsDontMatch: true }
        }
        else {
            return null;
        }
    }
}


