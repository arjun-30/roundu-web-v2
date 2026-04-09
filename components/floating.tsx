'use client';

import { motion } from 'framer-motion';
import {
    Zap, Droplets, Car, Wrench, Sparkles, Paintbrush, Hammer,
    Wind, Bug, Key, Scissors, Leaf, Tv, Refrigerator, ShieldCheck,
} from 'lucide-react';

const services = [
    { icon: Zap, label: 'Electric', x: -340, y: -180, delay: 0.0, size: 64 },
    { icon: Droplets, label: 'Plumbing', x: 380, y: -220, delay: 0.3, size: 70 },
    { icon: Car, label: 'Car Wash', x: -420, y: 140, delay: 0.6, size: 68 },
    { icon: Wrench, label: 'Mechanic', x: 360, y: 200, delay: 0.9, size: 66 },
    { icon: Sparkles, label: 'Cleaning', x: -280, y: -40, delay: 1.2, size: 58 },
    { icon: Paintbrush, label: 'Painting', x: 280, y: -60, delay: 1.5, size: 60 },
    { icon: Hammer, label: 'Carpenter', x: -480, y: -30, delay: 1.8, size: 62 },
    { icon: Wind, label: 'AC Repair', x: 460, y: 30, delay: 2.1, size: 60 },
    { icon: Bug, label: 'Pest Ctrl', x: -200, y: -300, delay: 2.4, size: 56 },
    { icon: Key, label: 'Locksmith', x: 220, y: -320, delay: 2.7, size: 54 },
    { icon: Scissors, label: 'Salon', x: -180, y: 280, delay: 3.0, size: 56 },
    { icon: Leaf, label: 'Gardening', x: 190, y: 300, delay: 3.3, size: 58 },
    { icon: Tv, label: 'TV Repair', x: -520, y: 240, delay: 3.6, size: 54 },
    { icon: Refrigerator, label: 'Fridge', x: 520, y: -150, delay: 3.9, size: 56 },
    { icon: ShieldCheck, label: 'Verified', x: 0, y: -360, delay: 4.2, size: 60 },
];

export default function FloatingServices() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '2000px' }}>
            {services.map((service, i) => {
                const Icon = service.icon;
                return (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                            filter: 'blur(20px)',
                        }}
                        animate={{
                            opacity: [0, 0.9, 0.55],
                            scale: [0, 1.3, 1],
                            x: service.x,
                            y: service.y,
                            filter: ['blur(20px)', 'blur(0px)', 'blur(0px)'],
                        }}
                        transition={{
                            duration: 1.8,
                            delay: service.delay,
                            ease: [0.23, 1, 0.32, 1],
                            times: [0, 0.6, 1],
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                                rotate: [0, 3, -3, 0],
                            }}
                            transition={{
                                duration: 4 + i * 0.3,
                                delay: service.delay + 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div
                                className="relative rounded-2xl flex items-center justify-center"
                                style={{
                                    width: service.size,
                                    height: service.size,
                                    background: 'rgba(7, 21, 39, 0.75)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(245, 158, 11, 0.35)',
                                    boxShadow: '0 0 30px rgba(245, 158, 11, 0.3), 0 0 60px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl"
                                    style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), transparent)' }}
                                />

                                <Icon
                                    className="relative text-amber-400"
                                    style={{
                                        width: service.size * 0.45,
                                        height: service.size * 0.45,
                                        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))',
                                    }}
                                    strokeWidth={2}
                                />

                                <motion.div
                                    className="absolute inset-0 rounded-2xl border border-amber-500/30"
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        opacity: [0.6, 0, 0.6],
                                    }}
                                    transition={{
                                        duration: 3,
                                        delay: service.delay + 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 2, 1.5],
                    opacity: [0, 0.8, 0.3],
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-500/30 blur-3xl pointer-events-none"
            />
        </div>
    );
}