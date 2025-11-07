import { useState } from "react";
import type { TripType } from "./domain/TripType";
import { TripFactory } from "./domain/TripFactory";
import { ExtraDistanceDecorator } from "./domain/decorators/ExtraDistanceDecorator";
import { PeakHourDecorator } from "./domain/decorators/PeakHourDecorator";
import { RainDecorator } from "./domain/decorators/RainDecorator";
import { TollDecorator } from "./domain/decorators/TollDecorator";
import "./App.css";

function App() {
  const [type, setType] = useState<TripType>("MOTO");
  const [distance, setDistance] = useState<number>(8);
  const [peakHour, setPeakHour] = useState(false);
  const [rain, setRain] = useState(false);
  const [tolls, setTolls] = useState(0);

  const [price, setPrice] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<string>("");

  const handleCalculate = () => {
    if (!distance || distance <= 0) {
      setPrice(null);
      setBreakdown("La distancia debe ser mayor a 0 km.");
      return;
    }

    // Factory Method → viaje base
    let trip = TripFactory.createTrip(type, distance);
    const details: string[] = [`Base ${type} (${distance} km)`];

    // Decorator → distancia extra
    trip = new ExtraDistanceDecorator(trip, distance);
    details.push("Ajuste por distancia extra (si aplica)");

    // Decorator → hora pico
    if (peakHour) {
      trip = new PeakHourDecorator(trip);
      details.push("Multiplicador por hora pico");
    }

    // Decorator → lluvia
    if (rain) {
      trip = new RainDecorator(trip);
      details.push("Multiplicador por lluvia");
    }

    // Decorator → peajes
    if (tolls > 0) {
      trip = new TollDecorator(trip, tolls);
      details.push(`${tolls} peaje(s)`);
    }

    const finalPrice = trip.calculatePrice();
    setPrice(finalPrice);
    setBreakdown(details.join(" · "));
  };

  return (
    <div className="app-root">
      <div className="glass-card">
        <header className="header">
          <div className="logo-circle">🚖</div>
          <div>
            <h1>Motor de Precios Dinámicos</h1>
            <p className="subtitle">
              Calcula tarifas usando <b>Singleton</b>, <b>Factory Method</b> y{" "}
              <b>Decorator</b> directamente en el frontend.
            </p>
          </div>
        </header>

        <div className="grid">
          {/* Tipo de vehículo */}
          <div className="field">
            <label htmlFor="vehicleType">Tipo de vehículo</label>
            <select
              id="vehicleType"
              value={type}
              onChange={(e) => setType(e.target.value as TripType)}
            >
              <option value="MOTO">Moto</option>
              <option value="AUTO">Auto</option>
              <option value="CAMION">Camión</option>
              <option value="PREMIUM">Premium</option>
            </select>
          </div>

          {/* Distancia */}
          <div className="field">
            <label htmlFor="distance">Distancia (km)</label>
            <input
              id="distance"
              type="number"
              min={1}
              step={0.1}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
            />
          </div>

          {/* Hora pico */}
          <div className="field checkbox-field">
            <input
              id="peakHour"
              type="checkbox"
              checked={peakHour}
              onChange={(e) => setPeakHour(e.target.checked)}
            />
            <label htmlFor="peakHour">Hora pico</label>
          </div>

          {/* Lluvia */}
          <div className="field checkbox-field">
            <input
              id="rain"
              type="checkbox"
              checked={rain}
              onChange={(e) => setRain(e.target.checked)}
            />
            <label htmlFor="rain">Lluvia</label>
          </div>

          {/* Peajes */}
          <div className="field">
            <label htmlFor="tolls">Peajes</label>
            <input
              id="tolls"
              type="number"
              min={0}
              value={tolls}
              onChange={(e) => setTolls(Number(e.target.value))}
            />
          </div>
        </div>

        <button className="calculate-button" onClick={handleCalculate}>
          Calcular Tarifa
        </button>

        {price !== null && (
          <div className="result">
            <h2>Tarifa Calculada: ${price.toFixed(2)}</h2>
            <p className="breakdown">{breakdown}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
