import { cn, formUrlQuery } from "@/lib/utils"
import { useNavigate, useSearchParams } from "react-router-dom"

const BankTabItem = ({ account }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Check if current tab matches the query param
  const isActive = searchParams.get("id") === account?.Bank?.account_id

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      key: "id",
      value: account?.Bank?.account_id,
      params: searchParams, // pass current params so you don’t lose others
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
