import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BankTabItem from "./BankTabItem"
import BankInfo from "./BankInfo"

interface BankAccount {
  Bank?: {
    data?: {
      account?: {
        id?: string;
        balance?: number;
        account_number?: string;
        institution?: {
          name?: string;
        };
      };
    };
  };
  balance?: any;
  transactions?: any;
}

type RecentTransactionsProps = { 
    accounts: BankAccount[]; 
    selectedBankId: string | undefined; 
}

const RecentTransactions = ({ accounts, selectedBankId }: RecentTransactionsProps) => {
    
    
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="recent-transactions-label">
                        Recent Transactions
                    </h2>
                    <p className="header-box-subtext">
                        Click bank name to view recent transactions
                    </p>
                </div>
                <Link 
                    to={`/transaction-history/?id=${selectedBankId}`}
                    className="view-all-btn"    
                >
                    View all
                </Link>
            </header>

            <Tabs defaultValue={selectedBankId} className="h-full">
                <TabsList className="recent-transactions-tablist">
                    {accounts.map((account, index) => (
                        <TabsTrigger 
                            key={`${account.Bank?.data?.account?.id}-${index}`}
                            value={account.Bank?.data?.account?.id ?? ""}
                            className=" cursor-pointer"
                        >
                            <BankTabItem 
                                key={account.Bank?.data?.account?.id}
                                account={account}
                                selectedBankId={selectedBankId}
                            />
                        </TabsTrigger>
                    ))}
                </TabsList>
                {accounts.map((account) => (
                    <TabsContent
                        value={account.Bank?.data?.account?.id ?? ""}
                        key={account.Bank?.data?.account?.id}
                        className="space-y-4 flex-row"
                    >
                        <BankInfo 
                            account={account}
                            selectedBankId={selectedBankId}
                            type="full"
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    )
}

export default RecentTransactions