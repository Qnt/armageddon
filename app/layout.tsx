import type { Metadata } from 'next';
import { Inter, Passion_One } from 'next/font/google';

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
  return (
    <html lang="ru">
      <body className={`${passionOne.variable} ${inter.variable} font-inter`}>
        {/* <div className="fixed h-screen w-screen -left-">
          <Image
            src={earth}
            alt="Earth"
            fill
            sizes="100wv"
            quality={100}
            placeholder="blur"
            className="object-contain"
          />
        </div> */}
        {children}
      </body>
    </html>
  );
}
