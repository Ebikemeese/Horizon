// src/components/MonoLink.tsx
import { Button } from "./ui/button";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Connect from "@mono.co/connect.js";
import { exchangeMonoCode, saveBankAccount } from "@/lib/actions/user.actions";

interface MonoLinkProps {
  user: User;
  variant: "primary" | "ghost" | "default";
}

const MonoLink: React.FC<MonoLinkProps> = ({ user, variant }) => {
  const navigate = useNavigate();
  
  // Create a single Connect instance per mount
  const connect = useMemo(() => {
    
    return new Connect({
      
      key: import.meta.env.VITE_MONO_PUBLIC_KEY!,
      // scope: "auth", // optional; defaults to auth if omitted per docs
      onSuccess: async (data: { code: string }) => {
        try {
          const monoData = await exchangeMonoCode({ code: data.code, user });
          // console.log("Mono id", monoData.data)
          // console.log("MonoLink userid: ", user)
          await saveBankAccount(user.$id, monoData.data);
          navigate("/");
        } catch (error) {
          console.error("Error linking bank:", error);
        }
        
      },
      onClose: () => {
        console.log("Mono widget closed");
      },
      onLoad: () => {
        console.log("Mono widget loaded");
      },
      // onEvent: (eventName, data) => console.log(eventName, data), // optional
    });
  }, [navigate, user]);

  const openMono = () => {
    // Load widget into DOM, then open it
    connect.setup(); // you can pass setupConfig to jump to an institution login
    connect.open();
  };

  return (
    <>
      {variant === "ghost" ? (
        <Button
          className={variant === "ghost" ? "cursor-pointer text-white bg-primary hover:bg-secondary hover:text-primary" : ""}
          onClick={openMono}
          variant="ghost"
        >
          <img src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24}/>
          <p className="text-[16] font-semibold">
            Connect Bank
          </p>
        </Button>
      ) : variant === "primary" ? (
        <Button
          className={variant === "primary" ? "plaidlink-primary cursor-pointer" : ""}
          onClick={openMono}
          disabled={!connect}
          
        >
          <p className="hidden xl:block text-[16] font-semibold text-black-2">
            Connect Bank
          </p>
        </Button>
      ) : (
        <Button
          className="plaidlink-default cursor-pointer"
          onClick={openMono}
        >
          <img src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24}/>
          <p className="text-[16] font-semibold text-black-2">
            Connect Bank
          </p>
        </Button>
      )}
    </>
  );
};

export default MonoLink;


