"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AdminModal } from "./admin-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Tutorial {
  id: string
  title: string
  category: string
  date: string
  content: string
  filename?: string
  createdAt?: string
  lastUpdated?: string
}

export function TutorialManagement() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null)
  const [tutorialToDelete, setTutorialToDelete] = useState<Tutorial | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load tutorials from localStorage
    const savedTutorials = localStorage.getItem("tutorials")
    if (savedTutorials) {
      try {
        const parsedTutorials = JSON.parse(savedTutorials)
        setTutorials(parsedTutorials)
      } catch (error) {
        console.error("Error parsing tutorials:", error)
      }
    }
  }, [])

  const handleAddTutorial = () => {
    setEditingTutorial(null)
    setIsAdminModalOpen(true)
  }

  const handleEditTutorial = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial)
    setIsAdminModalOpen(true)
  }

  const handleDeleteTutorial = (tutorial: Tutorial) => {
    setTutorialToDelete(tutorial)
  }

  const confirmDelete = () => {
    if (!tutorialToDelete) return

    try {
      const updatedTutorials = tutorials.filter((tutorial) => tutorial.id !== tutorialToDelete.id)

      localStorage.setItem("tutorials", JSON.stringify(updatedTutorials))
      setTutorials(updatedTutorials)

      toast({
        title: "Thành công",
        description: `Tài liệu "${tutorialToDelete.title}" đã được xóa thành công!`,
      })

      setTutorialToDelete(null)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa tài liệu",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Quản lý tài liệu</CardTitle>
        <Button onClick={handleAddTutorial}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm tài liệu
        </Button>
      </CardHeader>
      <CardContent>
        {tutorials.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Chưa có tài liệu nào. Hãy thêm tài liệu mới!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Cập nhật lần cuối</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tutorials.map((tutorial) => (
                  <TableRow key={tutorial.id}>
                    <TableCell className="font-medium">{tutorial.title}</TableCell>
                    <TableCell>{tutorial.category}</TableCell>
                    <TableCell>{formatDate(tutorial.date)}</TableCell>
                    <TableCell>{tutorial.lastUpdated ? formatDate(tutorial.lastUpdated) : "Chưa cập nhật"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditTutorial(tutorial)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteTutorial(tutorial)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <AdminModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          editingTutorial={editingTutorial}
        />

        <AlertDialog open={!!tutorialToDelete} onOpenChange={() => setTutorialToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa tài liệu "{tutorialToDelete?.title}"? Hành động này không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

