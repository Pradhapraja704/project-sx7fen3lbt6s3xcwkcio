import { superdevClient } from "@/lib/superdev/client";

export const Message = superdevClient.entity("Message");
export const User = superdevClient.auth;
