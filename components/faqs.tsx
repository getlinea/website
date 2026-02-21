import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export function FaqsSection() {
	return (
		<div className="mx-auto w-full max-w-3xl space-y-4 sm:space-y-6 md:space-y-7 px-3 sm:px-4 pt-12 sm:pt-14 md:pt-16 bg-transparent">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="space-y-1.5 sm:space-y-2 text-center"
			>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100">Frequently Asked Questions</h2>
				<p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base px-2 sm:px-0">
					Everything you need to know about Linea. If
					you don&apos;t find the answer you&apos;re looking for, feel free to reach out.
				</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-50px" }}
				transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
			>
				<Accordion
					type="single"
					collapsible
					className="w-full -space-y-px rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm"
					defaultValue="item-1"
				>
					{questions.map((item) => (
						<AccordionItem
							value={item.id}
							key={item.id}
							className="relative border-b border-zinc-800 last:border-0"
						>
							<AccordionTrigger className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-sm sm:text-[15px] leading-6 hover:no-underline text-zinc-300 hover:text-zinc-100 transition-colors text-left">
								{item.title}
							</AccordionTrigger>
							<AccordionContent className="text-zinc-500 pb-3 sm:pb-4 md:pb-5 px-3 sm:px-4 md:px-6 leading-relaxed text-xs sm:text-sm md:text-base">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
				<p className="text-zinc-500 text-center text-xs sm:text-sm px-3 sm:px-0 mt-6 mt-4">
					Can&apos;t find what you&apos;re looking for? Contact our{' '}
					<a href="mailto:hello@getlinea.app" className="text-zinc-300 hover:text-zinc-100 transition-colors hover:underline">
						customer support team
					</a>
				</p>
			</motion.div>
		</div>
	);
}

const questions = [
	{
		id: "item-1",
		title: "How does Linea differ from Mysta or other AI platforms?",
		content: "Unlike other platforms, Linea is built natively around a Universal MCP architecture. We empower you to design complex pipelines using your preferred LLMs dynamically connected to any tools."
	},
	{
		id: "item-2",
		title: "Which tools and MCP servers do you support?",
		content: "Linea seamlessly connects with Github, Slack, Stripe, Postgres and any other custom or community MCP server, enabling truly universal AI connectivity."
	},
	{
		id: "item-3",
		title: "How accurate is the AI reasoning?",
		content: "Our system achieves state-of-the-art accuracy by leveraging leading frontier models (like Claude and OpenAI) coupled with sandboxed code execution, allowing agents to reliably complete multi-step tasks."
	},
	{
		id: "item-4",
		title: "Is my data secure?",
		content: "We use bank-level AES-256 encryption and partner with SOC2-compliant providers. We maintain secure API access to your sources and follow strict immutable data patterns for your workflow audit trail."
	}
];

