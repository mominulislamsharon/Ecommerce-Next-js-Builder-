"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";

interface NavItem {
  label: string;
  href: string;
}
interface HeaderProps {
  brand?: ReactNode;
  brandHref?: string;
  navItems?: NavItem[];
  showCart?: boolean;
}

const Header = ({
  brand = "Acme Store",
  brandHref = "/",
  navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
  ],
  showCart = true,
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // TODO: Cart Count Badge
  const cartCount = 3;

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div>
      <header className="bg-white/80 w-full border-b border-gray-200 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl h-16 mx-auto flex items-center justify-between px-4 sm:px-4 lg:px-8">
          <Link className="text-xl font-bold text-gray-900" href={brandHref}>
            {brand}
          </Link>

          {navItems.length > 0 && (
            <nav className="hidden sm:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-4 ">
            {showCart && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-black rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile menu button */}

            {navItems.length > 0 && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden"
              >
                {mobileMenuOpen ? (
                  <FiX
                    className="w-6 h-6 "
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && navItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white sm:hidden">
            <nav className="flex flex-col gap-4 px-4 p-4">
              {navItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
