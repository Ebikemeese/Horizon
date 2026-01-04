import HeaderBox from "@/components/HeaderBox"
import RightSideBar from "@/components/RightSideBar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { getLoggedInUser, getAccountFullData, getUserBankAccounts } from "@/lib/actions/user.actions"//getUserMonoDataId
import { useEffect, useState } from "react"
import RecentTransactions from "@/components/RecentTransactions"


const Home = () => {
    const [loggedIn, setLoggedIn] = useState<any | null>(null);
    const [bankData, setBankData] = useState<any[]>([]);
    const [selectedBank, setSelectedBank] = useState<any | null>(null);
    const [selectedBankId, setSelectedBankId] = useState<any | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            const user = await getLoggedInUser();
            
            if (!user?.$id) return; // exit early if undefined
            await getUserBankAccounts(user.$id); // now TS knows it's a string

            setLoggedIn(user);
            console.log("Homepage user", user);

            try {
                // Step 1: Get all bank accounts for this user
                const accounts = await getUserBankAccounts(user?.$id); 
                console.log("User Bank Accounts:", accounts);

                const monoIds = accounts.map((acc: any) => acc.monoBankId);
                console.log("MONO ID's:", monoIds)
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/accounts/full-data/`, { 
                    method: "POST", 
                    headers: { 
                        "Content-Type": "application/json", 
                    }, 
                    body: JSON.stringify({ account_ids: monoIds }), 
                });

                const data = await response.json(); 

                setBankData(data.success)
                console.log("Full Bank Data:", bankData);
                // console.log("Balance:", bankData[0].Bank.data.account.balance)
            } catch (err) {
                console.error("Error fetching user's bank accounts:", err);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const getSelectedBank = async () => {
            if (!selectedBankId) return; // guard clause
            try {
                const selectedBankData = await getAccountFullData(selectedBankId);
                setSelectedBank(selectedBankData);
                console.log("Selected Bank Data", selectedBankData);
            } catch (error) {
                console.error("Error fetching user's selected bank data:", error);
            }
        };

        getSelectedBank();
    }, [selectedBankId]); // add dependency

    

    useEffect(() => {
        if (bankData.length > 0 && !selectedBankId) {
            setSelectedBank(bankData[0]); // default to first
            setSelectedBankId(bankData[0].Bank?.data?.account?.id)
        }
    }, [bankData]);

    return (
        <section className="home scrollbar-none">
            <div className="home-content scrollbar-none">
                <header className="home-header">
                    <HeaderBox 
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name || "Guest"}
                        subtext="Access and manage your account and transactions efficiently."
                    />

                    <TotalBalanceBox 
                        accounts={bankData.map(acc => acc.Bank?.data?.account?.balance || 0)}
                        totalBanks={bankData.length}
                        // totalCurrentBalance={bankData[0]?.Bank?.data?.account?.balance || 0}
                        totalCurrentBalance={selectedBank?.Bank?.data?.account?.balance || 0}
                    />
                </header>

                <RecentTransactions 
                    accounts={bankData}
                    selectedBankId={selectedBankId}
                />
            </div>

            {loggedIn && (
                <RightSideBar
                    user={loggedIn}
                    // transactions={[]}
                    banks={bankData.map(acc => ({
                        $id: acc.Bank?.data?.account?.id,
                        bankName: acc.Bank?.data?.account?.institution?.name,
                        accountNumber: acc.Bank?.data?.account?.account_number,
                        currentBalance: acc.Bank?.data?.account?.balance || 0,
                        name: acc.Bank?.data?.account?.institution?.name
                    }))}
                    setSelectedBankId={setSelectedBankId}
                    selectedBankId={selectedBankId}  
                />

            )}

        </section>
    )
}

export default Home