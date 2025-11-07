import { TripType } from "./TripType";
import { Trip } from "./Trip";
import { MotoTrip } from "./trips/MotoTrip";
import { AutoTrip } from "./trips/AutoTrip";
import { CamionTrip } from "./trips/CamionTrip";
import { PremiumTrip } from "./trips/PremiumTrip";

export class TripFactory {
  static createTrip(type: TripType, distanceKm: number): Trip {
    switch (type) {
      case "MOTO":
        return new MotoTrip(distanceKm);
      case "AUTO":
        return new AutoTrip(distanceKm);
      case "CAMION":
        return new CamionTrip(distanceKm);
      case "PREMIUM":
        return new PremiumTrip(distanceKm);
      default:
        throw new Error("Tipo no soportado");
    }
  }
}
