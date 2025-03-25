"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "./rich-text-editor"
import { FileUpload } from "./file-upload"

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  editingTutorial?: Tutorial | null
}

interface Tutorial {
  id?: string
  title: string
  category: string
  date: string
  content: string
  filename?: string
}

export function AdminModal({ isOpen, onClose, editingTutorial }: AdminModalProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [content, setContent] = useState("")
  const [activeTab, setActiveTab] = useState("editor")
  const { toast } = useToast()

  // Reset form when modal opens or editing tutorial changes
  useEffect(() => {
    if (isOpen) {
      if (editingTutorial) {
        setTitle(editingTutorial.title)
        setCategory(editingTutorial.category)
        setDate(editingTutorial.date)
        setContent(editingTutorial.content)
      } else {
        setTitle("")
        setCategory("")
        setDate(new Date().toISOString().split("T")[0])
        setContent("")
      }
      setActiveTab("editor")
    }
  }, [isOpen, editingTutorial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !category || !date || !content) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, you would send this to your backend
      // For now, we'll store it in localStorage
      const tutorials = JSON.parse(localStorage.getItem("tutorials") || "[]")
      const filename = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")

      if (editingTutorial && editingTutorial.id) {
        // Update existing tutorial
        const updatedTutorials = tutorials.map((tutorial: Tutorial) =>
          tutorial.id === editingTutorial.id
            ? {
                ...tutorial,
                title,
                category,
                date,
                content,
                lastUpdated: new Date().toISOString(),
              }
            : tutorial,
        )
        localStorage.setItem("tutorials", JSON.stringify(updatedTutorials))

        toast({
          title: "Thành công",
          description: `Tài liệu "${title}" đã được cập nhật thành công!`,
        })
      } else {
        // Create new tutorial
        const newTutorial = {
          id: Date.now().toString(),
          title,
          category,
          date,
          filename: `${filename}.html`,
          content,
          createdAt: new Date().toISOString(),
        }

        tutorials.push(newTutorial)
        localStorage.setItem("tutorials", JSON.stringify(tutorials))

        toast({
          title: "Thành công",
          description: `Tài liệu "${title}" đã được thêm thành công!`,
        })
      }

      // Reset form and close modal
      setTitle("")
      setCategory("")
      setDate(new Date().toISOString().split("T")[0])
      setContent("")
      onClose()

      // Reload page to show new/updated tutorial
      window.location.reload()
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu tài liệu",
        variant: "destructive",
      })
    }
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  const handleFileContentLoaded = (fileContent: string) => {
    setContent(fileContent)
    setActiveTab("editor")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingTutorial ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tutorialTitle">Tiêu đề</Label>
              <Input id="tutorialTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tutorialCategory">Danh mục</Label>
              <Input id="tutorialCategory" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tutorialDate">Ngày tạo</Label>
            <Input id="tutorialDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Trình soạn thảo</TabsTrigger>
              <TabsTrigger value="upload">Tải lên file Word</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tutorialContent">Nội dung</Label>
                <RichTextEditor content={content} onChange={handleContentChange} />
              </div>
            </TabsContent>
            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-2">
                <Label>Tải lên file Word</Label>
                <FileUpload onContentLoaded={handleFileContentLoaded} />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">{editingTutorial ? "Cập nhật" : "Thêm tài liệu"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

