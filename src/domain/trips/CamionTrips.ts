import { Trip } from "../Trip";
import PricingConfig from "../PricingConfig";

export class CamionTrip implements Trip {
  constructor(private distanceKm: number) {}

  getType(): string {
    return "CAMION";
  }

  calculatePrice(): number {
    const baseRate = PricingConfig.getInstance().getBaseRate(this.getType());
    return baseRate * this.distanceKm;
  }
}
