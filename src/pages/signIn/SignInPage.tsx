import React from "react";
// import styles from "./SignIn.module.css"
import { UserLayout } from "../../layouts";
import { SignInForm } from "./SignInForm"
export const SignInPage: React.FC = () => {
  return (
    <div>
      <UserLayout>
         <SignInForm />
      </UserLayout>
    </div>
  );
};
