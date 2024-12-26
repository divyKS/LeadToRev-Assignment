import axios from "axios";

export const fetchCovidHistoricalData = async (countryCode) => {
    try {
        const response = await axios.get(
            `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
        );

        const { cases, deaths, recovered } = response.data.timeline;

        console.log('transforming data')

        const transformedData = Object.keys(cases).map((date) => ({
            date,
            cases: cases[date],
            deaths: deaths[date],
            recovered: recovered[date],
        }));

        return {
            currentCountryData: response.data,
            transformedData,
        };
  } catch (error) {
        console.error("Error fetching COVID-19 data:", error);
        throw error;
  }
}

export const fetchCountriesData = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,cca3"
      );
      return response.data.map((country) => ({
        label: country.name.common,
        value: country.cca3,
      }));
    } catch (error) {
        console.error("Error fetching country data:", error);
        throw error;
    }
}