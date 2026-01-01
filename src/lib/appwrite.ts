
import { Client, Account, Databases, Users } from "node-appwrite";
import cookie from "cookie";
import type { Request } from "express";


export async function createSessionClient(req: Request) {
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PUBLIC_APPWRITE_PROJECT);

    const cookies = cookie.parse(req.headers.cookie || "");
    const session = cookies["appwrite-session"];
    if (!session || !session) {
      throw new Error("No session");
    }

    client.setSession(session);

    return {
      get account() {
        return new Account(client);
      },
    };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PUBLIC_APPWRITE_PROJECT)
    .setKey(import.meta.env.VITE_APPWRITE_SECRET);

  return {
    get account() {
      return new Account(client);
    },

    get database() {
      return new Databases(client);
    },

    get user() {
      return new Users(client);
    }
  };
}
