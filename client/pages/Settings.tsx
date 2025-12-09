import {
  Moon,
  Sun,
  Bell,
  Lock,
  User,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const settingsSections = [
    {
      title: "Account Settings",
      icon: User,
      items: [
        {
          label: "Profile Information",
          description: "Update your name, email, and bio",
          action: "Edit",
        },
        {
          label: "Password",
          description: "Change your password regularly",
          action: "Update",
        },
        {
          label: "Email Verification",
          description: "Verify and manage your email addresses",
          action: "Manage",
        },
      ],
    },
    {
      title: "Security",
      icon: Lock,
      items: [
        {
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security",
          toggle: twoFactor,
          onChange: setTwoFactor,
        },
        {
          label: "Active Sessions",
          description: "View and manage your active sessions",
          action: "View",
        },
        {
          label: "Login History",
          description: "See where and when you've logged in",
          action: "View",
        },
      ],
    },
    {
      title: "Preferences",
      icon: Globe,
      items: [
        {
          label: "Theme",
          description: "Choose between light and dark mode",
          toggle: darkMode,
          onChange: setDarkMode,
        },
        {
          label: "Currency",
          description: "Set your preferred currency (USD)",
          action: "Change",
        },
        {
          label: "Language",
          description: "Select your preferred language",
          action: "Change",
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Price Alerts",
          description: "Get notified when prices reach your targets",
          toggle: notifications,
          onChange: setNotifications,
        },
        {
          label: "Trade Notifications",
          description: "Receive alerts for your trades",
          toggle: true,
        },
        {
          label: "Newsletter",
          description: "Stay updated with market insights",
          toggle: false,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <div key={section.title} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center">
                <SectionIcon size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>

            {/* Settings Items */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              {section.items.map((item, idx) => (
                <div
                  key={item.label}
                  className={`p-6 flex items-center justify-between ${
                    idx !== section.items.length - 1
                      ? "border-b border-border"
                      : ""
                  } hover:bg-slate-50 transition-colors`}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Toggle or Action Button */}
                  {item.toggle !== undefined ? (
                    <button
                      onClick={() => item.onChange?.(!item.toggle)}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ml-4 flex-shrink-0 ${
                        item.toggle ? "bg-primary" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          item.toggle ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  ) : item.action ? (
                    <Button variant="ghost" size="sm" className="gap-2 ml-4">
                      {item.action}
                      <ChevronRight size={16} />
                    </Button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Support Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-200 to-emerald-200 rounded-lg flex items-center justify-center">
            <HelpCircle size={20} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold">Support</h2>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm space-y-4 p-6">
          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Help Center
              </p>
              <p className="text-sm text-muted-foreground">
                Browse FAQs and guides
              </p>
            </div>
            <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Contact Support
              </p>
              <p className="text-sm text-muted-foreground">
                Get help from our support team
              </p>
            </div>
            <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Documentation
              </p>
              <p className="text-sm text-muted-foreground">
                Read our API and integration docs
              </p>
            </div>
            <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <p className="text-muted-foreground">App Version</p>
            <p className="font-semibold">1.2.4</p>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <p className="text-muted-foreground">Last Updated</p>
            <p className="font-semibold">Nov 15, 2024</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Build</p>
            <p className="font-semibold font-mono text-sm">build.2024.1115</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
          <div>
            <p className="font-semibold text-red-900 mb-1">
              Delete Account
            </p>
            <p className="text-sm text-red-800 mb-4">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>

          <div className="border-t border-red-200 pt-4">
            <p className="font-semibold text-red-900 mb-1">
              Logout All Sessions
            </p>
            <p className="text-sm text-red-800 mb-4">
              Sign out from all devices and sessions.
            </p>
            <Button variant="outline" className="gap-2">
              <LogOut size={18} />
              Logout All Sessions
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-muted-foreground text-sm pt-4 border-t border-border">
        <p>
          By using BlockTrade, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
