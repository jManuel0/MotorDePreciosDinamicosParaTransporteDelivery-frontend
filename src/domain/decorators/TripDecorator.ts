import type { Trip } from "../Trip";

export abstract class TripDecorator implements Trip {
  protected wrapped: Trip;

  protected constructor(wrapped: Trip) {
    this.wrapped = wrapped;
  }

  getType(): string {
    return this.wrapped.getType();
  }

  abstract calculatePrice(): number;
}

