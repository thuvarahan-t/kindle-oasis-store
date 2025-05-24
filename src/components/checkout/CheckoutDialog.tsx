
import { useState } from 'react';
import { CreditCard, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  total: number;
  items: Array<{
    id: string;
    title: string;
    author: string;
    price: number;
  }>;
}

const CheckoutDialog = ({ open, onClose, onComplete, total, items }: CheckoutDialogProps) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/\d{0,4}/g);
    return match ? match.join(' ').substr(0, 19) : '';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    handleInputChange('expiryDate', value);
  };

  const processPayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate successful payment
    setProcessing(false);
    setStep(3);
    
    toast({
      title: "Payment Successful!",
      description: `Your order for ${items.length} book(s) has been processed.`,
    });

    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="John"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Doe"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="john@example.com"
        />
      </div>
      <Button onClick={() => setStep(2)} className="w-full">
        Continue to Payment
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <CreditCard className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <Lock className="h-4 w-4 text-green-600" />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Demo Payment:</strong> Use card number 4242 4242 4242 4242 for testing
        </p>
      </div>

      <div>
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          value={formData.cardNumber}
          onChange={handleCardNumberChange}
          placeholder="4242 4242 4242 4242"
          maxLength={19}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            value={formData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substr(0, 3))}
            placeholder="123"
            maxLength={3}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="billingAddress">Billing Address</Label>
        <Input
          id="billingAddress"
          value={formData.billingAddress}
          onChange={(e) => handleInputChange('billingAddress', e.target.value)}
          placeholder="123 Main St"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="New York"
          />
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="10001"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total: ${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={processPayment} 
          disabled={processing}
          className="flex-1"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-4">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-green-600">Payment Successful!</h3>
      <p className="text-gray-600">
        Your order has been processed successfully. You can now access your books in your library.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Order Total: <strong>${total.toFixed(2)}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Books Purchased: <strong>{items.length}</strong>
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && 'Checkout - Contact Info'}
            {step === 2 && 'Checkout - Payment'}
            {step === 3 && 'Order Complete'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
