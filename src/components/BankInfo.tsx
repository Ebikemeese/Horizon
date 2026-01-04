import { useSearchParams, useNavigate } from "react-router-dom";
import { cn, formUrlQuery, formatAmount, getAccountTypeColors } from "@/lib/utils";

const BankInfo = ({ account, selectedBankId, type }: any) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isActive = selectedBankId === account.Bank?.data?.account?.id;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account.Bank?.data?.account?.id,
    });
    navigate(newUrl);
  };

  const colors = getAccountTypeColors(account?.type as AccountTypes);

  // Slice the first 4 transactions
  const recentTransactions = account.transactions?.data?.slice(0, 4) || [];

  return (
    <div
      onClick={handleBankChange}
      className={cn(`bank-info ${colors.bg}`, {
        "shadow-sm border-blue-700": type === "card" && isActive,
        "rounded-xl": type === "card",
        "hover:shadow-sm cursor-pointer": type === "card",
      })}
    >
      {/* Row container for transactions */}
      <div className="flex flex-col gap-4 w-full">
        {recentTransactions.map((tx: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 w-full">
            <figure className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}>
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
                <h2 className={`text-16 line-clamp-1 font-bold text-blue-900 ${colors.title}`}>
                  {tx.narration}
                </h2>

                {type === "full" && (
                  <div
                    className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
                  >
                    {tx.type}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between">
                <div className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
                  {formatAmount(tx.balance || 0)}
                </div>

                <div
                    className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText}`}
                  >
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
      </div>
    </div>
  );
};

export default BankInfo;
