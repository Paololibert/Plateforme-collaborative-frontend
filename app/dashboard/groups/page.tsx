"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTableGroups } from "@/components/data-table-groups";
import { toast } from "sonner";
import Loading from "../loading";
import { fetchUserGroups, fetchUser } from "@/utils/api";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function GroupsPage() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserAndGroups = async () => {
      try {
        const user = await fetchUser();
        setCurrentUser(user);
        const data = await fetchUserGroups();
        setGroups(data);
        setLoading(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    loadUserAndGroups();
  }, []);

  if (loading || !currentUser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Groups</h1>
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/groups/create")}
        >
          Create New Group
        </Button>
      </div>
      <DataTableGroups data={groups} currentUserId={currentUser.id} />
    </div>
  );
}
