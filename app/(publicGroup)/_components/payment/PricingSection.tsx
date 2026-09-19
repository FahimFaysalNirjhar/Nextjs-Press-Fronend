import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SubscribeButton from "./SubscribeButton";

type PricingSectionProps = {
  isSubscribed?: boolean;
  className?: string;
};

// Placeholder price and features: change these to match your Stripe product.
const PREMIUM_PRICE = "$9";
const PREMIUM_INTERVAL = "/ month";

const freeFeatures = [
  "Read all free news",
  "Comment on stories",
  "Daily headlines",
];

const premiumFeatures = [
  "Everything in Free",
  "Unlimited premium stories",
  "Long reads and data analysis",
  "Cancel anytime",
];

const PricingSection = ({
  isSubscribed = false,
  className,
}: PricingSectionProps) => {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {/* Free */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Free</CardTitle>
          <CardDescription>Stay informed with the daily news.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="mb-6">
            <span className="text-4xl font-semibold tracking-tight">$0</span>
          </p>
          <ul className="space-y-3 text-sm">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Keep reading</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Premium */}
      <Card className="border-primary ring-1 ring-primary">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xl">Premium</CardTitle>
            <Badge>Most popular</Badge>
          </div>
          <CardDescription>
            Full access to every story we publish.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="mb-6">
            <span className="text-4xl font-semibold tracking-tight">
              {PREMIUM_PRICE}
            </span>{" "}
            <span className="text-sm text-muted-foreground">
              {PREMIUM_INTERVAL}
            </span>
          </p>
          <ul className="space-y-3 text-sm">
            {premiumFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3">
          {isSubscribed ? (
            <Button asChild className="w-full">
              <Link href="/premium">You&apos;re subscribed · Read premium</Link>
            </Button>
          ) : (
            <SubscribeButton />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingSection;
