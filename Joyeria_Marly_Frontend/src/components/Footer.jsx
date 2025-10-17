import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 font-serif">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-[#2C3E5E]">
        {/* POLICY LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-[#040F2E]">POLICY LINKS</h3>
          <ul className="space-y-2">
            <li>
              <a href="/terms-conditions" className="hover:text-[#040F2E]">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-[#040F2E]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/shipping-policy" className="hover:text-[#040F2E]">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="/exchange" className="hover:text-[#040F2E]">
                Exchange & Repair Policy
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-[#040F2E]">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-[#1B2A40]">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li>
              <a href="/our-story" className="hover:text-[#040F2E]">
                Our Story
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#040F2E]">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/returns" className="hover:text-[#040F2E]">
                Returns + Exchanges + Repairs
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-[#040F2E]">
                SHOP ALL
              </a>
            </li>
            <li>
              <a href="/complaints-book" className="hover:text-[#040F2E]">
                Complaints Book
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT US */}
        <div>
          <h3 className="font-semibold mb-4 text-[#1B2A40]">CONTACT US</h3>
          <p className="mb-2">
            <strong>Order status, delivery issues:</strong>
            <br />
            <a
              href="mailto:contactmarly@gmail.com"
              className="hover:text-[#040F2E]"
            >
              contactmarly@gmail.com
            </a>
            <br />
            Mon – Fri (10 AM – 6 PM)
          </p>
          <p>
            <strong>Exchange & Replacement:</strong>
            <br />
            <a href="/exchange" className="hover:text-[#040F2E]">
              Book your exchange here
            </a>
            <br />
            <span className="text-xs text-gray-600">
              Note: Exchange request should be raised within 7 days of delivery
            </span>
          </p>
        </div>

        {/* NEWSLETTER + SOCIALS */}
        <div>
          <h3 className="font-semibold mb-4 text-[#1B2A40]">BE AN INSIDER</h3>
          <p className="mb-2">
            Join us for 10% off your first order + the latest updates and sales!
          </p>
          <div className="flex items-center border-b border-gray-400 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-1 px-2 text-sm outline-none"
            />
          </div>
          <div className="flex space-x-4 text-[#040F2E]">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="text-center py-6 text-xs text-gray-500 border-t border-gray-200">
        <p>© 2025 MARLY handmade</p>
      </div>
    </footer>
  );
}
