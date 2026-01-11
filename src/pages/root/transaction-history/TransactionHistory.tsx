import HeaderBox from "@/components/HeaderBox"
import Loader from "@/components/Loader";
import { getAccountFullData } from "@/lib/actions/bank.actions";
import { formatAmount } from "@/lib/utils";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const TransactionHistory = () => {
  const [bankData, setBankData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 👈 loader state
  const [searchParams] = useSearchParams();
  const selectedBankId = searchParams.get("id");

  useEffect(() => {
    const getSelectedBank = async () => {
      if (!selectedBankId) {
        setLoading(false); // nothing to load
        return;
      }
      setLoading(true); // 👈 start loading
      try {
        const selectedBankData = await getAccountFullData(selectedBankId);
        setBankData(selectedBankData);
      } catch (error) {
        console.error("Error fetching user's selected bank data:", error);
      } finally {
        setLoading(false); // 👈 stop loading
      }
    };

    getSelectedBank();
  }, [selectedBankId]);

  const recentTransactions = bankData?.transactions?.data?.slice(0) || [];

  // Hardcoded color scheme
  const colors = {
    containerBg: "bg-gray-50",
    rowBg: "bg-white",
    badgeBg: "bg-blue-50",
    title: "text-blue-900",
    subText: "text-gray-600",
  };

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
    <div className={`transactions ${colors.containerBg} scrollbar-none p-6 rounded-xl`}>
      <div className="transactions-header">
        <HeaderBox 
          title="Transaction History"
          subtext="See your bank details and transactions"
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {bankData?.Bank?.data?.account?.institution?.name}
            </h2>

            <p className="text-14 text-blue-25">
              {bankData?.Bank?.data?.account?.name}
            </p>

            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● <span className="text-16">{bankData?.Bank?.data?.account?.account_number}</span> ●●●●
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(bankData?.Bank?.data?.account?.balance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
          {recentTransactions.map((tx: any, idx: number) => (
            <div key={idx} className={`flex items-center gap-2 w-full p-4 rounded-lg shadow-sm ${colors.rowBg}`}>
              <figure className={`flex-center h-fit rounded-full bg-blue-100 ${colors.badgeBg}`}>
                <img
                  src="/icons/connect-bank.svg"
                  width={20}
                  height={20}
                  alt="connect bank"
                  className="m-2 min-w-5"
                />
              </figure>

              <div className="flex flex-col justify-center gap-1 w-full">
                <div className="flex justify-between gap-8 w-full">
                  <h2 className={`text-16 line-clamp-1 font-bold ${colors.title}`}>
                    {tx.narration}
                  </h2>

                  <div className={`text-12 rounded-full px-3 py-1 font-medium ${colors.subText} ${colors.badgeBg}`}>
                    {tx.type}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className={`text-16 font-medium ${colors.subText}`}>
                    {formatAmount(tx.balance || 0)}
                  </div>

                  <div className={`text-12 rounded-full px-3 py-1 font-medium ${colors.subText} ${colors.badgeBg}`}>
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit", 
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory;
