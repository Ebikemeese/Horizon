import { Link } from "react-router-dom"
import BankCard from "./BankCard"


const RightSideBar = ({ user, banks, setSelectedBankId, selectedBankId }: RightSidebarProps) => {
    // banks.forEach(bank => { 
    //     console.log("Bank id:", bank.$id); 
    //     console.log("Bank name:", bank.bankName); 
    // });
    return (
        <aside className="right-sidebar scrollbar-none">
            <section className="hidden xl:flex flex-col pb-8">
                <div className="h-[120px] w-full bg-[url('/icons/gradient-mesh.svg')] bg-cover bg-no-repeat" />

                <div className="profile">
                    <div className="profile-img">
                        <span className="text-5xl font-bold text-blue-500">{user.name[0]}</span>
                    </div>

                    <div className="profile-details">
                        <h1 className="profile-name">
                            {user.name}
                        </h1>

                        <p className="profile-email">
                            {user.email}
                        </p>
                    </div>
                </div>
            </section>

            <section className="banks">
                <div className="flex w-full justify-between">
                    <h2 className="header-2">My Banks</h2>

                    <Link to="/add-bank" className="flex gap-2">
                        <img 
                            src="/icons/plus.svg" 
                            alt="plus" 
                            width={20} 
                            height={20} 
                        />

                        <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
                    </Link>
                </div>

                {banks?.length > 0 && (
                    <div className="grid grid-cols-2 xl:grid-cols-1 max-sm:grid-cols-1 min-md:grid-cols-2 gap-5 mt-4">
                    {banks.map((bank, i) => (
                        <BankCard
                            key={bank.$id || i}
                            account={bank}
                            userName={user.name}
                            showBalance={true}
                            onSelect={setSelectedBankId}
                            selectedBankId={selectedBankId}
                            // isActive={selectedBankId === bank.$id} 
                        />
                    ))}
                    </div>
                )}

            </section>
        </aside>
    )
}

export default RightSideBar