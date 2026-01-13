import { ID } from "node-appwrite";
import { account } from "../appwrite.config";
import { createAdminClient } from "../appwrite";
import { Query } from "appwrite";

const {
  VITE_APPWRITE_DATABASE_ID: DATABASE_ID,
  VITE_APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  // VITE_APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID
} = import.meta.env;

export const getLoggedInUser = async () => {
  try {
    return await account.get();
  } catch {
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



/**
 * Fetch a user document from the database by the userId field.
 */
export const getUserById = async (userId: string) => {
  const { database } = await createAdminClient();

  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      USER_COLLECTION_ID,
      [Query.equal("userId", userId)] // assumes you saved account.$id in a "userId" field
    );


    return result.documents[0];
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return null;
  }
};

