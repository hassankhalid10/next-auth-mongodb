"use client";
export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">This is the Contact Us Page</h1>
      <p>This page is protected and only visible to logged-in users.</p>
    </main>
  );
}


// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Contact() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   console.log("session status = "+status)

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (!session) {
//     router.push("/login");
//     return null;
//   }

//   console.log("User role:", session); // This will log 'user' or whatever role is set

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center">
//       <h1 className="text-xl">This is the Contact Us Page</h1>
//       <p>This page is protected and only visible to logged-in users.</p>
//     </main>
//   );
// }
