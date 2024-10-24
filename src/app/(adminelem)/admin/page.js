"use client";
import { useSession } from "next-auth/react";

 // Add this line to make the component a client component

const AdminPanel = () => {
  const { data: session } = useSession();
  console.log(session)
  if (!session || !session.user.isAdmin) {
    return <p>Access Denied. Admins Only.</p>;
  }

  return (
    <div>
      <h1>Welcome to the Admin Panel, {session.user.email}</h1>
      {/* Admin content here */}
    </div>
  );
};

export default AdminPanel;
