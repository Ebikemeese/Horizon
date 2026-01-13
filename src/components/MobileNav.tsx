import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import Footer from "./Footer"

const MobileNav = ({ user }: MobileNavProps) => {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  // Grab the id from the URL
  const selectedBankId = searchParams.get("id")

  // Helper to append ?id=... to all routes except home
  const withBankId = (route: string) => {
    if (route === "/") return route
    return selectedBankId ? `${route}?id=${selectedBankId}` : route
  }

  const sidebarLinks = [
    { imgURL: "/icons/home.svg", route: "/", label: "Home" },
    { imgURL: "/icons/dollar-circle.svg", route: "/my-banks", label: "My Banks" },
    { imgURL: "/icons/transaction.svg", route: "/transaction-history", label: "Transaction History" },
    { imgURL: "/icons/money-send.svg", route: "/payment-transfer", label: "Transfer Funds" },
    { imgURL: "/icons/connect-bank.svg", route: "/add-bank", label: "Add Bank" },
  ]

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <img
            src="/Horizon/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent side="left" className="border-none pt-3 pl-4">
          <Link to="/" className="gap-1 px-4 cursor-pointer flex items-center gap-2">
            <img src="/Horizon/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const fullRoute = withBankId(item.route)
                  const isActive =
                    pathname === item.route || pathname.startsWith(`${item.route}/`)

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        to={fullRoute}
                        key={item.label}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                      >
                        <img
                          src={item.imgURL}
                          alt={item.label}
                          className={cn({ "brightness-[3] invert-0": isActive })}
                          width={20}
                          height={20}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}

              </nav>
            </SheetClose>

            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
