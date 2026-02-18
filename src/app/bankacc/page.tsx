import Navbar from '@/components/components/Navbar'
import AccountCards from './AccountCards'

export default function BankAcc_Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <AccountCards />
      </div>
    </>
  )
}
