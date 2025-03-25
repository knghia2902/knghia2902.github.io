"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Server, Cloud, ListTodo, Plus, FileText } from "lucide-react"
import Link from "next/link"

interface Tutorial {
  title: string
  category: string
  description: string
  icon: string
  url: string
}

export function TutorialsSection() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)

    // Load tutorials from localStorage
    const savedTutorials = localStorage.getItem("tutorials")
    if (savedTutorials) {
      try {
        const parsedTutorials = JSON.parse(savedTutorials)
        const formattedTutorials = parsedTutorials.map((tutorial: any) => {
          // Determine icon based on category
          let icon = "file"
          if (
            tutorial.category.toLowerCase().includes("server") ||
            tutorial.category.toLowerCase().includes("proxmox")
          ) {
            icon = "server"
          } else if (
            tutorial.category.toLowerCase().includes("cloud") ||
            tutorial.category.toLowerCase().includes("nextcloud")
          ) {
            icon = "cloud"
          } else if (
            tutorial.category.toLowerCase().includes("project") ||
            tutorial.category.toLowerCase().includes("openproject")
          ) {
            icon = "tasks"
          }

          return {
            title: tutorial.title,
            category: tutorial.category,
            description: `Hướng dẫn chi tiết về ${tutorial.category}.`,
            icon,
            url: `/tutorials/${tutorial.filename.replace(".html", "")}`,
          }
        })

        // Combine default tutorials with saved ones
        setTutorials([...tutorials, ...formattedTutorials])
      } catch (error) {
        console.error("Error parsing tutorials:", error)
      }
    }
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "server":
        return <Server className="h-10 w-10" />
      case "cloud":
        return <Cloud className="h-10 w-10" />
      case "tasks":
        return <ListTodo className="h-10 w-10" />
      default:
        return <Server className="h-10 w-10" />
    }
  }

  return (
    <section id="tutorials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Hướng dẫn</h2>
          <p className="text-lg text-muted-foreground">Tài liệu kỹ thuật</p>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tutorials.length > 0 ? (
            tutorials.map((tutorial, index) => (
              <Card key={index} className="overflow-hidden transition-transform hover:-translate-y-1">
                <div className="bg-primary p-6 flex justify-center">
                  <div className="text-white">{getIcon(tutorial.icon)}</div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{tutorial.title}</h3>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  <Link href={tutorial.url} passHref>
                    <Button variant="outline" size="sm">
                      Xem hướng dẫn
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="mb-4 text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-4" />
                  <p>Chưa có tài liệu hướng dẫn nào.</p>
                  {isAdmin ? (
                    <p className="mt-2">Hãy nhấn vào nút bên dưới để thêm tài liệu mới.</p>
                  ) : (
                    <p className="mt-2">Tài liệu đang được cập nhật. Vui lòng quay lại sau.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {isAdmin ? (
            <Card
              className="w-full max-w-md cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => document.getElementById("loginBtn")?.click()}
            >
              <CardContent className="p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 flex justify-center">
                    <Plus className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Thêm tài liệu mới</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full max-w-md">
              <CardContent className="p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 flex justify-center">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Đang cập nhật thêm tài liệu mới...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

