import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We've integrated Agmentic, a powerful stack of AI agents, into our advertising workflows. It has really started transforming how our specialists work by automating analysis and surfacing deep actionable insights, while we remain in control of strategic decisions.",
    name: "John Axelsson",
    title: "CEO of BBO",
  },
  {
    quote: "Agmentic has become a valuable part of our workflow. By automating parts of our agency's know-how through AI agents, we can get insights faster, optimize more efficiently, and deliver higher quality to our clients.",
    name: "Jenny Dettervik",
    title: "Media Lead, Remotion",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto space-y-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-display italic leading-relaxed text-foreground/90 mb-8">
              "{t.quote}"
            </blockquote>
            <div>
              <p className="font-medium text-foreground">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
