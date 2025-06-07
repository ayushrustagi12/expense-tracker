import React from "react";
import { AppSidebar } from "./AppSidebar";

// Legacy component - redirects to new AppSidebar for backward compatibility
export const Sidebar = () => {
  return <AppSidebar />;
};
