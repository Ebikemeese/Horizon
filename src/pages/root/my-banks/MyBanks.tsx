import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox"
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { getUserBankAccounts } from "@/lib/actions/bank.actions";
import { useSearchParams } from "react-router-dom";
import Loader from "@/components/Loader";

const MyBanks = () => {
    const [loggedIn, setLoggedIn] = useState<any | null>(null);
    const [bankData, setBankData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // 👈 loader state
    const [searchParams] = useSearchParams();
    const selectedBankId = searchParams.get("id");

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
                console.log("My banks user: ", user);

                // Step 1: Get all bank accounts for this user
                const accounts = await getUserBankAccounts(user.$id); 
                console.log("My Banks Accounts:", accounts);

                const monoIds = accounts.map((acc: any) => acc.monoBankId);
                console.log("MY BANKS ID's:", monoIds);

                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/accounts/full-data/`, { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ account_ids: monoIds }), 
                });

                const data = await response.json(); 
                setBankData(data.success);
                console.log("My Banks Full Bank Data:", data.success);
            } catch (err) {
                console.error("Error fetching user's bank accounts:", err);
            } finally {
                setLoading(false); // 👈 stop loading
            }
        };

        fetchUser();
    }, []);

    // 👇 Conditional rendering
    if (loading) {
        return (
            <section className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold">
                    <Loader />
                </p>
            </section>
        );
    }

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox 
                    title="My Bank Accounts"
                    subtext="Effortlessly manage your banking activities"
                />

                <div className="space-y-4">
                    <h2 className="header-2">Your cards</h2>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {bankData && bankData.map((banks) => (
                            <BankCard 
                                key={banks.Bank?.data?.account?.id}
                                account={{
                                    $id: banks.Bank?.data?.account?.id,
                                    bankName: banks.Bank?.data?.account?.institution?.name,
                                    accountNumber: banks.Bank?.data?.account?.account_number,
                                    currentBalance: banks.Bank?.data?.account?.balance || 0,
                                    name: banks.Bank?.data?.account?.institution?.name
                                }}
                                userName={loggedIn?.name}
                                showBalance={true}
                                selectedBankId={selectedBankId} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyBanks;
