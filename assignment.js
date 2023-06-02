const axios = require('axios');

const API_BASE_URL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices';

async function getFlightPrices(source, destination, date) {
  const response = await axios.get(`${API_BASE_URL}/browsequotes/v1.0/IN/INR/en-IN/${source}/${destination}/${date}`, {
    headers: {
      'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
      'x-rapidapi-key': '<your-rapidapi-key>',
    },
  });

  // Process response to extract flight prices
  const quotes = response.data.Quotes;
  const carriers = response.data.Carriers;
  
  const prices = {};
  quotes.forEach(quote => {
    const { QuoteId, MinPrice, OutboundLeg } = quote;
    const { CarrierIds, DepartureDate } = OutboundLeg;
    const airline = carriers.find(carrier => carrier.CarrierId === CarrierIds[0]).Name;
    prices[airline] = `₹${MinPrice}`;
  });

  return prices;
}

// Example usage
async function main() {
  const prices = await getFlightPrices('DEL-sky', 'JAI-sky', '2023-04-15');
  console.log(prices); // { 'IndiGo': '₹1,650', 'SpiceJet': '₹2,798', 'AirAsia India': '₹4,259' }
}

main();