import HomeLayout from "@/components/layouts/home/home-layout";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
