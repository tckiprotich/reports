// @ts-nocheck
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  downloadPDF: () => void
  downloadingPDF: boolean
}

const DialAfrikaHeader = ({ downloadPDF, downloadingPDF }: HeaderProps) => {
  return (
    <header className="w-full bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-green-900 font-bold text-xl">L</span>
            </div>
            <div>
              <p className="text-xs text-green-200">POWERED BY</p>
              <p className="font-bold">Lantern AI</p>
            </div>
          </div>
          <Button
            onClick={downloadPDF}
            disabled={downloadingPDF}
            size="sm"
            variant="outline"
            className="text-white border-white hover:bg-white/10 flex items-center space-x-1"
          >
            <Download className="h-4 w-4 mr-1" />
            {downloadingPDF ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
        <div className="py-16 md:py-24 text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6">
            <span className="text-green-900 font-bold text-3xl">DA</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Dial Afrika AI Visibility Report
          </h1>
          <p className="text-xl md:text-2xl text-green-200 max-w-3xl mx-auto">
            Analysis of Dial Afrika's representation across major AI platforms and strategies to optimize visibility.
          </p>
          <div className="mt-12 flex justify-center space-x-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center mb-2 mx-auto">
                <span className="text-white font-bold text-sm">GPT</span>
              </div>
              <p className="text-sm text-green-200">OpenAI</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center mb-2 mx-auto">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <p className="text-sm text-green-200">Google</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-800 flex items-center justify-center mb-2 mx-auto">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <p className="text-sm text-green-200">Perplexity</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DialAfrikaHeader
