import { Injectable } from '@angular/core';
import { CartItem  } from '../common/cart-item';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

	cartItems:CartItem[]=[];
	totalPrice:Subject<number> =new Subject<number>();
	totalQuantity:Subject<number> =new Subject<number>();

  constructor() { }

  addToCart(theCartItem:CartItem){
  	let alreadyExistingInCart:boolean=false;
  	let existingCartItem:CartItem=undefined;

  	if(this.cartItems.length>0){

  		existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);

  		alreadyExistingInCart=(existingCartItem!=undefined);

  	}

  	if(alreadyExistingInCart){
  		existingCartItem.quantity++;
  	}
  	else{
  		this.cartItems.push(theCartItem);
  	}

  	this.computeCartTotals();
  }

  computeCartTotals(){
  	let totalPriceValue:number=0;
  	let totalQuantityValue:number=0;

  	for(let currentCartItem of this.cartItems){
  		totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
  		totalQuantityValue+=currentCartItem.quantity;
  	}

  	this.totalPrice.next(totalPriceValue);
  	this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(tpv:number, tqv:number){
      console.log("Contents of the car /n");
      for( let temp of this.cartItems){
        const subTotalPrice=temp.quantity*temp.unitPrice;
        console.log(`name: ${temp.name}, quantity: ${temp.quantity}`
                    +`unitPrice: ${temp.unitPrice} subTotalPrice: ${subTotalPrice}`);
      }
      console.log(`Total Price: ${tpv.toFixed(2)} Quantity: ${tqv}`);
      console.log("-----------\n");
  }

  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem:CartItem){

    const itemIndex= this.cartItems.findIndex(tempCartItem=>tempCartItem.id===theCartItem.id);
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }

  }

}
