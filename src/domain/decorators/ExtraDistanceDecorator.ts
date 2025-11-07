import { TripDecorator } from "./TripDecorator";
import PricingConfig from "../PricingConfig";

export class ExtraDistanceDecorator extends TripDecorator {
  constructor(wrapped: any, private distanceKm: number) {
    super(wrapped);
  }

  calculatePrice(): number {
    const base = this.wrapped.calculatePrice();
    const config = PricingConfig.getInstance();
    const threshold = config.getExtraDistanceThreshold();

    if (this.distanceKm <= threshold) return base;

    const extraKm = this.distanceKm - threshold;
    const baseRate = config.getBaseRate(this.getType());
    const extra = extraKm * baseRate * (config.getExtraDistanceMultiplier() - 1);

    return base + extra;
  }
}
