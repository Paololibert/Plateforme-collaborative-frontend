"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchSentInvitations } from "@/utils/api";
import Loading from "../../loading";
import { DataTableInvitations } from "@/components/data-table-invitations";
import { Invitation } from "@/types/invitation";

export default function SentInvitationsPage() {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        const data = await fetchSentInvitations();
        setInvitations(data);
        setLoading(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    loadInvitations();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Sent Invitations</h1>
      <DataTableInvitations data={invitations} />
    </div>
  );
}
