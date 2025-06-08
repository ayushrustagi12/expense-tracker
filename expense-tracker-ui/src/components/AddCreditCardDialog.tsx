import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const cardFormSchema = z.object({
  cardName: z.string().min(1, "Card name is required"),
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  cardType: z.enum(["Credit Card", "Debit Card"]),
  limit: z.string().optional(),
  billingDate: z.string().optional(),
  linkedAccount: z.string().optional(),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

export function AddCreditCardDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      cardType: "Credit Card",
      limit: "",
      billingDate: "",
      linkedAccount: "",
    },
  });

  const onSubmit = (data: CardFormValues) => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Add New Card
          </DialogTitle>
          <DialogDescription>
            Add a new credit or debit card to track your expenses.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HDFC Credit Card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number (Last 4 digits)</FormLabel>
                  <FormControl>
                    <Input placeholder="1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Type</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      {...field}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("cardType") === "Credit Card" && (
              <>
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Limit</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Date</FormLabel>
                      <FormControl>
                        <Input placeholder="15th" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {form.watch("cardType") === "Debit Card" && (
              <FormField
                control={form.control}
                name="linkedAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linked Account</FormLabel>
                    <FormControl>
                      <Input placeholder="HDFC Bank Savings" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Card
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
