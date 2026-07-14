import { logout } from "@/app/login/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
      >
        Uitloggen
      </button>
    </form>
  );
}