
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MapPin } from 'lucide-react';
import { Address } from './CheckoutStepper';

const addressSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit pincode'),
});

interface AddressFormProps {
  onSubmit: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const form = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  const handleSubmit = (data: Address) => {
    onSubmit(data);
  };

  return (
    <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
      <CardHeader>
        <CardTitle className="font-orbitron cyber-text-glow flex items-center">
          <MapPin className="mr-2" />
          Shipping & Billing Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-gold">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-gold">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="10-digit mobile number"
                        className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-gold">Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="House/Flat number, Street name, Area"
                      className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-gold">City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="City"
                        className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-gold">State</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="State"
                        className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyber-gold">Pincode</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="6-digit pincode"
                        className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright"
            >
              Continue to Review Order
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
