import { connectDB } from "@/lib/mongodb";  // Imports the function to establish a connection to MongoDB from the 'mongodb' module
import User from "@/models/User";  // Imports the User model for interacting with the 'users' collection in MongoDB
import type { NextAuthOptions } from "next-auth";  // Imports type definitions for NextAuth.js options to ensure proper type checking
import credentials from "next-auth/providers/credentials";  // Imports the credentials provider from NextAuth.js for authentication via email and password
import bcrypt from "bcryptjs";  // Imports bcryptjs to handle password hashing and comparison securely

// The configuration object for NextAuth.js, specifying the authentication strategy and providers.
export const authOptions: NextAuthOptions  = {
    // List of authentication providers used by NextAuth
    providers: [
      // Configuration for using credentials (email/password) as a provider for authentication
      credentials({
        name: "Credentials",  // The name displayed for this authentication provider
        id: "credentials",  // Unique identifier for this provider
        credentials: {
          // Defining the fields that users will provide for authentication
          email: { label: "Email", type: "text" },  // Email field with type 'text'
          password: { label: "Password", type: "password" },  // Password field with type 'password'
        },
        // The authorize function is responsible for authenticating the user
        async authorize(credentials) {
            await connectDB();  // Ensures a connection to MongoDB is established before checking user credentials

            // Fetches the user from the database by the email provided in the credentials
            const user = await User.findOne({
                email: credentials?.email,  // Using the email from credentials to find the user
            }).select("+password");  // Select the password field explicitly (since it is usually excluded for security reasons)

            if (!user) throw new Error("Wrong Email");  // If no user is found, throw an error indicating the email is incorrect

            // Compares the provided password with the stored password hash in the database
            const passwordMatch = await bcrypt.compare(
                credentials!.password,  // The password from the credentials input
                user.password  // The hashed password stored in the database
            );

            if (!passwordMatch) throw new Error("Wrong Password");  // If the passwords don't match, throw an error indicating the password is incorrect

            return user;  // If authentication is successful, return the user object (to store user session data)
        },
      }),
    ],
    // Configures the session strategy to use JWT (JSON Web Tokens) for storing session data
    session: {
      strategy: "jwt",  // Specifies that JWT should be used for handling sessions instead of a database session
    },
    callbacks: {
      // Add user role to JWT
      async jwt({ token, user }) {
        if (user) {
          console.log(user)
          token.userrole = user.role || "user"; // Assuming 'role' exists on the user object
          token.test = 1;  // my custom session value
        }
        return token;
      },
      // Add user role to the session
      async session({ session, token }) {
        if (token.userrole) {
          session.userrole = token.userrole; // Adding userrole to session object
          session.test = 1;   // my custom session value
        }
        return session;
      },
    },
  };
