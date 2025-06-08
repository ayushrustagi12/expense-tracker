import React from "react";
import { Layout } from "@/components/Layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreditCard, Wallet, MoreVertical } from "lucide-react";
import { AddCreditCardDialog } from "@/components/AddCreditCardDialog";
import { AddBankAccountDialog } from "@/components/AddBankAccountDialog";
import { AddWalletDialog } from "@/components/AddWalletDialog";

const accounts = [
  {
    id: 1,
    name: "HDFC Bank Savings",
    type: "Bank Account",
    number: "****1234",
    balance: 45000,
    icon: Wallet,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "SBI Current Account",
    type: "Bank Account",
    number: "****5678",
    balance: 12000,
    icon: Wallet,
    color: "bg-green-500",
  },
];

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
  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Mobile header with trigger */}
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

        {/* Desktop header */}
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
            {accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 md:p-3 rounded-lg ${account.color} bg-opacity-10`}
                  >
                    <account.icon
                      className={`h-5 w-5 md:h-6 md:w-6 ${account.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 truncate">
                  {account.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{account.number}</p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Balance</span>
                  <span className="text-base md:text-lg font-bold text-gray-900">
                    ₹{account.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Payment Cards
            </h2>
            <div className="md:hidden">
              <AddCreditCardDialog />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 md:p-3 rounded-lg ${card.color} bg-opacity-10`}
                  >
                    <card.icon
                      className={`h-5 w-5 md:h-6 md:w-6 ${card.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 truncate">
                  {card.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{card.number}</p>

                {card.type === "Credit Card" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Used</span>
                      <span className="text-sm font-medium">
                        ₹{card.used?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Limit</span>
                      <span className="text-sm font-medium">
                        ₹{card.limit?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available</span>
                      <span className="text-sm font-bold text-green-600">
                        ₹
                        {(
                          (card.limit || 0) - (card.used || 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Billing Date
                      </span>
                      <span className="text-sm font-medium">
                        {card.billingDate}
                      </span>
                    </div>

                    {/* Usage Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Usage</span>
                        <span>
                          {Math.round(
                            ((card.used || 0) / (card.limit || 1)) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              ((card.used || 0) / (card.limit || 1)) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {card.type === "Debit Card" && (
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Linked Account
                      </span>
                      <span className="text-sm font-medium truncate ml-2">
                        {card.linkedAccount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wallets */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Wallets
            </h2>
            <div className="md:hidden">
              <AddWalletDialog />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 md:p-3 rounded-lg ${wallet.color} bg-opacity-10`}
                  >
                    <wallet.icon
                      className={`h-5 w-5 md:h-6 md:w-6 ${wallet.color.replace(
                        "bg-",
                        "text-"
                      )}`}
                    />
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 truncate">
                  {wallet.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{wallet.type}</p>

                {wallet.provider && (
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Provider</span>
                    <span className="text-sm font-medium">
                      {wallet.provider}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Balance</span>
                  <span className="text-base md:text-lg font-bold text-gray-900">
                    ₹{wallet.balance.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
