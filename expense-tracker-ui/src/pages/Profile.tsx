import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Camera, MapPin, Calendar, Mail, Phone } from "lucide-react";

const Profile = () => {
  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        {/* Mobile header with trigger */}
        <div className="flex items-center gap-4 mb-6 md:hidden">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and account details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="John Doe" />
                    <AvatarFallback className="bg-blue-600 text-white text-xl md:text-2xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-4 text-lg md:text-xl">
                  John Doe
                </CardTitle>
                <CardDescription>Premium User</CardDescription>
                <Badge
                  variant="secondary"
                  className="w-fit mx-auto mt-2 text-xs"
                >
                  Verified Account
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">john.doe@example.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Joined December 2023</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue="John"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+91 9876543210"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm">
                      Location
                    </Label>
                    <Input
                      id="location"
                      defaultValue="Mumbai, India"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="mt-2 h-16 md:h-20"
                    defaultValue="Financial enthusiast and expense tracking expert. Love to keep my finances organized and on track."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="occupation" className="text-sm">
                      Occupation
                    </Label>
                    <Input
                      id="occupation"
                      defaultValue="Software Engineer"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-sm">
                      Company
                    </Label>
                    <Input
                      id="company"
                      defaultValue="Tech Corp"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
