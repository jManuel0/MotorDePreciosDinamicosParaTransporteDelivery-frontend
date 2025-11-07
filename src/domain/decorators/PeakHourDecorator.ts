import { TripDecorator } from "./TripDecorator";
import type { Trip } from "../Trip";
import PricingConfig from "../PricingConfig";

export class PeakHourDecorator extends TripDecorator {
  constructor(wrapped: Trip) {
    super(wrapped);
  }

  calculatePrice(): number {
    const base = this.wrapped.calculatePrice();
    return base * PricingConfig.getInstance().getPeakHourMultiplier();
  }
}
