"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Label } from "@radix-ui/react-label";
import { Lock, MessagesSquare, Unlock } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    title: "Deep Code Analysis",
    description: "Advanced AI parsing of repository structure and content",
    icon: <Icons.gitLogo className="w-5 h-5" />,
  },
  {
    title: "Context Retention",
    description:
      "Intelligent conversation memory across repository discussions",
    icon: <MessagesSquare className="w-5 h-5" />,
  },
];

export default function SignIn() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  // const [showRepoAccessDialog, setShowRepoAccessDialog] = useState(false);
  const [repoAccessType, setRepoAccessType] = useState("public");

  const handleGitHubSignIn = async () => {
    try {
      setIsGithubLoading(true);
      const scopes =
        repoAccessType === "private"
          ? "read:user user:email repo"
          : "read:user user:email";

      await signIn("github", {
        callbackUrl: "/dashboard",
        scope: scopes,
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setIsGithubLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Info Section */}
      <div className="hidden lg:flex bg-gradient-to-br from-background via-secondary to-background relative">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="z-10 w-full p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary">
              {siteConfig.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="space-y-8 max-w-2xl">
            <h2 className="text-3xl font-semibold text-foreground">
              {siteConfig.headline}
            </h2>
            <p className="text-muted-foreground text-lg">
              {siteConfig.subHeadline}
            </p>

            <div className="grid gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50 backdrop-blur-sm "
                >
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2024 {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold">
                Welcome to{" "}
                <span className="text-primary">{siteConfig.name}</span>
              </h2>
              <p className="text-muted-foreground">
                Sign in to start analyzing your repositories
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGitHubSignIn}
                disabled={isGithubLoading}
                variant="default"
                className="w-full bg-[#24292F] text-white hover:bg-[#24292F]/90 group"
              >
                {isGithubLoading ? (
                  <>
                    <Icons.loader className="w-5 h-5 animate-spin" />
                    Wait ...
                  </>
                ) : (
                  <>
                    <Icons.gitLogo className="mr-2 h-5 w-5" />
                    <span className="text-center">Continue with GitHub</span>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full ml-2 animate-pulse">
                      Recommended
                    </span>
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full text-primary"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <>
                    <Icons.loader className="w-5 h-5 animate-spin" />
                    Wait ...
                  </>
                ) : (
                  <>
                    <Image
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    Continue with Google
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By continuing, you agree to our{" "}
                <a href="#" className="underline hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-primary">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
      {/* <Dialog
        open={showRepoAccessDialog}
        onOpenChange={setShowRepoAccessDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Icons.gitBranch className="mr-2 h-6 w-6 text-primary" />
              GitHub Repository Access
            </DialogTitle>
            <DialogDescription>
              Choose the type of GitHub repositories you want to analyze
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <RadioGroup
              value={repoAccessType}
              onValueChange={setRepoAccessType}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="public"
                  id="public-repos"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="public-repos"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Lock className="mb-3 h-6 w-6 text-muted-foreground" />
                  Public Repositories
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="private"
                  id="private-repos"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="private-repos"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Unlock className="mb-3 h-6 w-6 text-green-500" />
                  Private Repositories
                </Label>
              </div>
            </RadioGroup>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">
                {repoAccessType === "public"
                  ? "We'll analyze public repositories you have access to."
                  : "We request permissions to securely access and analyze your private repositories and public repositories you have access to."}
              </p>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowRepoAccessDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGitHubSignIn}
                className="bg-primary text-primary-foreground"
              >
                Continue
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
