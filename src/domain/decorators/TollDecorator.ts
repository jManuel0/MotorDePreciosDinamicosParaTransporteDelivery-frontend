import { TripDecorator } from "./TripDecorator";
import PricingConfig from "../PricingConfig";
import type { Trip } from "../Trip";

export class TollDecorator extends TripDecorator {
  private readonly tolls: number;

  constructor(wrapped: Trip, tolls: number) {
    super(wrapped);
    this.tolls = tolls;
  }

  calculatePrice(): number {
    const base = this.wrapped.calculatePrice();
    const tollPrice = PricingConfig.getInstance().getTollPrice();
    return base + this.tolls * tollPrice;
  }
}
