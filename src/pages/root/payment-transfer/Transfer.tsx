import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '../../../components/PaymentTransferForm'
// import { getAccounts } from '@/lib/actions/bank.actions';
// import { getLoggedInUser } from '@/lib/actions/user.actions';


const Transfer = () => {
//   const loggedIn = await getLoggedInUser();
//   const accounts = await getAccounts({ 
//     userId: loggedIn.$id 
//   })

//   if(!accounts) return;
  
//   const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
      <HeaderBox 
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />
      <div className='text-red-500'>
        <h1 className='font-bold font-[30px]'>
          Note
        </h1>
        <p>You cannot perform transfer because we have not obtained license from the government</p>

      </div>
        
      <section className="size-full pt-5">
        <PaymentTransferForm  />
      </section>
    </section>
  )
}

export default Transfer