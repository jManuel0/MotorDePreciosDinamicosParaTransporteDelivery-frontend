import { Trip } from "../Trip";
import PricingConfig from "../PricingConfig";

export class PremiumTrip implements Trip {
  constructor(private distanceKm: number) {}

  getType(): string {
    return "PREMIUM";
  }

  calculatePrice(): number {
    const baseRate = PricingConfig.getInstance().getBaseRate(this.getType());
    return baseRate * this.distanceKm;
  }
}
