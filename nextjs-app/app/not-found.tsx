import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/"); // Automatically send users to the homepage
  return null; // Prevent rendering anything
}