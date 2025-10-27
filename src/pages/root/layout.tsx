import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar"


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const loggedIn = { firstName: 'John', lastName: 'Doe' }
    
    return (
        <main className="flex h-screen w-full font-inter">
            <SideBar user={loggedIn}/>

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <img 
                        src="/icons/logo.svg" 
                        width={30} 
                        height={30} 
                        alt="Horizon logo"
                    />

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