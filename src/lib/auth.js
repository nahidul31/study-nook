import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URI);
const db = client.db(process.env.CLIENT_DB);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  experimental: { joins: true },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
