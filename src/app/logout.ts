"use server";
import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";

export async function logout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}
	redirect("/login");
}
