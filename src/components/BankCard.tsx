import { formatAmount } from "@/lib/utils"
import { Link } from "react-router-dom"


const BankCard = ({ account, userName, showBalance, onSelect, selectedBankId}: CreditCardProps) => {  
    // console.log("b id: ", account.$id)
    const isActive = selectedBankId === account.$id;
    
    return (
        <div className="flex flex-col">
            <button 
                onClick={() => onSelect(account.$id)} 
                // className="bank-card cursor-pointer"
                className={`bank-card cursor-pointer ${isActive ? "ring-2 ring-blue-500" : ""}`}
            >
                <div className="bank-card_content">
                    <div>
                        <h1 className="text-16 font-semibold text-white">
                            {account.name || userName}
                        </h1>
                        
                        <p className="font-ibm-plex-serif font-black text-white">
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>

                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h1 className="text-12 font-semibold text-white">
                                {account.bankName}
                            </h1>

                            <h2 className="text-12 font-semibold text-white">
                                ●● / ●●
                            </h2>
                        </div>

                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            ●●●● <span className="text-16">{account.accountNumber}</span> ●●●●
                        </p>
                    </article>
                </div>
            

            <div className="bank-card-Icon flex flex-col gap-27 ml-5">
                <img 
                    src="/icons/Paypass.svg" 
                    width={20} 
                    height={24}
                    alt="pay" 
                    className="pt-4"
                />

                <img 
                    src="/icons/mastercard.svg" 
                    width={45}
                    height={32}
                    alt="mastercard" 
                />
            </div>

            <img 
                src="/icons/lines.png" 
                width={316}
                height={190}
                alt="lines"
                className="absolute top-0 left-0"
            />
            </button>

            {/* Copy card numbers */}
        </div>
        
    )
}

export default BankCard