import React from 'react';
import '@/styles/globals.css';
import {AppStore} from "@/app/AppStore";

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <AppStore>
                <body>
                    {children}
                </body>
            </AppStore>
        </html>
    );
}
