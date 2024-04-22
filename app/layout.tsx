import type { Metadata } from 'next';
import { Inter, Passion_One } from 'next/font/google';
import { CartProvider } from './context/cart-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const passionOne = Passion_One({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-passion-one',
});

export const metadata: Metadata = {
  title: 'Armageddon',
  description: 'Закажи уничтожение астероидов',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className =
    "before:content-[''] before:fixed before:left-[-329px] before:top-[123px] before:w-[377px] lg:before:left-[-73px] before:h-[436px] before:bg-[url('../public/earth.jpg')] before:bg-no-repeat before:bg-cover";
  return (
    <html lang="ru">
      <body
        className={`${passionOne.variable} ${inter.variable} font-inter ${className}`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
