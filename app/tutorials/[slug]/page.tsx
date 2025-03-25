"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Folder, ArrowLeft, Trash2, Edit, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AdminModal } from "@/components/admin-modal"

interface TutorialData {
  id?: string
  title: string
  category: string
  date: string
  content: string
}

export default function TutorialPage() {
  const params = useParams()
  const router = useRouter()
  const { slug } = params
  const [tutorial, setTutorial] = useState<TutorialData | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)

    // Load tutorial data
    const savedTutorials = localStorage.getItem("tutorials")
    if (savedTutorials) {
      try {
        const parsedTutorials = JSON.parse(savedTutorials)
        const foundTutorial = parsedTutorials.find((t: any) => t.filename === `${slug}.html` || t.filename === slug)

        if (foundTutorial) {
          setTutorial(foundTutorial)
        }
      } catch (error) {
        console.error("Error parsing tutorials:", error)
      }
    }

    setIsLoading(false)
  }, [slug])

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài hướng dẫn này?")) {
      const savedTutorials = localStorage.getItem("tutorials")
      if (savedTutorials) {
        try {
          const parsedTutorials = JSON.parse(savedTutorials)
          const updatedTutorials = parsedTutorials.filter(
            (t: any) => t.filename !== `${slug}.html` && t.filename !== slug,
          )

          localStorage.setItem("tutorials", JSON.stringify(updatedTutorials))

          toast({
            title: "Xóa thành công",
            description: "Bài hướng dẫn đã được xóa thành công",
          })

          // Redirect to home page
          router.push("/#tutorials")
        } catch (error) {
          console.error("Error deleting tutorial:", error)
          toast({
            title: "Lỗi",
            description: "Có lỗi xảy ra khi xóa bài hướng dẫn",
            variant: "destructive",
          })
        }
      }
    }
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <p>Đang tải...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!tutorial) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-32 flex flex-col items-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài hướng dẫn</h1>
          <Link href="/#tutorials">
            <Button>Quay lại danh sách hướng dẫn</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-4">{tutorial.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(tutorial.date).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex items-center">
                  <Folder className="h-4 w-4 mr-2" />
                  <span>{tutorial.category}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-blue max-w-none mb-8" dangerouslySetInnerHTML={{ __html: tutorial.content }} />

            <div className="flex justify-between items-center pt-6 border-t">
              <Link href="/#tutorials" className="flex items-center text-primary hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại danh sách hướng dẫn
              </Link>

              {isAdmin && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Sửa
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />

      {tutorial && (
        <AdminModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} editingTutorial={tutorial} />
      )}
    </div>
  )
}

