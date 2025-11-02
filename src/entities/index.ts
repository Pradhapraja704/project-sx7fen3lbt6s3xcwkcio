import { superdevClient } from "@/lib/superdev/client";

export const Contact = superdevClient.entity("Contact");
export const Message = superdevClient.entity("Message");
export const User = superdevClient.auth;
