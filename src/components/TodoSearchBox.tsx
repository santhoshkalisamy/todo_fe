import React from 'react'
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";

const TodoSearchBox = () => {
    return (
        <div className="relative hidden md:flex items-center justify-center gap-5">
            <SearchIcon className="text-gray-400 absolute left-3 text-2xl" />
            <Input placeholder="Search..." className="rounded-lg py-2 pl-10 border border-emerald-500 focus:bg-slate-100 focus:outline-amber-500 " />
        </div>

    )
}
export default TodoSearchBox
