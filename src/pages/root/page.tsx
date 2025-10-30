import HeaderBox from "@/components/HeaderBox"
import RightSideBar from "@/components/RightSideBar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { useEffect, useState } from "react"



const Home =  () => {
    const [loggedIn, setLoggedIn] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getLoggedInUser();
            setLoggedIn(user);
        };

        fetchUser();
    }, []);



    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox 
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name || "Guest"}
                        subtext="Access and manage your account and transactions efficiently."
                    />

                    <TotalBalanceBox 
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>

                RECENT TRANSACTIONS
            </div>

            {loggedIn && (
                <RightSideBar 
                    user={loggedIn}
                    transactions={[]}
                    banks={[{ currentBalance: 123.50 }, { currentBalance: 179.50 }]}
                />
            )}

        </section>
    )
}

export default Home