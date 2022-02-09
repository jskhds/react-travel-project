import React from "react";
import { UserLayout } from "../../layouts";
import { RegisterForm } from "./RegisterForm"
export const RegisterPage: React.FC = () => {
  return (
    <div>
      <UserLayout>
          {/* 用户注册表单 */}
          <RegisterForm />
      </UserLayout>
    </div>
  );
};
