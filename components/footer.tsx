import Link from "next/link"
import { Facebook, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-8 border-b border-gray-800">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Bùi Khắc Nghĩa</h3>
            <p className="text-gray-400">IT System & IT Network Specialist</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/knghia2902"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Bùi Khắc Nghĩa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

