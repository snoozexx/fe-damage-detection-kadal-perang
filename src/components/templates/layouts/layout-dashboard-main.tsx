import { LayoutNavbar } from "@/components/organisms/navbar/layout-navbar";
import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <LayoutNavbar />
      <main className="flex-1 w-full px-4">{children}</main>
    </div>
  );
};
