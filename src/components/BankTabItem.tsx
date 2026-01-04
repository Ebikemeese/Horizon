import { cn, formUrlQuery } from "@/lib/utils"
import { useNavigate, useSearchParams } from "react-router-dom"

const BankTabItem = ({ account, selectedBankId }: any) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Check if current tab matches the query param
  const isActive = selectedBankId === account.Bank?.account_id

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      key: "id",
      value: account.Bank?.data?.account?.id,
      params: searchParams.toString(), // pass current params so you don’t lose others
    })
    navigate(newUrl)
  }

  return (
    <div
      onClick={handleBankChange}
      className={cn("banktab-item", {
        "border-blue-600": isActive,
      })}
    >
      <p
        className={cn(
          "text-16 line-clamp-1 flex-1 font-medium text-gray-500",
          { "text-blue-600": isActive }
        )}
      >
        {account?.Bank?.data?.account?.institution?.name}
      </p>
    </div>
  )
}

export default BankTabItem
