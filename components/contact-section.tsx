"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Github } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin!",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this to your backend
    toast({
      title: "Gửi tin nhắn thành công",
      description: "Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const contactItems = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Điện thoại",
      content: "0583392700",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "knghia2902@gmail.com",
      isLink: true,
      href: "mailto:knghia2902@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Địa chỉ",
      content: "Ông Trịnh, Phường Tân Phước, Tx Phú Mỹ, BRVT",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      content: "github.com/knghia2902",
      isLink: true,
      href: "https://github.com/knghia2902",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Liên hệ</h2>
          <p className="text-lg text-muted-foreground">Kết nối với tôi</p>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <Card key={index} className="overflow-hidden transition-transform hover:-translate-y-1">
                <CardContent className="p-6 flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    {item.isLink ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Họ tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Tiêu đề"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Nội dung tin nhắn"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Gửi tin nhắn
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

