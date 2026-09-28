import { FeaturedProperty } from "@/components/home/FeaturedProperty";
import { Hero } from "@/components/home/Hero";
import {
  HomeCollectionsPreview,
  HomeCTA,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperty />
      <HomeCollectionsPreview />
      <HomeCTA />
    </>
  );
}
