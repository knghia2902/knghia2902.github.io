"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TutorialManagement } from "@/components/tutorial-management"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)
    setIsLoading(false)

    if (!adminStatus) {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Trang quản trị</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </Button>
        </div>

        <div className="space-y-8">
          <TutorialManagement />
        </div>
      </div>
      <Footer />
    </div>
  )
}

