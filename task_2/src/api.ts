export type ConversionRates = Record<string, number>;
export type ConversionRatesData = {
  lastUpdate: string;
  conversionRates: ConversionRates;
};

export class ExchangeService {
  protected static baseUrl = `https://v6.exchangerate-api.com/v6/${
    import.meta.env.VITE_API_KEY
  }`;

  public static async getConversionRates(currency: string) {
    const url = this.baseUrl + `/latest/${currency}`;
    const response = await (await fetch(url)).json();
    return {
      lastUpdate: response.time_last_update_utc,
      conversionRates: response.conversion_rates,
    } as ConversionRatesData;
  }
}
