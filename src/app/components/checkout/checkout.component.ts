import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalQuantity: number=0;
  totalPrice: number=0;
  checkoutFormGroup: FormGroup;

  expirationYearList: number[]=[];
  expirationMonthList: number[]=[];
   currentYear: number=new Date().getFullYear();
    startMonth: number=new Date().getMonth()+1;
  countriesBilling: Country[]=[];
  statesBilling: State[]=[];

  statesShipping: State[]=[];
  constructor(private formBuilder: FormBuilder, private cartService:CartService,
     private checkoutService: CheckoutService) { }

  ngOnInit(): void {

    
   

    this.checkoutFormGroup=this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      billingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      creditCard: this.formBuilder.group({
        type:[''],
        name:[''],
        number:[''],
        secCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    this.showPriceAndQuantityStatus();

  }

  setStatesBilling(code: string){

    console.log("state:"+ code);
    this.checkoutService.getStatesByCountryCode(code).subscribe(
      data=>{
        this.statesBilling=data
      }
    );

  }

  setStatesShipping(code: string){

    console.log("state:"+ code);
    this.checkoutService.getStatesByCountryCode(code).subscribe(
      data=>{
        this.statesShipping=data
      }
    );

  }

copyShippingToBilling(event){
  if(event.target.checked){
    this.statesBilling=this.statesShipping;
    this.checkoutFormGroup.controls.billingAddress
    .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
  }else{
    this.checkoutFormGroup.controls.billingAddress.reset();
  }
  }

  choosingExpirationYear(){
    const creditCardFormGroup= this.checkoutFormGroup.get('creditCard');
    const selectedYear: number= Number(creditCardFormGroup.value.expirationYear);

    let startMonth;
    if(selectedYear===this.currentYear){
     startMonth=new Date().getMonth()+1;
    }else{
     startMonth=1;
          
        }
 
        this.checkoutService.getMonthsForCreditCard(startMonth).subscribe(
          data=>{
            this.expirationMonthList=data
          }
        );


      }
  

onSubmit(){
  console.log(this.checkoutFormGroup.get('customer').value);
  console.log(this.checkoutFormGroup.get('shippingAddress').value);
  console.log(this.checkoutFormGroup.get('creaditCard').value);
  
}

showPriceAndQuantityStatus() {


  this.cartService.totalPrice.subscribe(
    data=>{
      this.totalPrice=data
    }
  );
  this.cartService.totalQuantity.subscribe(
    data=>{
      this.totalQuantity=data
    }
  );
  this.cartService.computeCartTotalts();


  this.checkoutService.getYearForCreditCard().subscribe(
    data=>{
      this.expirationYearList=data
    }
  );

  this.checkoutService.getMonthsForCreditCard(this.startMonth).subscribe(
    data=>{
      this.expirationMonthList=data
    }
  );

this.checkoutService.getCountryList().subscribe(
  data=>{
    this.countriesBilling=data
  }
);





}



}
