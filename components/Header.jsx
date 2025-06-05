import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ChevronDownIcon,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  MessageCircleIcon,
  StarsIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="SensAI"
            width={200}
            height={60}
            className="w-auto h-12 py-1 object-contain"
          />
        </Link>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <SignedIn>
            {/* industry insights button */}
            <Link href="/dashboard">
              <Button variant="outline">
                <LayoutDashboard className="size-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            {/* growth tools dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarsIcon className="size-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDownIcon className="size-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="size-4" />
                    <span className="">Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <MessageCircleIcon className="size-4" />
                    <span className="">Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link
                    href="/ai-interview"
                    className="flex items-center gap-2"
                  >
                    <GraduationCap className="size-4" />
                    <span className="">Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          {/* clerk auth buttons */}
          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="cursor-pointer">
                <LogIn className="size-4" />
                <span className="">Sign In</span>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: " font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
