import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox"
import { getLoggedInUser, getUserBankAccounts } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MyBanks = () => {

    const [loggedIn, setLoggedIn] = useState<any | null>(null);
    const [bankData, setBankData] = useState<any[]>([]);
    const [searchParams] = useSearchParams()
    const selectedBankId = searchParams.get("id")


    useEffect(() => {
            const fetchUser = async () => {
                const user = await getLoggedInUser();
                
                if (!user?.$id) return; // exit early if undefined
                await getUserBankAccounts(user.$id); // now TS knows it's a string
    
                setLoggedIn(user);
                console.log("My banks user: ", user);
    
                try {
                    // Step 1: Get all bank accounts for this user
                    const accounts = await getUserBankAccounts(user?.$id); 
                    console.log("My Banks Accounts:", accounts);
    
                    const monoIds = accounts.map((acc: any) => acc.monoBankId);
                    console.log("MY BANKS ID's:", monoIds)
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/mono/accounts/full-data/`, { 
                        method: "POST", 
                        headers: { 
                            "Content-Type": "application/json", 
                        }, 
                        body: JSON.stringify({ account_ids: monoIds }), 
                    });
    
                    const data = await response.json(); 
    
                    setBankData(data.success)
                    console.log("My Banks Full Bank Data:", bankData);
                    // console.log("Balance:", bankData[0].Bank.data.account.balance)
                } catch (err) {
                    console.error("Error fetching user's bank accounts:", err);
                }
            };
    
            fetchUser();
        }, []);

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox 
                    title="My Bank Accounts"
                    subtext="Effortlessly manage your banking activities"
                />

                <div className="space-y-4">
                    <h2 className="header-2">
                        Your cards
                    </h2>

                    <div className="flex flex-wrap gap-6">
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
                                userName={loggedIn.name}
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

export default MyBanks