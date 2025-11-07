class PricingConfig {
  private static instance: PricingConfig;

  // Tarifas base por km
  private readonly baseMoto = 800;
  private readonly baseAuto = 1000;
  private readonly baseCamion = 1500;
  private readonly basePremium = 2000;

  // Multiplicadores
  private readonly peakHourMultiplier = 1.5;
  private readonly rainMultiplier = 1.2;

  // Extras
  private readonly tollPrice = 4000; // por peaje
  private readonly extraDistanceThreshold = 10; // km
  private readonly extraDistanceMultiplier = 1.1; // solo parte extra

  private constructor() {}

  public static getInstance(): PricingConfig {
    if (!PricingConfig.instance) {
      PricingConfig.instance = new PricingConfig();
    }
    return PricingConfig.instance;
  }

  getBaseRate(type: string): number {
    switch (type) {
      case "MOTO":
        return this.baseMoto;
      case "AUTO":
        return this.baseAuto;
      case "CAMION":
        return this.baseCamion;
      case "PREMIUM":
        return this.basePremium;
      default:
        throw new Error("Tipo no soportado: " + type);
    }
  }

  getPeakHourMultiplier(): number {
    return this.peakHourMultiplier;
  }

  getRainMultiplier(): number {
    return this.rainMultiplier;
  }

  getTollPrice(): number {
    return this.tollPrice;
  }

  getExtraDistanceThreshold(): number {
    return this.extraDistanceThreshold;
  }

  getExtraDistanceMultiplier(): number {
    return this.extraDistanceMultiplier;
  }
}

export default PricingConfig;
