import { Trip } from "../Trip";
import PricingConfig from "../PricingConfig";

export class AutoTrip implements Trip {
  constructor(private distanceKm: number) {}

  getType(): string {
    return "AUTO";
  }

  calculatePrice(): number {
    const baseRate = PricingConfig.getInstance().getBaseRate(this.getType());
    return baseRate * this.distanceKm;
  }
}
