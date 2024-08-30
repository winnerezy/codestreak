'use client'

import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserAccount = ({ user }: { user: User | null }) => {
  return (
    <div className="dropdown dropdown-end mt-4">
      <div tabIndex={0} role="button" className="m-1">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
            {/* <Image
              src={user?.avatar!}
              width={100}
              height={100}
              alt={user?.username!}
            /> */}
          </div>
        </div>
      </div>
      {/* <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/profile/settings"}>Settings</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default UserAccount;
