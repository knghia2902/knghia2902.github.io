import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  const skills = [
    { name: "Quản trị hệ thống ảo hóa", level: 95 },
    { name: "Quản trị hệ thống lưu trữ", level: 90 },
    { name: "Quản trị hệ thống mạng", level: 85 },
    { name: "Bảo mật hệ thống", level: 80 },
    { name: "Giám sát hệ thống", level: 90 },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Giới thiệu</h2>
          <p className="text-lg text-muted-foreground">Thông tin cá nhân</p>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 pb-4 border-b">Thông tin cá nhân</h3>
                <ul className="space-y-3">
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Họ tên:</span> Bùi Khắc Nghĩa
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Ngày sinh:</span> 29/02/2000
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Giới tính:</span> Nam
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Địa chỉ:</span> Ông Trịnh, Phường Tân Phước, Tx Phú Mỹ, BRVT
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 pb-4 border-b">Liên hệ</h3>
                <ul className="space-y-3">
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Số điện thoại:</span> 0583392700
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Email:</span>
                    <a href="mailto:knghia2902@gmail.com" className="text-primary hover:underline">
                      knghia2902@gmail.com
                    </a>
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-medium w-32">Website:</span>
                    <a
                      href="https://github.com/knghia2902"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      github.com/knghia2902
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b">Kỹ năng chuyên môn</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

