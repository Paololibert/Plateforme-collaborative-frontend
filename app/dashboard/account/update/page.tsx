"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchUser, updateUser } from "@/utils/api";
import { IconArrowLeft } from "@tabler/icons-react";

export default function UpdateAccountPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setFormData({
          name: userData.name,
          firstname: userData.firstname,
          email: userData.email,
          password: "",
        });
      } catch {
        toast.error("Failed to load user data");
        router.push("/dashboard");
      }
    };

    loadUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      toast.success("Profile updated successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
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
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="text-gray-500 mt-2">
              Update your personal information
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="firstname" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password (optional)"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Leave blank to keep current password
              </p>
            </div>
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
