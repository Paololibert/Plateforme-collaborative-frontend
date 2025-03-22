"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DataTableGroups } from "@/components/data-table-groups";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import Loading from "./loading";
import { fetchUser, fetchUserGroups } from "@/utils/api";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Page() {
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
  }, [router]);

  if (loading || !currentUser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Groups</h1>
        <Button onClick={() => router.push("/dashboard/groups/create")}>
          <IconPlus className="mr-2" />
          Create New Group
        </Button>
      </div>
      <DataTableGroups data={groups} currentUserId={currentUser.id} />
    </div>
  );
}
