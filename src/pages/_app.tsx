import "@/styles/globals.scss";
import { Fraunces, DM_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pageProps.messages}
      timeZone="Europe/Rome"
    >
      <div className={`app ${sans.variable} ${serif.variable}`}>
        <Component {...pageProps} />
      </div>
    </NextIntlClientProvider>
  );
}
