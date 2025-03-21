import { Invitation } from "@/types/invitation";

export async function fetchGroups() {
  const response = await fetch("/api/groups", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }

  return await response.json();
}

export async function fetchUserGroups() {
  const response = await fetch("/api/groups/user/groups", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user groups");
  }

  return await response.json();
}

export async function fetchGroupDetails(groupId: string) {
  const response = await fetch(`/api/groups/${groupId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch group details");
  }

  return await response.json();
}

export async function createGroup(name: string, description: string) {
  const response = await fetch("/api/groups/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return await response.json();
}

export async function fetchUser() {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
}

export async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

export async function sendInvitation(groupId: string, email: string) {
  const response = await fetch(`/api/groups/${groupId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return await response.json();
}

export async function fetchSentInvitations(): Promise<Invitation[]> {
  const response = await fetch("/api/invitations/sent", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch sent invitations");
  }

  return await response.json();
}
