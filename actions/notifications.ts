"use server";

import { Notification } from "@prisma/client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api = `${baseUrl}/api/notifications`;

export async function getAllNotifications() {
  try {
    const res = await fetch(api, { cache: "no-store" });
    const notifications = await res.json();
    return notifications.data as Notification[];
  } catch (error) {
    return [];
  }
}

export async function updateNotificationStatusById(id: string) {
  const api = `${baseUrl}/api/notifications/${id}`;
  try {
    await fetch(api, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
