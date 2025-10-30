import { logout } from "@/lib/actions/user.actions";
import { useNavigate } from "react-router-dom";

const Footer = ({ user, type = "desktop" }: FooterProps) => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            navigate("/sign-in");
        }
    };

    return (
        <footer className="footer">
            <div className={type === "mobile" ? "footer_name-mobile min-w-[40px]" : "footer_name"}>
                <p className="text-xl font-bold text-gray-700 ">
                    {user?.name[0] || ""}
                </p>
            </div>

            <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
                <h1 className="text-14 truncate font-normal text-gray-700 font-semibold">
                    {user?.name || ""}
                </h1>

                <p className="text-14 truncate font-normal text-gray-600">
                    {user?.email}
                </p>
            </div>

            <div className="footer_image">
                <span className={type === "mobile" ? "text-14 text-gray-600" : "hidden"}>logout &nbsp; </span>
                <img  
                    src="/icons/logout.svg" 
                    alt="logout" 
                    onClick={handleLogout}
                    aria-label="Logout"
                    title="Logout"
                />
            </div>
        </footer>
    )
}

export default Footer