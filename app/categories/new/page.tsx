"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { addCategory, type ActionResult } from "@/app/lib/categories-actions";

const initialState: ActionResult = {};

export default function AddCategoryForm() {
    const [state, formAction, isPending] = useActionState(addCategory, initialState);

    return (
        <form
            action={formAction}
            className="flex items-start gap-2 rounded-lg border border-black/10 bg-white p-4"
        >
            <div className="flex-1">
                <input
                    name="name"
                    placeholder="New category name…"
                    className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-[#0F3D3E]"
                />
                {state.error && <p className="mt-1 text-xs text-red-600">{state.error}</p>}
                {state.success && (
                    <p className="mt-1 text-xs text-[#2E7D75]">Category added.</p>
                )}
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-md bg-[#0F3D3E] px-4 py-2 text-sm font-medium text-white hover:bg-[#0c3231] transition-colors disabled:opacity-50"
            >
                <Plus size={16} />
                {isPending ? "Adding…" : "Add"}
            </button>
        </form>
    );
}