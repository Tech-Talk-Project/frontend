import React from "react";
import { v4 as uuidv4 } from "uuid";
import UserCard from "./UserCard";

export default function UsersGrid({ users }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
      {users.map((page) =>
        page.data.map((user) => <UserCard key={uuidv4()} user={user} />)
      )}
    </ul>
  );
}
