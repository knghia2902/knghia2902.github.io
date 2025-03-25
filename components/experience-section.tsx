import { Card, CardContent } from "@/components/ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      company: "Long Vân System Solution",
      period: "2023 - Hiện tại",
      position: "IT SYSTEM",
      responsibilities: [
        "Quản lý, kiểm tra và cấu hình các dòng server Dell, Hp, Lenovo, Cisco, IBM, ...",
        "Triển khai lắp đặt server cấu hình các dịch vụ cho khách hàng",
        "Triển khai hệ thống ảo hóa Proxmox - Ceph, Proxmox Backup, Esxi - Vsan, PetaSan",
        "Triển khai hệ thống S3 Storage, NFS Gateway, iSCSI gateway, Consul + Traek Proxy",
        "Giám sát hệ thống ảo hóa bằng phần mềm chuyên dụng (Grafana, Prometheus, Zabbix, ...)",
      ],
    },
    {
      company: "Hòa Phát Container",
      period: "2021 - 2023",
      position: "System Administrator",
      responsibilities: [
        "Quản trị giám sát và bảo trì hệ thống camera",
        "Bảo trì các thiết bị văn phòng như máy in, hệ thống camera CCTV, hệ thống ACS v.v.",
        "Xử lý sự cố thiết bị văn phòng (Phần mềm/phần cứng máy tính, hệ thống điện thoại, cài đặt phòng họp).",
        "Triển khai Nextcloud + OpenProject (Quản lý File, Talk và quản lý công việc) dùng thay thế Office 365",
        "Triển khai hệ thống ảo hóa Proxmox, Proxmox Backup Server giúp tối ưu hóa tài nguyên khi sử dụng Server vật lý tăng khả năng dự phòng",
        "Nghiên cứu triển khai Crowdsec phân tích logs ngăn chặn tấn công mạng",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Kinh nghiệm</h2>
          <p className="text-lg text-muted-foreground">Quá trình làm việc</p>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="relative timeline max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-12 relative pl-12 md:pl-0 md:pt-8 timeline-item">
              <div className="absolute top-0 left-0 timeline-dot"></div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b">
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <span className="text-primary font-medium">{exp.period}</span>
                  </div>
                  <h4 className="text-lg font-medium mb-4">{exp.position}</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                      >
                        {resp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

