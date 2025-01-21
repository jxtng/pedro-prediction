import { currentUser } from "@/lib/current-user";
import React from "react";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }

  if (user.role?.toLocaleLowerCase() !== "admin") {
    return <div>You be thief!</div>;
  }
  return <div>page</div>;
};

export default page;
