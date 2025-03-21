"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTableMembers } from "@/components/data-table-members";
import Loading from "../../loading";
import { fetchGroupDetails, fetchUser } from "@/utils/api";
import { IconArrowLeft, IconUserPlus } from "@tabler/icons-react";

interface User {
  id: string;
  name: string;
  firstname: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdBy: User; // Changer le type pour inclure tous les champs requis
}

export default function GroupDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<Group | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;

  useEffect(() => {
    const loadGroupDetails = async () => {
      try {
        const data = await fetchGroupDetails(groupId);
        console.log("Group data:", data); // Log the group data
        setGroup(data);
        setLoading(false);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    const loadCurrentUser = async () => {
      try {
        const user = await fetchUser();
        setCurrentUser(user);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    };

    loadGroupDetails();
    loadCurrentUser();
  }, [groupId]);

  if (loading) {
    return <Loading />;
  }

  if (!group || !currentUser) {
    return <div>Error loading group details</div>;
  }

  console.log("Members data:", group.members); // Log the members data

  const isAdmin = currentUser.id === group.createdBy.id;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <IconArrowLeft className="mr-2" />
          Back
        </Button>
        {isAdmin && (
          <Button
            variant="default"
            onClick={() =>
              router.push(`/dashboard/groups/${groupId}/invitations/create`)
            }
          >
            <IconUserPlus className="mr-2" />
            Invite Members
          </Button>
        )}
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{group.name}</h1>
      </div>
      <div className="overflow-x-auto">
        <DataTableMembers
          data={group.members}
          groupId={groupId}
          createdById={group.createdBy.id}
          createdBy={group.createdBy}
          currentUserId={currentUser.id} // maintenant currentUser est garanti non-null
        />
      </div>
    </div>
  );
}
