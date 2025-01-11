import React from 'react'
import Link from "next/link";
import Image from "next/image";
import todoLogo from "@/assets/images/checklist.png";

const Logo = () => {
    return (
        <Link href="/" className="pl-8">
            <Image src={todoLogo} alt="Logo" width={50} height={50} />
        </Link>
    )
}
export default Logo
