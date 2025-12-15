'use client';

import { useUserStore } from '@/stores/userStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input-custom";
import { useToast } from "@/components/ui/toast";
import { updateSupebaseProfile } from "@/lib/client";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import {currencyString, formattedDate} from '@/utils/string';

export default function ProfilePage() {
    const { user, userSubscription, setUser } = useUserStore((state) => state);
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: user?.username ?? "",
        email: user?.email ?? ""
    });

    if (!user) {
        redirect('/auth/login');
        return null;
    }

    console.log('userSubscription ', userSubscription);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const updatedProfile = await updateSupebaseProfile({
                username: formData.username,
                email: formData.email
            }, user.id);

            if (updatedProfile) {
                const updatedUser = { ...user, ...updatedProfile };

                setUser(updatedUser);
                setIsEditing(false);
                showToast("Profile updated successfully", "success");
            } else {
                showToast("Failed to update profile", "error");
            }
        } catch (error) {
            console.error(error);
            showToast("An error occurred", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            username: user.username || '',
            email: user.email || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">
                        My Profile
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Manage your account settings and preferences.
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* User Sidebar / Summary */}
                <div className="md:col-span-1">
                    <Card className="h-full border-0 shadow-lg bg-white overflow-hidden pt-0">
                        <div className="h-32 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                        <CardContent className="relative pt-0 flex flex-col items-center">
                            <div className="-mt-12 mb-4 p-1 bg-white rounded-full">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src="" alt={user.username} />
                                    <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-600">
                                        {user.username?.slice(0, 3).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
                            <p className="text-sm text-gray-500 mb-4">{user.email}</p>

                            <Badge variant="secondary" className="mb-6">
                                Member since {new Date(user.created_at).toLocaleDateString()}
                            </Badge>

                            <div className="w-full mt-6">
                                <h3 className="font-medium text-gray-900 mb-2">Preferences</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between py-3 bg-gray-50 rounded-lg">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">Email Notifications</span>
                                            <span className="text-xs text-gray-500">Subscription updates</span>
                                        </div>
                                        <Badge variant="outline" className="bg-white w-18 py-1 justify-center">Enabled</Badge>
                                    </div>
                                    <div className="flex items-center justify-between py-3 bg-gray-50 rounded-lg">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900">Interface Theme</span>
                                            <span className="text-xs text-gray-500">System default</span>
                                        </div>
                                        <Badge variant="outline" className="bg-white w-18 py-1 justify-center">Auto</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                </div>

                {/* Main Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>
                                    Basic details about your personal account.
                                </CardDescription>
                            </div>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleCancel}
                                        color="neutral"
                                        size="sm"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        color="positive"
                                        size="sm"
                                        pending={isLoading}
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={() => setIsEditing(true)} color="positive" size="sm">
                                    Edit Profile
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-500">Username</p>
                                    {isEditing ? (
                                        <Input
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="Enter username"
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900">{user.username}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                                    {isEditing ? (
                                        <Input
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter email"
                                            type="email"
                                        />
                                    ) : (
                                        <p className="font-medium text-gray-900">{user.email}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-500">User ID</p>
                                    <p className="font-mono text-xs text-gray-500 bg-gray-50 p-2 rounded border truncate">
                                        {user.id}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {userSubscription && (
                        <Card className="border shadow-sm">
                            <CardHeader>
                                <CardTitle>Subscription Details</CardTitle>
                                <CardDescription>
                                    Manage your current subscription plan.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Plan</p>
                                        <p className="font-medium text-gray-900">{userSubscription.productName || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Amount</p>
                                        <p className="font-medium text-gray-900">{(currencyString(userSubscription.planAmount) + " / " + userSubscription.planInterval) || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Status</p>
                                        <Badge variant={userSubscription.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                            {userSubscription.status || 'N/A'}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Started On</p>
                                        <p className="font-medium text-gray-900">
                                            {userSubscription.start_date
                                                ? new Date(userSubscription.start_date * 1000).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">
                                            {userSubscription.cancel_at_period_end && userSubscription.cancel_at ? 'Ends On' : 'Next Billing Date'}
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {userSubscription.cancel_at_period_end && userSubscription.cancel_at
                                                ? formattedDate(new Date(userSubscription.cancel_at * 1000))
                                                : userSubscription.current_period_end
                                                    ? formattedDate(new Date(userSubscription.current_period_end * 1000))
                                                    : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}


                </div>
            </div>
        </div >
    );
}
