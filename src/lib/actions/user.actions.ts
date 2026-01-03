import { ID } from "node-appwrite";
import { account } from "../appwrite.config";
import { 
  CountryCode, 
  type ProcessorTokenCreateRequest, 
  ProcessorTokenCreateRequestProcessorEnum, 
  Products 
} from "plaid";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { useQueryClient } from "@tanstack/react-query"
import { createAdminClient } from "../appwrite";
import { Query } from "appwrite";

const {
  VITE_APPWRITE_DATABASE_ID: DATABASE_ID,
  VITE_APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  VITE_APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID
} = import.meta.env;

export const getLoggedInUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

export const getUserMonoDataId = async () => {
  const { database } = await createAdminClient()

  try {
    // Get the logged-in account
    const acc = await account.get();

    // Fetch the corresponding user document from your users collection
    const userDoc = await database.getDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(), 
    );

    // Merge account info with custom fields
    return {
      ...acc,
      ...userDoc, // includes monoDataId and other custom fields
    };
  } catch (err) {
    console.error("Error fetching logged in user:", err);
    return null;
  }
};



export const signUp = async ({password, ...userData}: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  const { database } = await createAdminClient()

  const newUserAccount = await account.create(
    ID.unique(),
    email,
    password,
    `${firstName} ${lastName}`
  );

  if (!newUserAccount) throw new Error("Error creating user")

  await account.createEmailPasswordSession(email, password);

  const newUser = await database.createDocument(
    DATABASE_ID,
    USER_COLLECTION_ID,
    ID.unique(),
    {
      ...userData,
      userId: newUserAccount.$id,
    }
  )
  
  return newUser;
};

export const signIn = async (email: string, password: string) => {
  return await account.createEmailPasswordSession(email, password);
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};


export async function exchangeMonoCode({
  code,
  user,
}: {
  code: string;
  user: any;
}) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/exchange_mono_code/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, user }),
    });

    if (!response.ok) {
      throw new Error(`Failed to exchange code: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Mono access token response:", data);

    return data;
  } catch (error) {
    console.error("Error exchanging Mono code:", error);
    throw error;
  }
}

export const saveBankAccount = async (userId: string, monoData: any) => {
  const { database } = await createAdminClient()

  try {
    const response = await database.createDocument(
      DATABASE_ID,
      BANK_COLLECTION_ID,
      ID.unique(),
    
      {
        userId: userId, 
        monoBankId: monoData.id ?? "", 
      }
    );
    return response;
  } catch (error) {
    console.error("Error saving bank account:", error);
    throw error;
  }
};


export async function getAccountFullData(accountId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/account/${accountId}/full/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // If backend returned 400 or other error
      const errorData = await response.json();
      throw new Error(`Error fetching account data: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data; // { details, balance, transactions }
  } catch (error) {
    console.error("Failed to fetch account full data:", error);
    throw error;
  }
}

// Get all bank accounts for a given user
export const getUserBankAccounts = async (userId: string) => {
  const { database } = await createAdminClient();

  try {
    const response = await database.listDocuments(
      DATABASE_ID,
      BANK_COLLECTION_ID,
      [Query.equal("userId.userId", userId)]
    );

    return response.documents; // array of bank account docs
  } catch (error) {
    console.error("Error fetching user's bank accounts:", error);
    throw error;
  }
};

// If you only want the first monoAccountId (monoDataId)
export const getUserMonoDataIdFromBank = async (userId: string) => {
  const accounts = await getUserBankAccounts(userId);
  if (accounts.length === 0) {
    throw new Error("No bank accounts found for this user");
  }
  return accounts[0].monoAccountId; // or whichever field you saved
};





// export const updateUserMonoId = async (userId: string, monoDataId: string) => {
//   const { database } = await createAdminClient()

//   try {
//     const response = await database.updateDocument(
//       DATABASE_ID,
//       USER_COLLECTION_ID,
//       userId,
//       { monoDataId }
//     );
//     return response;
//   } catch (error) {
//     console.error("Error updating user with Mono ID:", error);
//     throw error;
//   }
// };



// export const createLinkToken = async (user: User) => {
//   try {
//     const tokenParams = {
//       user: {
//         client_user_id: user.$id
//       },
//       client_name: `${user.firstName} ${user.lastName}`,
//       products: ['auth'] as Products[],
//       language: 'en',
//       country_codes: ['NG'] as CountryCode[],
//     }

//     const response = await plaidClient.linkTokenCreate(tokenParams)

//     return parseStringify({ linkToken: response.data.link_token })

//   } catch (error) {
//     console.log(error)
//   }
// }

// export const createLinkToken = async (user: User) => {
//   console.log("User: ", user)
//   try {
//     const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/plaid/create-link-token/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: user.userId,
//         firstName: user.firstName,
//         lastName: user.lastName,
//       }),
//     })

//     const data = await response.json()
//     console.log('Link Token:', data.linkToken)
//     return data
//   } catch (error) {
//     console.error('Error creating link token:', error)
//   }
// }


// export const createBankAccount = async ({
//   userId,
//   bankId,
//   accountId,
//   accessToken,
//   fundingSourceUrl,
//   shareableId
//   } : createBankAccountProps) => {
//   try {
//     const { database } = await createAdminClient()
//     const bankAccount = await database.createDocument(
//       DATABASE_ID,
//       BANK_COLLECTION_ID,
//       ID.unique(),
//       {
//         userId,
//         bankId,
//         accountId,
//         accessToken,
//         fundingSourceUrl,
//         shareableId
//       }
//     )

//     return parseStringify(bankAccount)
//   } catch (error) {
    
//   }
// }

// export const exchangePublicToken = async ({
//   publicToken,
//   user
// }: exchangePublicTokenProps) => {
//   try {
//     // Exchange public token for access token and item ID
//     const response = await plaidClient.itemPublicTokenExchange({
//       public_token: publicToken
//     })

//     const accessToken = response.data.access_token;
//     const itemId = response.data.item_id;

//     // Get the account information from Plaid using the access token
//     const accountsResponse = await plaidClient.accountsGet({
//       access_token: accessToken
//     })

//     const accountData = accountsResponse.data.accounts[0]

//     // Create a processor token for Dwolla using the access token and account ID
//     const request: ProcessorTokenCreateRequest = {
//       access_token: accessToken,
//       account_id: accountData.account_id,
//       processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
//     }

//     // Generate processor token
//     const processorTokenResponse = await plaidClient.processorTokenCreate(request)
//     const processorToken = processorTokenResponse.data.processor_token

//     // Create a funding source URL for the account using the Dwolla customer Id, processor token, and bank name
//     // const fundingSourceUrl = await addFundingSource({
//     //   dwollaCustomerId: user.dwollaCustomerId,
//     //   processorToken,
//     //   bankName: accountData.name
//     // })

//     // If the funding source URL is not created, throw an error
//     if (!fundingSourceUrl) throw Error;

//     // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharable ID
//     await createBankAccount({
//       userId: user.$id,
//       bankId: itemId,
//       accountId: accountData.account_id,
//       accessToken,
//       fundingSourceUrl,
//       shareableId: encryptId(accountData.account_id)
//     })

//     // Revalidate the path to reflect the changes
//     const queryClient = useQueryClient();
//     queryClient.invalidateQueries({ queryKey: ['/']})

//     // Return a success message
//     return parseStringify({
//       publicTokenExchange: "complete"
//     })

//   } catch (error) {
//     console.log("An error occured while creating exchange token", error)
//   }
// } 

