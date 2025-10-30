// lib/appwrite.config.ts
import { Client, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PUBLIC_APPWRITE_PROJECT);

export const account = new Account(client);
