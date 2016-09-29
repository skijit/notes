Angular2 Input & Forms
==============
Bunches of Notes about Forms & Validation in Angular2

**Sources**
- [Angular Docs: User Input](https://angular.io/docs/ts/latest/guide/user-input.html)
- [Angular Docs: Forms](https://angular.io/docs/ts/latest/guide/forms.html)
- [Good Blog on Forms](http://blog.rangle.io/data-angular-2-forms/)
- [Blog on Form Classes & Directives](http://blog.rangle.io/how-angular-2-form-models-work/)
- [Very Good Blog on Form Validation](https://scotch.io/tutorials/angular-2-form-validation)
- [Angular Cookbook: Validation](https://angular.io/docs/ts/latest/cookbook/form-validation.html)


## Intro
- Do you need to use forms in the first place?
    - You could use form elements with `ngModel` outside an actual form
    - It's probably easier, but using Angular Forms has some advantages:
        - Validation (lots of options)
        - Tracking control state (e.g. touched, untouched, dirty, etc.)
        - Attaching an `Observable` to underlying controls (in Reactive Methodology)           
- Angular2 has 2 different forms methodologies
    - **Template Driven Forms**
        - Good for static forms with simple, standard validation rules
        - You markup your template with form elements, validation attributes, `ng...` directives, etc.
        - At runtime, angular interprets the template and derives its *form control model*
        - Based on `FormsModule`
    - **Reactive Forms**
        - More flexibility to:
            - Add/change/remove validation functions dynamically
            - manipulate the control model dynamically
        - You create the form control model in code.
        - You write the template with form elements
        - At runtime, angular binds the template elements to your control model based on your instructions
        - Based on 'ReactiveFormsModule'
    - Both `ReactiveFormsModule` and `FormsModule` are imported from `@angular/forms` package.
- **Best Practice:** Use Reactive Forms instead of Template-driven forms
    - More flexible
    - Only slightly more code 
- Angular / Events reminder:
    - Any user action (e.g. clicking links, pusing buttons, entering text) raise DOM events, which you can listen for / bind to with Angular code
    - Angular has pseudo-events that filter some DOM key events, like `keyup`
    - Filtering for just the enter on a keyup:
        ```(html)
        <input #box (keyup.enter)="values=box.value">```


## Key Classes And Directives
- Classes:
    - Forms are based on groups of Controls.
    - There are 3 types of Controls (which all derive from `AbstractControl`)
        1. `Control`
        2. `ControlGroup` : Used to compose logical groups in the Html Tree
        3. `ControlArray` : Used for dynamically replicating sections of controls
    - `Validator`
        - Sync or Async function(s) referenced by a `Control`
    - `FormBuilder` : an injectable service that lets you create instances of control classes
- Directives:
    - `NgControlGroup`: Lets you bind Dom elements (e.g. container `<div>`) to a `ControlGroup`
    - `NgFormControl` : lets you bind your DOM elements (e.g. form elements like `<input>`) to a `Control`
    - `NgControlName` : same as above, I think
    - `NgForm`: Lets you bind your `<form>` to a form class.
- Control State / ClassNames     
    - `ng-untouched`
    - `ng-touched`
    - `ng-dirty`
    - `ng-invalid`


## Validation
- Angular 2 supports these validation approaches
    - [Html5 validation attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)
        - See [this](https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#template1) example in the angular2 cookbook  
    - Control state (e.g. touched, untouched, dirty, etc.)
    - [Angular Validation classes](https://angular.io/docs/js/latest/api/forms/index/Validators-class.html)
    - Custom Validation classes  TODO: See Reactive example 


## Example Template-Driven Form
- Hero Component (hero-form.component.ts)
```(typescript)
    import { Component } from '@angular/core';
    import { Hero }    from './hero';

    @Component({
    moduleId: module.id,
    selector: 'hero-form',
    templateUrl: 'hero-form.component.html'
    })
    export class HeroFormComponent {
        powers = ['Really Smart', 'Super Flexible',
                    'Super Hot', 'Weather Changer'];
        model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
        submitted = false;
        onSubmit() { this.submitted = true; }
        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        active = true;
        newHero() {
            this.model = new Hero(42, '', '');
            this.active = false;
            setTimeout(() => this.active = true, 0);
        }
    }```
- Hero Template (hero-form.component.html)
```(html)
<div class="container">
  <div  [hidden]="submitted">
    <h1>Hero Form</h1>
    <form *ngIf="active" (ngSubmit)="onSubmit()" #heroForm="ngForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel" >
        <div [hidden]="name.valid || name.pristine" 
             class="alert alert-danger">
          Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control" id="alterEgo"
               [(ngModel)]="model.alterEgo" name="alterEgo" >
      </div>
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" id="power"
                required
                [(ngModel)]="model.power" name="power" 
                #power="ngModel" >
          <option *ngFor="let p of powers" [value]="p">{{p}}</option>
        </select>
        <div [hidden]="power.valid || power.pristine" class="alert alert-danger">
          Power is required
        </div>
      </div>
      <button type="submit" class="btn btn-default" [disabled]="!heroForm.form.valid">Submit</button>
      <button type="button" class="btn btn-default" (click)="newHero()">New Hero</button>
    </form>
  </div>
  <div [hidden]="!submitted">
    <h2>You submitted the following:</h2>
    <!-- ... -->
    <!-- confirmation screen : with interpolation like {{ model.name }}, etc. -->
    <br>
    <button class="btn btn-default" (click)="submitted=false">Edit</button>
  </div>
</div>```

### Remarks
- HTML5-driven Validation
    - Angular is keying off the html5-based validation properties such as `required`
        - For more, see [here](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation)        
- Template reference variable for `ngForm`
    - Recall: Template Reference variables refer to a DOM element or a directive
    - `#heroForm="ngForm"` associates the form with the ngForm directive.
    - ngForm does the following:
        - holds references to controls corresponding to elements with `ngModel`
        - monitors the properties for changes
        - has its own `valid` property which cascades from the individual controls' validities.
- Pristine state
    - when evaluating the state of the property (e.g. pristine, dirty, etc.), there is no difference between changing a property directly or new'ing up a completely new model (which contains the property).  In both cases, *pristine* will be false. 
- `*ngIf` on form in lieu of a reset feature
    - since there's no way to reset the form (to get back to a pristine state, as mentioned above), we can simulate this by using the `*ngIf` to remove and re-add the form entirely, by using a `setTimeout()`. 
- Template reference variable for `ngModel`
    - If you want to create a template reference variable corresponding to the ngModel, you can just reference ngModel as such:
    ```(html)
    <select class="form-control" id="power" [(ngModel)]="model.power" name="power"  #power="ngModel" >
        <option *ngFor="let p of powers" [value]="p">{{p}}</option>
    </select>```
- HTML5 hidden property
    - This is an HTML5 Dom property, so you don't need to bother with CSS, and you can use regular property binding
- ngmodel syntax variations depending on the model class
    - **Binding Target only**: If the `name` property of the element is the same as corresponding property in the component, you simply add `ngModel`.  
    - **Binding Target and Source**: If you have a differently named component property (perhaps living in a model class) you want to assign to the control, you would use `[(ngModel)]="model.power"`
    - Doing this lets us check the control states (e.g. touched, untouched, dirty, etc.)
    - For another approach entirely, see Reactive form approach (below)

    
## Example Reactive Form
- **Template Code**
```(html)
    <div class="jumbotron">
        <h2>Form with Validations</h2>
        <form [formGroup]="complexForm" (ngSubmit)="submitForm(complexForm.value)">
        <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['firstName'].valid && complexForm.controls['firstName'].touched}">
            <label>First Name:</label>
            <input class="form-control" type="text" placeholder="John" [formControl]="complexForm.controls['firstName']">
            <!-- The hasError method will tell us if a particular error exists -->
            <div *ngIf="complexForm.controls['firstName'].hasError('required') && complexForm.controls['firstName'].touched" class="alert alert-danger">You must include a first name.</div>
            <div *ngIf="complexForm.controls['firstName'].hasError('overSixCharacters') && complexForm.controls['firstName'].touched" class="alert alert-danger">Your name should be less than six characters!</div>
        </div>
        <div class="form-group" [ngClass]="{'has-error':!complexForm.controls['lastName'].valid && complexForm.controls['lastName'].touched}">
            <label>Last Name</label>
            <input class="form-control" type="text" placeholder="Doe" [formControl]="complexForm.controls['lastName']">
            <!-- The hasError method can work with the built in validators but custom validators as well -->
            <div *ngIf="complexForm.controls['lastName'].hasError('required') && complexForm.controls['lastName'].touched" class="alert alert-danger">You must include a last name.</div>
            <div *ngIf="complexForm.controls['lastName'].hasError('minlength') && complexForm.controls['lastName'].touched" class="alert alert-danger">Your last name must be at least 5 characters long.</div>
            <div *ngIf="complexForm.controls['lastName'].hasError('maxlength') && complexForm.controls['lastName'].touched" class="alert alert-danger">Your last name cannot exceed 10 characters.</div>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <div class="alert alert-danger" *ngIf="!complexForm.controls['gender'].valid && complexForm.controls['gender'].touched">You must select a gender.</div>
        </div>
        <div class="radio">
            <label>
            <input type="radio" name="gender" value="Male" [formControl]="complexForm.controls['gender']">
            Male
            </label>
        </div>
        <div class="radio">
            <label>
            <input type="radio" name="gender" value="Female" [formControl]="complexForm.controls['gender']">
            Female
            </label>
        </div>
        <div class="form-group">
            <label>Activities</label>
        </div>
        <label class="checkbox-inline">
            <input type="checkbox" value="hiking" name="hiking" [formControl]="complexForm.controls['hiking']"> Hiking
        </label>
        <label class="checkbox-inline">
            <input type="checkbox" value="swimming" name="swimming" [formControl]="complexForm.controls['swimming']"> Swimming
        </label>
        <label class="checkbox-inline">
            <input type="checkbox" value="running" name="running" [formControl]="complexForm.controls['running']"> Running
        </label>
        <div class="form-group">
            <button type="submit" class="btn btn-primary" [disabled]="!complexForm.valid">Submit</button>
        </div>
        </form>
    </div>```
&nbsp;   
&nbsp;   
- **Component**
```(typescript)
    import { Component } from '@angular/core';
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';
    import { TomsValidators } from 'my-validators';
    
    @Component({
    selector: 'form-validation',
    templateUrl: 'blah.html'
    })
    export class FormValidationComponent {
        complexForm : FormGroup;

        constructor(fb: FormBuilder){
            this.complexForm = fb.group({      
                //first field in array is the default value, next field is the (set) of Validator functions
                'firstName' : [null, Validators.compose([Validators.required, TomsValidators.checkUsernameLength],        
                'lastName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
                'gender' : [null, Validators.required],
                'hiking' : false,
                'running' :false,
                'swimming' :false
            })
        }
        
        //subscribe to changes!
        this.complexForm.controls['gender'].valueChanges
            .subscribe((value: string) => {
                console.log('Gender switched!');
            });
        
        submitForm(value: any){
            console.log(value);
        }
    }```
&nbsp;   
&nbsp;   
- **Custom Validator (my-validators.ts)**
```(typescript)
    export class TomsValidators {
        static checkUsernameLength(field: Control) {
            if (field.value.length <= 6) {
                // returning null means the field passes
                // the validity check
                return null;
            } else {
                //the way you check for this error is by the property, not the validation name
                //<div *ngIf="username.hasError('overSixCharacters')">  
                //  Username must be fewer than 6 characters!
                //</div>
                return { overSixCharacters: true };
            }
        }
    }```

### Remarks
- **Observables**
    - Each `Control` object has an `EventEmitter` which returns an `Observable`.
- **Uses In-Built and Custom Validation**
- **Checks Control States**