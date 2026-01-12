"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Newspaper, TrendingUp, Globe } from "lucide-react";
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* LEFT: Logo & Name */}
          <div className="shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:rotate-12">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-text-primary uppercase">
                PH<span className="font-light text-slate-500">News</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-text-primary font-semibold pt-6">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2">
                      <ListItem title="Politics" href="/politics">
                        Global and local political updates.
                      </ListItem>
                      <ListItem title="Technology" href="/tech">
                        The latest in AI and Gadgets.
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
                  <Link href="/trending">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-text-primary font-semibold"
                      )}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" /> Trending
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/world">
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-text-primary font-semibold"
                      )}
                    >
                      <Globe className="w-4 h-4 mr-2" /> World News
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <Link
              href="/subscribe"
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Subscribe
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            <Link
              href="/politics"
              className="block px-3 py-3 text-base font-medium text-text-primary border-b border-slate-50"
            >
              Politics
            </Link>
            <Link
              href="/tech"
              className="block px-3 py-3 text-base font-medium text-text-primary border-b border-slate-50"
            >
              Technology
            </Link>
            <Link
              href="/trending"
              className="block px-3 py-3 text-base font-medium text-text-primary border-b border-slate-50"
            >
              Trending
            </Link>
            <div className="pt-4">
              <Link
                href="/subscribe"
                className="w-full flex justify-center bg-primary text-white py-3 rounded-xl font-bold"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Component for Navigation Content
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-text-primary focus:bg-slate-100 focus:text-text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
