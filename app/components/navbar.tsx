"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, TrendingUp, Globe } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? "text-primary font-bold" : "text-text-primary";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl ">
      <div className="px-4 container mx-auto">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/nav-logo.png"
              alt="PH News"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold uppercase tracking-tight">
              PH<span className="font-light text-slate-500">News</span>
            </span>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-3 gap-2 p-4 w-100 bg-white">
                      <ListItem title="Politics" href="/politics">
                        Global and local political updates.
                      </ListItem>
                      <ListItem title="Technology" href="/tech">
                        The latest in AI and gadgets.
                      </ListItem>
                      <ListItem title="Sports" href="/sports">
                        Match highlights and scores.
                      </ListItem>
                      <ListItem title="Business" href="/business">
                        Market trends and economy.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/news"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/trending"),
                      "flex items-center gap-2"
                    )}
                  >
                    <TrendingUp className="h-4 w-4" />
                    News
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/world"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive("/world"),
                      "flex items-center gap-2"
                    )}
                  >
                    <Globe className="h-4 w-4" />
                    World News
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 hover:text-primary">
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/subscribe"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
            >
              Subscribe
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="space-y-1 px-4 py-4">
            <MobileLink href="/politics" pathname={pathname}>
              Politics
            </MobileLink>
            <MobileLink href="/tech" pathname={pathname}>
              Technology
            </MobileLink>
            <MobileLink href="/trending" pathname={pathname}>
              Trending
            </MobileLink>
            <Link
              href="/subscribe"
              className="mt-4 flex justify-center rounded-xl bg-primary py-3 font-bold text-white"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block rounded-md bg-white p-3 transition hover:bg-slate-100",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold">{title}</div>
          <p className="text-sm text-slate-500">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const MobileLink = ({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className={cn(
      "block rounded-md px-3 py-3 text-base font-medium",
      pathname === href ? "bg-slate-100 text-primary" : "text-text-primary"
    )}
  >
    {children}
  </Link>
);

export default Navbar;
