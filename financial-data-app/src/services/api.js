import axios from 'axios';

const API_KEY = '44hMPNMuRV329XinptyPEndULkQGfXDl';
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export const fetchIncomeStatements = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/income-statement/AAPL?period=annual&apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching income statements:', error);
    throw error;
  }
};
