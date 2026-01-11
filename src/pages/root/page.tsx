import HeaderBox from "@/components/HeaderBox"
import RightSideBar from "@/components/RightSideBar"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { useEffect, useState } from "react"
import { getAccountFullData, getUserBankAccounts } from "@/lib/actions/bank.actions"
import RecentTransactions from "@/components/RecentTransactions"
import { useSearchParams, useNavigate } from "react-router-dom"
import { formUrlQuery } from "@/lib/utils"
import Loader from "@/components/Loader"

const Home = () => {
    const [loggedIn, setLoggedIn] = useState<any | null>(null);
    const [bankData, setBankData] = useState<any[]>([]);
    const [selectedBank, setSelectedBank] = useState<any | null>(null);
    const [selectedBankId, setSelectedBankId] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // 👈 loader state
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (!selectedBankId) return;

        const newUrl = formUrlQuery({
            key: "id",
            value: selectedBankId,
            params: searchParams.toString(),
        });

        navigate(newUrl, { replace: true }); 
    }, [selectedBankId, navigate, searchParams]);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // 👈 start loading
            try {
                const user = await getLoggedInUser();
                if (!user?.$id) {
                    setLoading(false);
                    return;
                }

                setLoggedIn(user);

                const accounts = await getUserBankAccounts(user.$id); 
                const monoIds = accounts.map((acc: any) => acc.monoBankId);

                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/accounts/full-data/`, { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ account_ids: monoIds }), 
                });

                const data = await response.json(); 
                setBankData(data.success);
            } catch (err) {
                console.error("Error fetching user's bank accounts:", err);
            } finally {
                setLoading(false); // 👈 stop loading
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const getSelectedBank = async () => {
            if (!selectedBankId) return;
            try {
                const selectedBankData = await getAccountFullData(selectedBankId);
                setSelectedBank(selectedBankData);
            } catch (error) {
                console.error("Error fetching user's selected bank data:", error);
            }
        };

        getSelectedBank();
    }, [selectedBankId]);

    useEffect(() => {
        if (bankData.length > 0 && !selectedBankId) {
            setSelectedBank(bankData[0]);
            setSelectedBankId(bankData[0].Bank?.data?.account?.id);
        }
    }, [bankData]);

    // 👇 Conditional rendering
    if (loading) {
        return (
            <section className="home flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">
                    <Loader />
                </p>
            </section>
        );
    }

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
