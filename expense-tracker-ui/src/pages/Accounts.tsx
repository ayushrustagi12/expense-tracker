import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "@/redux/accountSlice";
import { Layout } from "@/components/Layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreditCard, Wallet, MoreVertical } from "lucide-react";
import { AddCreditCardDialog } from "@/components/AddCreditCardDialog";
import { AddBankAccountDialog } from "@/components/AddBankAccountDialog";
import { AddWalletDialog } from "@/components/AddWalletDialog";
import type { RootState, AppDispatch } from "@/redux/store";

const cards = [
  {
    id: 1,
    name: "HDFC Credit Card",
    type: "Credit Card",
    number: "****1111",
    limit: 50000,
    used: 15000,
    billingDate: "15th",
    icon: CreditCard,
    color: "bg-purple-500",
  },
  {
    id: 2,
    name: "SBI Credit Card",
    type: "Credit Card",
    number: "****2222",
    limit: 30000,
    used: 15000,
    billingDate: "25th",
    icon: CreditCard,
    color: "bg-orange-500",
  },
  {
    id: 3,
    name: "HDFC Debit Card",
    type: "Debit Card",
    number: "****1234",
    linkedAccount: "HDFC Bank Savings",
    icon: CreditCard,
    color: "bg-blue-500",
  },
];

const wallets = [
  {
    id: 1,
    name: "Paytm Wallet",
    type: "Digital Wallet",
    provider: "Paytm",
    balance: 2500,
    icon: Wallet,
    color: "bg-indigo-500",
  },
  {
    id: 2,
    name: "PhonePe Wallet",
    type: "Digital Wallet",
    provider: "PhonePe",
    balance: 1200,
    icon: Wallet,
    color: "bg-violet-500",
  },
  {
    id: 3,
    name: "Cash Wallet",
    type: "Physical Wallet",
    balance: 3000,
    icon: Wallet,
    color: "bg-emerald-500",
  },
];

const Accounts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accounts = useSelector(
    (state: RootState) => state.accountData.list || []
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 md:hidden">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Accounts & Cards
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <AddBankAccountDialog />
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Accounts & Cards
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your bank accounts, payment cards, and wallets
            </p>
          </div>
          <div className="flex gap-3">
            <AddBankAccountDialog />
            <AddCreditCardDialog />
            <AddWalletDialog />
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Bank Accounts
            </h2>
            <div className="md:hidden">
              <AddBankAccountDialog />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {accounts.map((account) => {
              const bankDetails = account.bank_account_details;
              return (
                <div
                  key={account.id}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-2 md:p-3 rounded-lg bg-blue-100`} // Example static color, replace if you want dynamic
                    >
                      {/* Replace with a proper icon component if you have one */}
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2zM12 12v7m0 0l3-3m-3 3l-3-3"
                        />
                      </svg>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>

                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 truncate">
                    {account.account_name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {bankDetails ? bankDetails.account_number : "N/A"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Balance</span>
                    <span className="text-base md:text-lg font-bold text-gray-900">
                      ₹{parseFloat(account.balance).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
