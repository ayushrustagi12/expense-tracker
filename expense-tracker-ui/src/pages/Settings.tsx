
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, CreditCard, Shield, Download } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <User className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+91 9876543210" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="currency">Preferred Currency</Label>
                <Input id="currency" defaultValue="INR (₹)" className="mt-2" />
              </div>
            </div>
            
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Bell className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Bill Reminders</p>
                  <p className="text-sm text-gray-500">Get notified before bills are due</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Budget Alerts</p>
                  <p className="text-sm text-gray-500">Alert when you exceed category budgets</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Monthly Reports</p>
                  <p className="text-sm text-gray-500">Receive monthly spending summaries</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Budget Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Budget Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="monthly-budget">Monthly Budget Limit</Label>
                <Input id="monthly-budget" defaultValue="50000" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="emergency-fund">Emergency Fund Target</Label>
                <Input id="emergency-fund" defaultValue="200000" className="mt-2" />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Category Budget Limits</h3>
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
              Update Budgets
            </Button>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 text-gray-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
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
