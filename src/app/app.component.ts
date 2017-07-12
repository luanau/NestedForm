import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    public myForm: FormGroup; // our form model

    // we will use form builder to simplify our syntax
    constructor(private _fb: FormBuilder) { }

    save(model: Customer) {
        // call API to save customer
        console.log(model);
    }

    ngOnInit() {
        // we will initialize our form here
        this.myForm = this._fb.group({
                name: ['', [Validators.required, Validators.minLength(5)]],
                addresses: this._fb.array([
                    this.initAddress(),
                ])
            });
        }

    initAddress() {
            // initialize our address
            return this._fb.group({
                street: ['', Validators.required],
                postcode: ['']
            });
        }

    addAddress() {
        // add address to the list
        const control = <FormArray>this.myForm.controls['addresses'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        // remove address from the list
        const control = <FormArray>this.myForm.controls['addresses'];
        control.removeAt(i);
    }
}