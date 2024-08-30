"use client";

import { handleSignIn } from "@/utils/actions";
import { FaGithub } from "react-icons/fa";

const SignIn = () => {
  return (
    <div className="flex flex-col size-[400px] gap-4 bg-primary shadow-sm rounded-2xl p-6 place-items-center justify-center">
      <h4 className="text-primary-content text-2xl font-bold">
        Sign In To CodeStreak
      </h4>
      <button className="btn w-full space-x-4" onClick={() => handleSignIn()}>
        <FaGithub size={30} />
        Sign In With Github
      </button>
    </div>
  );
};

export default SignIn;
