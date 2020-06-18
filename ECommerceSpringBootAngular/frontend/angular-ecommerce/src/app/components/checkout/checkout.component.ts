import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	checkoutFormGroup:FormGroup;
	totalPrice: number=0;
	totalQuantity:number=0;

	constructor( private formBuilder: FormBuilder) { }

	ngOnInit(): void {

		this.checkoutFormGroup= this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName:[''],
				lastName:[''],
				email:['']
			}),
			shippingAddress: this.formBuilder.group({
				street:[''],
				city:[''],
				state:[''],
				country:[''],
				zipcode:['']
			}),
			billingAddress: this.formBuilder.group({
				street:[''],
				city:[''],
				state:[''],
				country:[''],
				zipcode:['']
			}),
			creditCard: this.formBuilder.group({
				cardType:[''],
				cardNumber:[''],
				nameOnCard:[''],
				securityCode:[''],
				expirationMonth:[''],
				expirationYear:['']
			})
		});
	}

	copyShipToBill(event){
		if(event.target.checked){
			this.checkoutFormGroup.controls.billingAddress
			.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
		}
		else{
			this.checkoutFormGroup.controls.billingAddress.reset();
		}
	}

}