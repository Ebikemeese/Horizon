import { cn } from "@/lib/utils"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import Footer from "./Footer"

const SideBar = ({ user }: SiderbarProps) => {
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
          const fullRoute = withBankId(item.route)
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

          return (
            <Link
              to={fullRoute}
              key={item.label}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className="relative size-6">
                <img
                  src={item.imgURL}
                  alt={item.label}
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          )
        })}
      </nav>

      <Footer user={user} />
    </div>
  )
}

export default SideBar
