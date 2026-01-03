import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankTabItem from "./BankTabItem"

const RecentTransactions = ({ accounts }) => {
    
    
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">
                    Recent Transactions
                </h2>

                <Link 
                    to={`/transaction-history`}//  /?id=${}
                    className="view-all-btn"    
                >
                    View all
                </Link>
            </header>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account, index) => (
                        <TabsTrigger 
                            key={`${account?.Bank?.account_id}-${index}`}
                            value={account?.Bank?.account_id}
                        >
                            <BankTabItem 
                                key={account?.Bank?.account_id}
                                account={account}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
                
            </Tabs>
        </section>
    )
}

export default RecentTransactions