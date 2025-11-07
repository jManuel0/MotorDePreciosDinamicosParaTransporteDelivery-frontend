import type { Trip } from "../Trip";
import PricingConfig from "../PricingConfig";

export class AutoTrip implements Trip {
  private readonly distanceKm: number;

  constructor(distanceKm: number) {
    this.distanceKm = distanceKm;
  }

  getType(): string {
    return "AUTO";
  }

  calculatePrice(): number {
    const baseRate = PricingConfig.getInstance().getBaseRate(this.getType());
    return baseRate * this.distanceKm;
  }
}
