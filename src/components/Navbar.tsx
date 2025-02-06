import React from 'react'
import Logo from "@/components/Logo";
import TodoSearchBox from "@/components/TodoSearchBox";
import {ModeToggle} from "@/components/ModeToggle";

const Navbar = () => {
    return (
        <nav className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4"
             role="navigation">
            <Logo/>
            <h2 className="text-2xl font-bold pb-2 text-emerald-700">My Awesome Todo Application</h2>
            <TodoSearchBox/>
            <ModeToggle />
        </nav>
    )
}
export default Navbar
