import { TripDecorator } from "./TripDecorator";
import PricingConfig from "../PricingConfig";
import type { Trip } from "../Trip";

export class ExtraDistanceDecorator extends TripDecorator {
  private readonly distanceKm: number;

  constructor(wrapped: Trip, distanceKm: number) {
    super(wrapped);
    this.distanceKm = distanceKm;
  }

  calculatePrice(): number {
    const base = this.wrapped.calculatePrice();
    const config = PricingConfig.getInstance();
    const threshold = config.getExtraDistanceThreshold();

    if (this.distanceKm <= threshold) {
      return base;
    }

    const extraKm = this.distanceKm - threshold;
    const baseRate = config.getBaseRate(this.getType());
    const extra =
      extraKm *
      baseRate *
      (config.getExtraDistanceMultiplier() - 1);

    return base + extra;
  }
}
