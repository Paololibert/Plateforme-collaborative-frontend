"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Loading from "./loading";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        setLoading(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"  
        );
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
