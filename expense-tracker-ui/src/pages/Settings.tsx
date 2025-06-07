import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  CreditCard,
  Shield,
  Download,
  Palette,
  Globe,
  Moon,
} from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Preferences</h1>
          <p className="text-gray-600 mt-2">
            Customize your app experience and preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Palette className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Appearance
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-500">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div>
                <Label htmlFor="theme">Color Theme</Label>
                <Select>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue
                      placeholder="Select a theme"
                      defaultValue="blue"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Globe className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Language & Region
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue
                      placeholder="Select language"
                      defaultValue="en"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currency">Preferred Currency</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue
                      placeholder="Select currency"
                      defaultValue="inr"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timezone">Time Zone</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue
                      placeholder="Select timezone"
                      defaultValue="ist"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                    <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                    <SelectItem value="est">EST (UTC-5)</SelectItem>
                    <SelectItem value="pst">PST (UTC-8)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateformat">Date Format</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue
                      placeholder="Select format"
                      defaultValue="dd-mm-yyyy"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Bell className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive email alerts for important events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Bill Reminders</p>
                  <p className="text-sm text-gray-500">
                    Get notified before bills are due
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Budget Alerts</p>
                  <p className="text-sm text-gray-500">
                    Alert when you exceed category budgets
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Monthly Reports</p>
                  <p className="text-sm text-gray-500">
                    Receive monthly spending summaries
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Budget Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Budget Preferences
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="monthly-budget">Monthly Budget Limit</Label>
                <Input
                  id="monthly-budget"
                  defaultValue="50000"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="emergency-fund">Emergency Fund Target</Label>
                <Input
                  id="emergency-fund"
                  defaultValue="200000"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Category Budget Limits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Food & Dining</span>
                  <Input className="w-24" defaultValue="18000" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transport</span>
                  <Input className="w-24" defaultValue="10000" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Shopping</span>
                  <Input className="w-24" defaultValue="8000" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Entertainment</span>
                  <Input className="w-24" defaultValue="5000" />
                </div>
              </div>
            </div>

            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Update Preferences
            </Button>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">
                Security & Privacy
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div>
                <Button variant="outline" className="mr-4">
                  Change Password
                </Button>
                <Button variant="outline">
                  Export Data
                  <Download className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
