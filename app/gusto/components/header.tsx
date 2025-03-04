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
            <Button
              onClick={downloadPDF}
              disabled={downloadingPDF}
              className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {downloadingPDF ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Report
                </>
              )}
            </Button>
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
