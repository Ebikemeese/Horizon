import { ID } from "node-appwrite";
import { account } from "../appwrite.config";
import { createAdminClient } from "../appwrite";
import { Query } from "appwrite";

const {
  VITE_APPWRITE_DATABASE_ID: DATABASE_ID,
  VITE_APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  VITE_APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID
} = import.meta.env;


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

export async function getAccountFullData(accountId: string) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/account/full-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({account_id: accountId})
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


