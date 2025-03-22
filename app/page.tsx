"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { fetchUser } from "@/utils/api";
import Loading from "./loading";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await fetchUser();
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);


    if (loading ) {
      return <Loading />;
    }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 w-full">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto px-4">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Platform Collaborative
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Join our platform to collaborate with teams, manage groups, and
              work together efficiently.
            </p>
            <div className="flex gap-4">
              {isLoggedIn ? (
                <Button asChild size="lg">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/register">Create Account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 space-y-6 py-8 md:py-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our platform offers powerful collaboration tools to enhance your
              team&apos;s productivity.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {features.map(({ title, description }) => (
              <div
                key={title}
                className="relative overflow-hidden rounded-lg border bg-background/60 backdrop-blur-sm p-2 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="w-full py-6 md:px-8 md:py-0 border-t bg-background/60 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js and shadcn/ui.
          </p>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/Paololibert" target="_blank">
              <IconBrandGithub className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Group Management",
    description:
      "Create and manage teams effortlessly with advanced group features.",
  },
  {
    title: "Real-time Collaboration",
    description: "Work together in real-time with your team members.",
  },
  {
    title: "Secure Platform",
    description: "Your data is protected with enterprise-grade security.",
  },
  {
    title: "Invitation System",
    description: "Easily invite new members to join your groups.",
  },
  {
    title: "User Management",
    description: "Manage user roles and permissions with ease.",
  },
  {
    title: "Modern Interface",
    description: "Clean and intuitive interface for the best user experience.",
  },
];
