"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import { sendInvitation } from "@/utils/api";

export default function CreateInvitationPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendInvitation(groupId, email);
      toast.success("Invitation sent successfully");
      router.back();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <IconArrowLeft className="mr-2" />
          Back
        </Button>
      </div>
      <div className="max-w-2xl mx-auto mt-32">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Invite Members</h1>
            <p className="text-gray-500 mt-2">
              Send an invitation to join your group
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter member's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Invitation
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
