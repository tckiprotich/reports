// @ts-nocheck
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  downloadPDF: () => Promise<void>
  downloadingPDF: boolean
}

const GustoHeader = ({ downloadPDF, downloadingPDF }: HeaderProps) => {
  return (
    <header className="py-10 px-6 md:px-10 lg:px-16 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="text-purple-500">Gusto</span> AI Visibility Report
            </h1>
            <p className="text-purple-700 text-lg">
              AI is the new search. <span className="text-purple-500 font-medium">Lantern</span> is the new SEO.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            
          </div>
        </div>
        <div className="mt-6 inline-block bg-purple-100 rounded-lg px-4 py-2">
          <p className="text-sm text-purple-700">Generated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </header>
  )
}

export default GustoHeader
