import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar"
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "../auth/sign-in/SignIn";



const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [loggedIn, setLoggedIn] = useState<any | null>(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getLoggedInUser();
            setLoggedIn(user);
        };

        fetchUser();
    }, []);
    
    if (!loggedIn) return (
        <SignIn />
    )
    
    return (
        <main className="flex h-screen w-full font-inter">
            <SideBar user={loggedIn}/>

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Link to="/">
                        <img 
                            src="/icons/logo.svg" 
                            width={30} 
                            height={30} 
                            alt="Horizon logo"
                        />
                    </Link>

                    <div className="">
                        <MobileNav 
                            user={loggedIn}
                        />
                    </div>
                </div>
            
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>

            
        </main>
    );
};

export default Layout