import { ID } from "node-appwrite";
import { account } from "../appwrite.config";

export const getLoggedInUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};


export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  const newUser = await account.create(
    ID.unique(),
    email,
    password,
    `${firstName} ${lastName}`
  );

  await account.createEmailPasswordSession(email, password);

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





































// import { ID } from "node-appwrite";
// import { createAdminClient, createSessionClient } from "../appwrite";
// import { parseStringify } from "../utils";
// import express, { type Request } from "express";

// // const app = express();

// export const signIn = async () => {
//   try {

//   } catch (error) {
//     console.error("Error", error)
//   }
// }

// export const signUp = async (userData: SignUpParams, res: express.Response) => {
//   const { email, password, firstName, lastName } = userData;
//   try {
//     // Create a user account

//     const { account } = await createAdminClient();

//     const newUserAccount = await account.create({
//       userId: ID.unique(),
//       email: email,
//       password: password,
//       name: `${firstName} ${lastName}`
//     });

//     const session = await account.createEmailPasswordSession({
//       email,
//       password
//     });

//     res.cookie("appwrite-session", session.secret, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//     });

//     return parseStringify(newUserAccount)

//   } catch (error) {
//     console.error("Error", error)
//   }
// }

// export async function getLoggedInUser(req: Request) {
//   try {
//     const { account } = await createSessionClient(req);
//     return await account.get();
//   } catch (error) {
//     return null;
//   }
// }
