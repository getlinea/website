"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Globe, Zap, Cloud, Github, Database, CheckCircle2, Sparkles, CreditCard, Receipt, FileText } from 'lucide-react'
import Image from 'next/image'
import { AIInputWithSuggestions } from './ai-input-with-suggestions'
import { motion } from 'framer-motion'

export function Features() {
    return (
        <section className="bg-background text-foreground dark min-h-screen flex items-center py-4 sm:py-6 md:py-8 lg:py-12">
            <div className="mx-auto max-w-5xl px-2 sm:px-3 md:px-4 lg:px-6 w-full">
                <div className="mx-auto grid gap-1.5 sm:grid-cols-5">
                    <motion.div
                        className="sm:col-span-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Card className="group overflow-hidden shadow-black/5 flex flex-col justify-between sm:rounded-none sm:rounded-tl-xl h-full border-zinc-800 bg-zinc-950/50 backdrop-blur-md">
                            <CardHeader className="p-3 sm:p-4 md:p-5">
                                <div className="text-zinc-100">
                                    <p className="text-base sm:text-lg md:text-xl font-semibold">Universal Context Strategy</p>
                                    <p className="text-zinc-400 mt-1 sm:mt-1.5 md:mt-2 max-w-sm text-[10px] sm:text-xs md:text-sm leading-relaxed">Build sophisticated pipelines by dynamically connecting any MCP server through an intuitive drag-and-drop canvas.</p>
                                </div>
                            </CardHeader>

                            <div className="relative h-fit px-2 pb-2 sm:px-3 sm:pb-3 md:pl-6 md:pr-2 lg:pl-10 lg:pr-4 lg:pb-6">
                                <div className="relative bg-zinc-900 rounded-xl border border-zinc-800 p-1.5 shadow-2xl dark:bg-zinc-950">
                                    <AIInputWithSuggestions
                                        placeholder="Ask AI to review your latest expenses..."
                                        className="py-0"
                                    />
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        className="sm:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    >
                        <Card className="group overflow-hidden shadow-zinc-950/5 sm:rounded-none sm:rounded-tr-xl h-full border-zinc-800 bg-zinc-950/50 backdrop-blur-md">
                            <CardHeader className="p-3 sm:p-4 md:p-5">
                                <div className="text-zinc-100 text-center sm:text-left">
                                    <p className="text-base sm:text-lg md:text-xl font-semibold">The Intelligence Layer</p>
                                    <p className="text-zinc-400 mt-1 sm:mt-1.5 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">Seamlessly connect any custom or community MCP server to your workflows and build powerful agents.</p>
                                </div>
                            </CardHeader>

                            <CardContent className="mt-auto h-fit p-2 sm:p-3 md:p-4">
                                <div className="relative mb-2 sm:mb-0">
                                    <div className="absolute -inset-6 [background:radial-gradient(50%_75%_at_75%_50%,transparent,#09090b_100%)]"></div>
                                    <div className="aspect-76/59 overflow-hidden rounded-r-lg border border-zinc-800">
                                        <Image
                                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&q=80"
                                            className="hidden dark:block object-cover grayscale opacity-60"
                                            alt="financial dashboard dark"
                                            width={1207}
                                            height={929}
                                        />
                                        <Image
                                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=900&fit=crop&q=80"
                                            className="shadow dark:hidden object-cover grayscale opacity-60"
                                            alt="financial dashboard light"
                                            width={1207}
                                            height={929}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        className="sm:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    >
                        <Card className="group p-3 sm:p-4 md:p-5 shadow-black/5 sm:rounded-none sm:rounded-bl-xl flex flex-col justify-between overflow-hidden h-full border-zinc-800 bg-zinc-950/50 backdrop-blur-md">
                            <CardHeader className="p-0 mb-1.5 sm:mb-2 text-zinc-100">
                                <div className="text-zinc-100 text-center sm:text-left">
                                    <p className="text-base sm:text-lg md:text-xl font-semibold">Secure Execution & Output</p>
                                    <p className="text-zinc-400 mt-1 sm:mt-1.5 md:mt-2 text-[10px] sm:text-xs md:text-sm leading-relaxed">Execute complex tasks securely with human-in-the-loop approval gates and bulletproof action logs.</p>
                                </div>
                            </CardHeader>
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 relative mt-1.5 sm:mt-2 mb-2 sm:mb-3 md:mb-4 scale-[0.8] sm:scale-90 md:scale-100">
                                <div className="flex flex-col gap-1.5 shrink-0">
                                    <div className="size-11 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center shadow-sm">
                                        <CreditCard className="size-6 text-zinc-600" />
                                    </div>
                                    <div className="size-11 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center shadow-sm translate-x-1">
                                        <Receipt className="size-6 text-zinc-600" />
                                    </div>
                                    <div className="size-11 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center shadow-sm">
                                        <FileText className="size-6 text-zinc-600" />
                                    </div>
                                </div>
                                <div className="relative w-10 h-px bg-white/5 overflow-hidden shrink-0">
                                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full h-full -translate-x-full animate-[shimmer_3s_infinite]"></div>
                                </div>
                                <div className="size-12 rounded-full bg-blue-500/5 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative">
                                    <Sparkles className="size-6 text-blue-400 animate-pulse" />
                                    <div className="absolute inset-0 rounded-full border border-blue-500/30 scale-125 animate-ping opacity-20"></div>
                                </div>

                                {/* Second Horizontal Flow */}
                                <div className="relative w-12 h-px bg-white/5 overflow-hidden shrink-0">
                                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                </div>

                                {/* Result Block */}
                                <div className="size-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.15)] animate-pulse-glow">
                                    <CheckCircle2 className="size-7 text-blue-500" />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                    <motion.div
                        className="sm:col-span-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                    >
                        <Card className="group relative shadow-black/5 sm:rounded-none sm:rounded-br-xl h-full border-zinc-800 bg-zinc-950/50 backdrop-blur-md">
                            <CardHeader className="p-3 sm:p-4 md:p-5 text-zinc-100">
                                <p className="text-base sm:text-lg md:text-xl font-semibold">Embedded & Programmable</p>
                                <p className="text-zinc-400 mt-1 sm:mt-1.5 md:mt-2 max-w-sm text-[10px] sm:text-xs md:text-sm leading-relaxed">Run your customized agent workflows dynamically via APIs, webhooks, or scalable job queues.</p>
                            </CardHeader>
                            <CardContent className="relative h-fit p-2 sm:p-3 md:p-5 pt-0 md:pt-0">
                                <div className="grid grid-cols-4 gap-1.5 md:grid-cols-6">
                                    <div className="rounded-lg aspect-square border border-dashed border-zinc-700/50"></div>
                                    <div className="rounded-lg bg-zinc-900/50 flex aspect-square items-center justify-center border border-zinc-800 p-1.5">
                                        <Zap className="size-5 text-zinc-400" />
                                    </div>
                                    <div className="rounded-lg aspect-square border border-dashed border-zinc-700/50"></div>
                                    <div className="rounded-lg bg-zinc-900/50 flex aspect-square items-center justify-center border border-zinc-800 p-1.5">
                                        <Cloud className="size-5 text-zinc-400" />
                                    </div>
                                    <div className="rounded-lg aspect-square border border-dashed border-zinc-700/50"></div>
                                    <div className="rounded-lg bg-zinc-900/50 flex aspect-square items-center justify-center border border-zinc-800 p-1.5">
                                        <Github className="size-5 text-zinc-400" />
                                    </div>
                                    <div className="rounded-lg bg-zinc-900/50 flex aspect-square items-center justify-center border border-zinc-800 p-1.5">
                                        <Database className="size-5 text-zinc-400" />
                                    </div>
                                    <div className="rounded-lg aspect-square border border-dashed border-zinc-700/50"></div>
                                    <div className="rounded-lg bg-zinc-900/50 flex aspect-square items-center justify-center border border-zinc-800 p-1.5">
                                        <Zap className="size-5 text-zinc-400 transform rotate-180" />
                                    </div>
                                    <div className="rounded-lg aspect-square border border-dashed border-zinc-700/50"></div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
