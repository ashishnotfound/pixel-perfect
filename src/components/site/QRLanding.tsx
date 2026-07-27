import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function QRLanding() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center px-6 pt-24 pb-12">
      {/* Background gradients for premium feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <h1 className="font-display text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                Yep... you actually <span className="text-ember">scanned</span> it. 😹
              </h1>
            </div>

            <div className="space-y-4 text-lg md:text-xl text-muted-foreground max-w-md">
              <p className="font-medium text-foreground">
                Welcome to Reyo Studio.
              </p>
              <p className="text-ember">
                Curiosity got you.
              </p>
              <p className="leading-relaxed">
                If a simple QR code could grab your attention... imagine what we can do for <span className="text-foreground font-semibold">your business.</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/work"
                className="bg-ember text-primary-foreground hover:bg-ember/90 inline-flex items-center justify-center rounded-full px-8 py-4 font-mono text-xs font-semibold tracking-[0.18em] uppercase transition-all hover:scale-105 active:scale-95"
              >
                View Our Work
              </Link>
              <Link
                to="/contact"
                className="border-border text-foreground hover:bg-white/5 inline-flex items-center justify-center rounded-full border px-8 py-4 font-mono text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px] aspect-square rounded-full bg-ember/5 flex items-center justify-center border border-white/10 p-8 shadow-2xl overflow-visible">
              {/* Decorative elements around the cat */}
              <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-blue-500/50 animate-pulse" />
              <div className="absolute bottom-20 left-10 w-3 h-3 rounded-full bg-ember/50 animate-pulse delay-300" />
              
              {/* Cat Image */}
              <img 
                src="/cat.png" 
                alt="Silly cat with tongue out" 
                className="relative z-10 w-full h-full object-cover rounded-full shadow-[0_0_40px_rgba(255,90,31,0.2)] mix-blend-lighten"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
