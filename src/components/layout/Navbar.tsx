"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import GoldButton from '@/components/ui/GoldButton';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLocale = () => {
        const nextLocale = locale === 'es' ? 'en' : 'es';
        router.replace(pathname, { locale: nextLocale });
    };

    const navLinks = [
        { name: t('inicio'), href: '/' },
        { name: t('servicios'), href: '/servicios' },
        { name: t('comoFunciona'), href: '/como-funciona' },
        { name: t('arquetipos'), href: '/arquetipos' },
        { name: t('confianza'), href: '/confianza' },
        { name: t('faq'), href: '/faq' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-gold-deep/20 py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <Image
                            src="/logo.png"
                            alt="FBS Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-white">
                        <span className="text-gold-deep">₿</span>ROK<span className="text-gold-deep">€</span>R<span className="text-gold-deep font-bold">$</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 hover:text-gold-light transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* CTA + Language Toggle */}
                <div className="hidden lg:flex items-center gap-4">
                    <button
                        onClick={toggleLocale}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold hover:bg-white/5 transition-colors uppercase"
                    >
                        {locale}
                    </button>
                    <GoldButton href="/cotizar" size="sm">
                        {t('cotizar')}
                    </GoldButton>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="relative w-6 h-5">
                        <span
                            className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'
                                }`}
                        />
                        <span
                            className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                                }`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed inset-0 top-[72px] bg-black/95 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
            >
                <div className="flex flex-col p-6 gap-6 h-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-bold text-white hover:text-gold-light border-b border-white/5 pb-4"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mt-auto pb-12 flex flex-col gap-4">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Language</span>
                            <button
                                onClick={toggleLocale}
                                className="px-4 py-2 rounded-lg bg-gold-deep text-black font-bold text-sm uppercase"
                            >
                                {locale === 'es' ? 'English' : 'Español'}
                            </button>
                        </div>
                        <GoldButton href="/cotizar" size="lg" className="w-full">
                            {t('cotizar')}
                        </GoldButton>
                    </div>
                </div>
            </div>
        </nav>
    );
}
