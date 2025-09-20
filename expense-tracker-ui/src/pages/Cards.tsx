import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchCards, deleteCard } from "../redux/cardSlice";
import { fetchAccounts } from "../redux/accountSlice";
import { Layout } from "@/components/Layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, Trash2, Edit } from "lucide-react";
import { AddCreditCardDialog } from "@/components/AddCreditCardDialog";
import { AddDebitCardDialog } from "@/components/AddDebitCardDialog";
import { useToast } from "@/hooks/use-toast";

const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, isLoading, error } = useSelector(
    (state: RootState) => state.cardData
  );
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleDeleteCard = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await dispatch(deleteCard(id)).unwrap();
        toast({
          title: "Success",
          description: "Card deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete card",
          variant: "destructive",
        });
      }
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(.{4})/g, "$1 ").trim();
  };

  const getCardTypeIcon = (category: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  const getCardTypeColor = (category: string) => {
    switch (category) {
      case "credit_card":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "debit_card":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading cards...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Mobile header with trigger */}
        <div className="flex items-center gap-4 mb-6 md:hidden">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cards</h1>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Cards
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your credit and debit cards
            </p>
          </div>
          <div className="flex gap-2">
            <AddCreditCardDialog>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Credit Card
              </Button>
            </AddCreditCardDialog>
            <AddDebitCardDialog>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Debit Card
              </Button>
            </AddDebitCardDialog>
          </div>
        </div>

        {/* Mobile add buttons */}
        <div className="flex gap-2 mb-6 md:hidden">
          <AddCreditCardDialog>
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Credit Card
            </Button>
          </AddCreditCardDialog>
          <AddDebitCardDialog>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Debit Card
            </Button>
          </AddDebitCardDialog>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No cards found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first card
            </p>
            <div className="flex gap-2 justify-center">
              <AddCreditCardDialog>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Credit Card
                </Button>
              </AddCreditCardDialog>
              <AddDebitCardDialog>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Debit Card
                </Button>
              </AddDebitCardDialog>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card key={card.id} className="relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 right-0 h-2 ${getCardTypeColor(
                    card.account_category
                  )}`}
                />
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCardTypeIcon(card.account_category)}
                      <Badge
                        variant={
                          card.account_category === "credit_card"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {card.account_category === "credit_card"
                          ? "Credit"
                          : "Debit"}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {card.account_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {card.creditCardDetails?.bank_name ||
                          card.debitCardDetails?.bank_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Card Number</p>
                      <p className="font-mono text-sm">
                        {formatCardNumber(
                          card.creditCardDetails?.card_number ||
                            card.debitCardDetails?.card_number ||
                            ""
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Holder Name</p>
                      <p className="text-sm">
                        {card.creditCardDetails?.holder_name ||
                          card.debitCardDetails?.holder_name}
                      </p>
                    </div>

                    {card.account_category === "credit_card" &&
                      card.creditCardDetails && (
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Billing Cycle
                            </p>
                            <p className="text-sm">
                              Day {card.creditCardDetails.billing_cycle_day}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Auto Debit</p>
                            <Badge
                              variant={
                                card.creditCardDetails.is_auto_debit_enabled
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {card.creditCardDetails.is_auto_debit_enabled
                                ? "Enabled"
                                : "Disabled"}
                            </Badge>
                          </div>
                        </div>
                      )}

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Balance</span>
                        <span
                          className={`font-semibold ${
                            card.balance < 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          ₹{Math.abs(card.balance).toLocaleString()}
                          {card.balance < 0 && " (Credit)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cards;
