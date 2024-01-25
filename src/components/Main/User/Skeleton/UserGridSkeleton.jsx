import React from "react";
import UserCardSkeleton from "./UserCardSkeleton";

export default function UserGridSkeleton() {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
      {Array.from({ length: 20 }, () => 0).map((item) => (
        <UserCardSkeleton />
      ))}
    </ul>
  );
}
