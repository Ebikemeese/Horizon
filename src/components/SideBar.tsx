import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"


const SideBar = ({ user }: SiderbarProps) => {

    const {pathname} = useLocation();

    return (
        <div className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link to="/" className="mb-12 cursor-pointer flex items-center gap-2">
                    <img 
                        src="/icons/logo.svg" 
                        width={34} 
                        height={34} 
                        alt="Horizon logo" 
                        className="size-[24px] max-xl:size-14"
                    />

                    <h1 className="sidebar-logo">Horizon</h1>
                </Link>

                {sidebarLinks.map((item) => {
                    
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                    return (
                        <Link 
                            to={item.route} 
                            key={item.label}
                            className={cn('sidebar-link', {'bg-bank-gradient': isActive})}
                        >
                            <div className="relative size-6">
                                <img 
                                    src={item.imgURL} 
                                    alt={item.label} 
                                    className={cn({"brightness-[3] invert-0": isActive})}
                                />
                            </div>
                            <p className={cn("sidebar-label",  {"!text-white": isActive})}>{item.label}</p>
                        </Link>
                    )
                })}

                USER
            </nav>

            FOOTER
        </div>
    )
}

export default SideBar