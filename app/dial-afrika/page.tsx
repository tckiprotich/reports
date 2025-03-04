"use client"

import { useState, useEffect } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
  ArcElement,
  PolarAreaController,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadarController,
  RadialLinearScale,
  ArcElement,
  PolarAreaController,
)

import DialAfrikaHeader from "./components/header"
import DialAfrikaExecutiveSummary from "./components/executive-summary"
import DialAfrikaVisibilityAnalysis from "./components/visibility-analysis"
import DialAfrikaRecommendations from "./components/recommendations"
import DialAfrikaCompetitorAnalysis from "./components/competitor-analysis"
import DialAfrikaBrandMetrics from "./components/brand-metrics"
import DialAfrikaCallToAction from "./components/call-to-action"
import DialAfrikaFooter from "./components/footer"
import { fetchDialAfrikaData } from "./data/fetch-data"

export default function DialAfrikaPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloadingPDF, setDownloadingPDF] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDialAfrikaData()
        setData(result)
      } catch (error) {
        console.error("Error loading Dial Afrika data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const downloadPDF = async () => {
    setDownloadingPDF(true)
    const reportElement = document.getElementById("dial-afrika-report")

    if (!reportElement) {
      console.error("Report element not found")
      setDownloadingPDF(false)
      return
    }

    try {
      const canvas = await html2canvas(reportElement, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", imgX, position, imgWidth * ratio, imgHeight * ratio)
      heightLeft -= pdfHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", imgX, position, imgWidth * ratio, imgHeight * ratio)
        heightLeft -= pdfHeight
      }

      pdf.save("DialAfrika_AI_Visibility_Report.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setDownloadingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="animate-pulse flex space-x-4 mb-6 justify-center">
            <div className="h-12 w-12 rounded-full bg-green-500"></div>
            <div className="flex-1 space-y-4 py-1 max-w-md">
              <div className="h-4 bg-green-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-green-200 rounded"></div>
                <div className="h-4 bg-green-100 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-green-950">Loading your personalized Dial Afrika report...</h2>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-950">Error loading report</h2>
          <p className="text-green-700">Unable to load the report data. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-green-950" id="dial-afrika-report">
      <DialAfrikaHeader 
        downloadPDF={downloadPDF} 
        downloadingPDF={downloadingPDF} 
      />
      <DialAfrikaExecutiveSummary data={data} />
      <DialAfrikaVisibilityAnalysis data={data} />
      <DialAfrikaRecommendations data={data} />
      <DialAfrikaCompetitorAnalysis data={data} />
      <DialAfrikaBrandMetrics data={data} />
      <DialAfrikaCallToAction />
      <DialAfrikaFooter />
    </div>
  )
}
