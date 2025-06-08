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
import { Calendar, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emiFormSchema = z.object({
  loanTitle: z.string().min(1, "Loan title is required"),
  loanType: z.enum([
    "Home Loan",
    "Car Loan",
    "Personal Loan",
    "Education Loan",
    "Other",
  ]),
  bankName: z.string().min(1, "Bank name is required"),
  emiAmount: z.string().min(1, "EMI amount is required"),
  startMonth: z.string().min(1, "Start month is required"),
  tenure: z.string().min(1, "Tenure is required"),
  paymentMode: z.enum(["Auto Debit", "Manual"]),
  sourceAccount: z.string().min(1, "Source account is required"),
});

type EMIFormValues = z.infer<typeof emiFormSchema>;

export function AddEMIDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<EMIFormValues>({
    resolver: zodResolver(emiFormSchema),
    defaultValues: {
      loanTitle: "",
      loanType: "Personal Loan",
      bankName: "",
      emiAmount: "",
      startMonth: "",
      tenure: "",
      paymentMode: "Auto Debit",
      sourceAccount: "",
    },
  });

  const onSubmit = (data: EMIFormValues) => {
    console.log("New EMI data:", data);
    // Here you would typically save the EMI data
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add EMI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Add New EMI
          </DialogTitle>
          <DialogDescription>
            Add a new loan EMI to track your monthly payments.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="loanTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Home Loan - HDFC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="loanType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Type</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      {...field}
                    >
                      <option value="Home Loan">Home Loan</option>
                      <option value="Car Loan">Car Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Education Loan">Education Loan</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank/Lender Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HDFC Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emiAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EMI Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="25000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Month</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tenure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenure (Months)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="240" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Mode</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      {...field}
                    >
                      <option value="Auto Debit">Auto Debit</option>
                      <option value="Manual">Manual Payment</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sourceAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Account</FormLabel>
                  <FormControl>
                    <Input placeholder="HDFC Bank Savings" {...field} />
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
              <Button type="submit" className="flex-1">
                Add EMI
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
