"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Bùi Khắc Nghĩa</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-5">IT System & IT Network Specialist</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Chuyên gia về hệ thống ảo hóa, lưu trữ và giải pháp mạng doanh nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollToSection("contact")}>
                Liên hệ
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection("experience")}>
                Kinh nghiệm
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl">
              <Image
                src="https://avatar.iran.liara.run/public"
                alt="Bùi Khắc Nghĩa"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

