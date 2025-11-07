import { Trip } from "../Trip";
import PricingConfig from "../PricingConfig";

export class MotoTrip implements Trip {
  constructor(private distanceKm: number) {}

  getType(): string {
    return "MOTO";
  }

  calculatePrice(): number {
    const baseRate = PricingConfig.getInstance().getBaseRate(this.getType());
    return baseRate * this.distanceKm;
  }
}
