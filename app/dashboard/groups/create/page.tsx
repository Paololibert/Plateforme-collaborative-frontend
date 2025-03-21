"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconArrowLeft } from "@tabler/icons-react";
import { toast } from "sonner";
import { createGroup } from "@/utils/api";

export default function CreateGroupPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createGroup(name, description);
      toast.success("Group created successfully!");
      router.push("/dashboard/groups");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <IconArrowLeft className="mr-2" />
          Back
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 ">
          <div className="w-full max-w-lg">
            <Card>
              <CardHeader>
                <CardTitle>Create a new group</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Group Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        placeholder="Group Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating..." : "Create Group"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
