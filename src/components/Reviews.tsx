"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Anna Kowalska",
    date: "2 days ago",
    text: "The best cleaning service I've ever used in Warsaw. Professional, punctual, and the house looks amazing!",
    rating: 5
  },
  {
    name: "Piotr Nowak",
    date: "1 week ago",
    text: "Great experience with the deep cleaning service. They managed to clean things I thought were impossible to fix.",
    rating: 5
  },
  {
    name: "Maria Schmidt",
    date: "2 weeks ago",
    text: "Very convenient subscription model. I don't have to worry about booking every time, and the quality is always consistent.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-text mb-4"
          >
            What our <span className="text-primary">customers say</span>
          </motion.h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <span className="ml-2 font-bold text-text">4.9/5</span>
          </div>
          <p className="text-text/60 font-medium">Based on 2,000+ verified reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-xl shadow-blue-100/30 border border-blue-50 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-50" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-text/80 font-medium leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between border-t border-blue-50 pt-6">
                <span className="font-bold text-text">{review.name}</span>
                <span className="text-xs font-bold text-text/40 uppercase tracking-widest">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
