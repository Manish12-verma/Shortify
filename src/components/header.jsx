import {Link, useNavigate} from "react-router-dom"
import {Button} from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut,LinkIcon} from "lucide-react";

const Header = () => {

    const navigate = useNavigate(); 
    const user = true;  //dummy user
  return (
    <nav className="py-4 flex justify-between items-center">
       <Link to="/">
          <img src="./shortify.png" className="h-16" alt="logo not found" />
       </Link>

       <div>
        {!user ?
        <Button onClick={()=> navigate("/auth")}>Login</Button>
        :( 
          <DropdownMenu>
          <DropdownMenuTrigger  className="w-10  rounded-full overflow-hidden">
          <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
          </DropdownMenuTrigger >
          <DropdownMenuContent>
            <DropdownMenuLabel>Manish Verma</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon className="mr-2 h-4 w-4"/>              My Links</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">
              <LogOut className="mr-2 h-4 w-4"/>
                  <span>Logout</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )}
        
       </div>
    </nav>
  );
}

export default Header;
