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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addDebitCard } from "../redux/cardSlice";
import { useToast } from "@/hooks/use-toast";

const debitCardFormSchema = z.object({
  card_name: z.string().min(1, "Card name is required"),
  holder_name: z.string().min(1, "Holder name is required"),
  bank_name: z.string().min(1, "Bank name is required"),
  card_number: z.string().min(16, "Card number must be at least 16 digits"),
  linked_bank_account_id: z.number().optional(),
  currency: z.string().optional(),
  notes: z.string().optional(),
});

type DebitCardFormValues = z.infer<typeof debitCardFormSchema>;

interface AddDebitCardDialogProps {
  children: React.ReactNode;
}

export function AddDebitCardDialog({ children }: AddDebitCardDialogProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { list: accounts, loading: accountsLoading } = useSelector(
    (state: RootState) => state.accountData
  );

  const form = useForm<DebitCardFormValues>({
    resolver: zodResolver(debitCardFormSchema),
    defaultValues: {
      card_name: "",
      holder_name: "",
      bank_name: "",
      card_number: "",
      linked_bank_account_id: undefined,
      currency: "INR",
      notes: "",
    },
  });

  const onSubmit = async (data: DebitCardFormValues) => {
    try {
      await dispatch(addDebitCard(data)).unwrap();
      toast({
        title: "Success",
        description: "Debit card added successfully",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add debit card",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Add Debit Card
          </DialogTitle>
          <DialogDescription>
            Add a new debit card to track your expenses.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="card_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., SBI Debit Card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="holder_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bank_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., State Bank of India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="card_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linked_bank_account_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linked Bank Account (Optional)</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      disabled={accountsLoading}
                    >
                      <option value="">
                        {accountsLoading
                          ? "Loading accounts..."
                          : "Select Account"}
                      </option>
                      {accounts
                        .filter(
                          (account) =>
                            account.account_category === "savings" ||
                            account.account_category === "current"
                        )
                        .map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.account_name} - {account.account_category}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Additional notes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Add Debit Card
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
