import { Search, UserCircleIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function Navbar() {
    return (
        <div className="ml-2 w-full">
            <div className="flex justify-between items-center">
                <div className="flex justify-center items-center border-2 rounded-full  md:w-4/12">
                <Input className="focus:border-none"/>
                <Search className="mx-2 text-gray-400"/>
                </div>
                <div className="sm:flex items-center">
                    <div className="sm:p-1"><UserCircleIcon className="w-8 h-8" /></div>
                    <div className="hidden sm:block">
                        <h3 className="text-base">John</h3>
                        <p className="text-sm">John@email.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}