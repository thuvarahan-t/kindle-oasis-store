
import { Link, useNavigate } from 'react-router-dom';
import { Book, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Redirecting to support page...",
    });
    // In a real app, this would navigate to a support page
    console.log("Contact support clicked");
  };

  const handleOrderStatus = () => {
    toast({
      title: "Order Status",
      description: "Please log in to view your orders",
    });
    navigate('/dashboard');
  };

  const handleHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Opening help documentation...",
    });
    // In a real app, this would open help docs
    console.log("Help center clicked");
  };

  const handleReturnsRefunds = () => {
    toast({
      title: "Returns & Refunds",
      description: "Opening returns policy...",
    });
    // In a real app, this would open returns page
    console.log("Returns & Refunds clicked");
  };

  const handlePrivacyPolicy = () => {
    toast({
      title: "Privacy Policy",
      description: "Opening privacy policy...",
    });
    // In a real app, this would open privacy policy
    console.log("Privacy policy clicked");
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} Link`,
      description: `Opening ${platform} page...`,
    });
    console.log(`${platform} social link clicked`);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@bookstore.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:1-800-BOOK-STORE';
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Book className="h-8 w-8 text-blue-600 dark:text-red-600" />
              <span className="text-xl font-bold text-foreground">BookStore</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your premier destination for digital books. Discover, read, and enjoy thousands of titles from around the world.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('Facebook')}
                className="p-2 hover:bg-muted"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('Twitter')}
                className="p-2 hover:bg-muted"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSocialClick('Instagram')}
                className="p-2 hover:bg-muted"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/books" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/books?category=free" className="text-muted-foreground hover:text-foreground transition-colors">
                  Free Books
                </Link>
              </li>
              <li>
                <Link to="/books?category=bestsellers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/books?category=fiction" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?category=technology" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                  onClick={handleHelpCenter}
                >
                  Help Center
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                  onClick={handleContactSupport}
                >
                  Contact Support
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                  onClick={handleOrderStatus}
                >
                  Order Status
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                  onClick={handleReturnsRefunds}
                >
                  Returns & Refunds
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                  onClick={handlePrivacyPolicy}
                >
                  Privacy Policy
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <Button
                variant="link"
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                onClick={handleEmailClick}
              >
                <Mail className="h-4 w-4 mr-2" />
                support@bookstore.com
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                onClick={handlePhoneClick}
              >
                <Phone className="h-4 w-4 mr-2" />
                1-800-BOOK-STORE
              </Button>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Reading Ave, Book City, BC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 BookStore. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                onClick={handlePrivacyPolicy}
              >
                Terms of Service
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                onClick={handlePrivacyPolicy}
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm"
                onClick={() => toast({ title: "Cookie Policy", description: "Opening cookie policy..." })}
              >
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
