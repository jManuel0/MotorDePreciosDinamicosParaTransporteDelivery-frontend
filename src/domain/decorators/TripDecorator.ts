import { Trip } from "../Trip";

export abstract class TripDecorator implements Trip {
  protected constructor(protected wrapped: Trip) {}

  getType(): string {
    return this.wrapped.getType();
  }

  abstract calculatePrice(): number;
}
