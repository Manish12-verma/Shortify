import {Link, useNavigate} from "react-router-dom"
import {Button} from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut,LinkIcon} from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { logout } from "@/db/apiAuth";

const Header = () => {

    const navigate = useNavigate(); 
   const {user,fetchUser} = UrlState();

   const {loading,fn:fnLogOut}= useFetch(logout)
    
  return (
    <>
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
  <AvatarImage src={user?.user_metadata?.profile_pic} className ="object-contain" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
          </DropdownMenuTrigger >
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.user_metadata?.name || "User"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon className="mr-2 h-4 w-4"/>My Links</DropdownMenuItem>
            <DropdownMenuItem className="text-red-400">
              <LogOut className="mr-2 h-4 w-4"/>
                  <span onClick={()=>{
                      fnLogOut().then(()=>{
                        fetchUser();
                              navigate("/");
                      })
                      
                  }}>Logout</span>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )}
       </div>
    </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
      </>
  );
}

export default Header;
