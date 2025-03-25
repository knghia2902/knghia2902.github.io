"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings } from "lucide-react"
import { LoginModal } from "./login-modal"
import { AdminModal } from "./admin-modal"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = () => {
      const savedLoginStatus = localStorage.getItem("isAdmin")
      if (savedLoginStatus === "true") {
        setIsLoggedIn(true)
      }
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const navHeight = 70

      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - navHeight - 10) {
          current = section.getAttribute("id") || ""
        }
      })

      setActiveSection(current)
    }

    checkLoginStatus()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setIsLoginModalOpen(false)
    setIsAdminModalOpen(true)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    closeMenu()
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: "smooth",
      })
    }
  }

  const goToAdminPage = () => {
    router.push("/admin")
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-background z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Khắc Nghĩa</div>

          <div className="hidden md:flex space-x-8">
            <Link
              href="#home"
              onClick={() => scrollToSection("home")}
              className={`font-medium relative ${activeSection === "home" ? "text-primary" : "text-foreground"}`}
            >
              Trang chủ
              {activeSection === "home" && (
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Link>
            <Link
              href="#about"
              onClick={() => scrollToSection("about")}
              className={`font-medium relative ${activeSection === "about" ? "text-primary" : "text-foreground"}`}
            >
              Giới thiệu
              {activeSection === "about" && (
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Link>
            <Link
              href="#experience"
              onClick={() => scrollToSection("experience")}
              className={`font-medium relative ${activeSection === "experience" ? "text-primary" : "text-foreground"}`}
            >
              Kinh nghiệm
              {activeSection === "experience" && (
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Link>
            <Link
              href="#tutorials"
              onClick={() => scrollToSection("tutorials")}
              className={`font-medium relative ${activeSection === "tutorials" ? "text-primary" : "text-foreground"}`}
            >
              Hướng dẫn
              {activeSection === "tutorials" && (
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Link>
            <Link
              href="#contact"
              onClick={() => scrollToSection("contact")}
              className={`font-medium relative ${activeSection === "contact" ? "text-primary" : "text-foreground"}`}
            >
              Liên hệ
              {activeSection === "contact" && (
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
              )}
            </Link>
            {isLoggedIn ? (
              <Button variant="link" onClick={goToAdminPage} className="font-medium p-0">
                <Settings className="h-4 w-4 mr-2" />
                Quản lý
              </Button>
            ) : (
              <Button variant="link" onClick={() => setIsLoginModalOpen(true)} className="font-medium p-0">
                Đăng nhập
              </Button>
            )}
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-background shadow-md py-4 px-4 absolute w-full">
            <div className="flex flex-col space-y-4">
              <Link
                href="#home"
                onClick={() => scrollToSection("home")}
                className={`font-medium ${activeSection === "home" ? "text-primary" : "text-foreground"}`}
              >
                Trang chủ
              </Link>
              <Link
                href="#about"
                onClick={() => scrollToSection("about")}
                className={`font-medium ${activeSection === "about" ? "text-primary" : "text-foreground"}`}
              >
                Giới thiệu
              </Link>
              <Link
                href="#experience"
                onClick={() => scrollToSection("experience")}
                className={`font-medium ${activeSection === "experience" ? "text-primary" : "text-foreground"}`}
              >
                Kinh nghiệm
              </Link>
              <Link
                href="#tutorials"
                onClick={() => scrollToSection("tutorials")}
                className={`font-medium ${activeSection === "tutorials" ? "text-primary" : "text-foreground"}`}
              >
                Hướng dẫn
              </Link>
              <Link
                href="#contact"
                onClick={() => scrollToSection("contact")}
                className={`font-medium ${activeSection === "contact" ? "text-primary" : "text-foreground"}`}
              >
                Liên hệ
              </Link>
              {isLoggedIn ? (
                <Button
                  variant="link"
                  onClick={() => {
                    closeMenu()
                    goToAdminPage()
                  }}
                  className="font-medium p-0 justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Quản lý
                </Button>
              ) : (
                <Button
                  variant="link"
                  onClick={() => {
                    closeMenu()
                    setIsLoginModalOpen(true)
                  }}
                  className="font-medium p-0 justify-start"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </>
  )
}

