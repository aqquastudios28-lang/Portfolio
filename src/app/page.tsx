import { Capabilities } from "@/components/home/Capabilities";
import { ContactCta } from "@/components/home/ContactCta";
import { DesignTeaser } from "@/components/home/DesignTeaser";
import { Hero } from "@/components/home/Hero";
import { MemoryFootprint } from "@/components/home/MemoryFootprint";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Toolkit } from "@/components/home/Toolkit";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MemoryFootprint />
      <SelectedWork />
      <Toolkit />
      <DesignTeaser />
      <Capabilities />
      <ContactCta />
    </>
  );
}
