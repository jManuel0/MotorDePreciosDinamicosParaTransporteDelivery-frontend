import { TripDecorator } from "./TripDecorator";
import PricingConfig from "../PricingConfig";

export class RainDecorator extends TripDecorator {
  calculatePrice(): number {
    const base = this.wrapped.calculatePrice();
    return base * PricingConfig.getInstance().getRainMultiplier();
  }
}
