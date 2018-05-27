import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl,ValidationErrors } from "@angular/forms"
@Directive({
  selector: '[appNoSpecialCharacters]',
  providers: [{provide: NG_VALIDATORS,useExisting:NoSpecialCharactersDirective,multi: true}]
})
export class NoSpecialCharactersDirective implements Validator {

  constructor() { }

  validate(c:FormControl):ValidationErrors{
    const hasSpecialCharacter=/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(c.value);
    const message={"hasSpecialChars":{"message":"No Special Character Allowd"}};
    return hasSpecialCharacter?message:null;
  }

}
