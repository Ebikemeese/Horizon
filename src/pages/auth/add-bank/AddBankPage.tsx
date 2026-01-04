// src/pages/AddBankPage.tsx
import Layout from "../Layout"
import MonoLink from "../../../components/MonoLink"
import { getLoggedInUser, getUserById } from "@/lib/actions/user.actions"
import { useState, useEffect } from "react"

const AddBankPage = () => {
  const [loggedIn, setLoggedIn] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getLoggedInUser();
      const user = await getUserById(userData.$id)
      setLoggedIn(user);
    //   console.log("Add bank user: ", user)
    };
    fetchUser();
  }, []);

  if (!loggedIn) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Loading user...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full scrollbar-none">
        {/* Profile Section */}
        <section className="pb-8">
          <div className="h-[120px] w-full bg-[url('/icons/gradient-mesh.svg')] bg-cover bg-no-repeat rounded-lg" />
          
          <div className="profile flex flex-col items-center mt-6">
            <div className="profile-img flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
              <span className="text-5xl font-bold text-blue-500">
                {loggedIn.firstName[0]}
              </span>
            </div>
            <div className="profile-details mt-4 text-center">
              <h1 className="profile-name text-xl font-semibold">
                {loggedIn.firstName} {loggedIn.lastName}
              </h1>
              <p className="profile-email text-gray-600">{loggedIn.email}</p>
            </div>
          </div>
        </section>

        {/* Link Account Section */}
        <header className="flex flex-col items-center gap-5">
          <div className="flex flex-col gap-1 md:gap-3 text-center">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-500">
              Link Account
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Link more accounts?
            </p>
          </div>
          <MonoLink user={loggedIn} variant="ghost" />
        </header>
      </div>
    </Layout>
  );
};

export default AddBankPage;
