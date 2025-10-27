import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"


const MobileNav = ({ user }: MobileNavProps) => {

    const { pathname } = useLocation()

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <img 
                        src="/icons/hamburger.svg" 
                        width={30} height={30} 
                        alt="menu" 
                        className="cursor-pointer" 
                    />
                </SheetTrigger>

                <SheetContent 
                    side="left"
                    className="border-none pt-3 pl-4"
                >
                    <Link to="/" className="gap-1 px-4 cursor-pointer flex items-center gap-2">
                        <img 
                            src="/icons/logo.svg" 
                            width={34} 
                            height={34} 
                            alt="Horizon logo" 
                        />
    
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                    </Link>

                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((item) => {
                                    
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link 
                                                to={item.route} 
                                                key={item.label}
                                                className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient': isActive})}
                                            >
                                                <img 
                                                    src={item.imgURL} 
                                                    alt={item.label} 
                                                    className={cn({"brightness-[3] invert-0": isActive})}
                                                    width={20}
                                                    height={20}
                                                />
                                                <p className={cn("text-16 font-semibold text-black-2",  {"text-white": isActive})}>{item.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}

                                USER
                            </nav>
                        </SheetClose>

                        FOOTER
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav