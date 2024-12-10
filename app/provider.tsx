// This line tells Next.js that this file is a client-side component.
"use client";

// Importing the `SessionProvider` from the `next-auth/react` package, which is responsible for managing authentication session context.
import { SessionProvider } from "next-auth/react";

// Defining the `Props` type for the `Provider` component. 
// The `children` prop represents the child components that will be wrapped by this provider. It's optional, as denoted by the `?`.
type Props = {
  children?: React.ReactNode;
};

// Defining the `Provider` component that wraps its children with the `SessionProvider`.
// The `children` prop represents any child components or elements that are passed into `Provider` when used in other parts of the app.
export const Provider = ({ children }: Props) => {
  // Return the `SessionProvider` component, which will give the authentication session context to the children components.
  return <SessionProvider>{children}</SessionProvider>;
};
