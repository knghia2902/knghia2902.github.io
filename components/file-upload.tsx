"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import mammoth from "mammoth"

interface FileUploadProps {
  onContentLoaded: (content: string) => void
}

export function FileUpload({ onContentLoaded }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check if file is a Word document
      if (
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selectedFile.type === "application/msword"
      ) {
        setFile(selectedFile)
      } else {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn file Word (.doc hoặc .docx)",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsLoading(true)

    try {
      const arrayBuffer = await file.arrayBuffer()

      // Convert Word document to HTML
      const result = await mammoth.convertToHtml({ arrayBuffer })
      const html = result.value

      onContentLoaded(html)

      toast({
        title: "Thành công",
        description: "Đã tải lên và chuyển đổi file Word thành công",
      })

      // Reset file
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error converting Word document:", error)
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi chuyển đổi file Word",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2" />
          Chọn file Word
        </Button>

        {file && (
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {file && (
        <Button type="button" onClick={handleUpload} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Tải lên và chuyển đổi"}
        </Button>
      )}
    </div>
  )
}

