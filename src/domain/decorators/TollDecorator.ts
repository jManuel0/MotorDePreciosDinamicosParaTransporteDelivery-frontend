import { TripDecorator } from "./TripDecorator";
import PricingConfig from "../PricingConfig";

export class TollDecorator extends TripDecorator {
  constructor(wrapped: any, private tolls: number) {
    super(wrapped);
  }

  calculatePrice(): number {
    const base = this.wrapped.calculatePrice();
    const tollPrice = PricingConfig.getInstance().getTollPrice();
    return base + this.tolls * tollPrice;
  }
}
