import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    // headers: {
    //   'PLAID-CLIENT-ID': import.meta.env.VITE_PLAID_CLIENT_ID,
    //   'PLAID-SECRET': import.meta.env.VITE_PLAID_SECRET,
    // }
  },
  clientId: import.meta.env.VITE_PLAID_CLIENT_ID,
  secret: import.meta.env.VITE_PLAID_SECRET,
})

export const plaidClient = new PlaidApi(configuration);