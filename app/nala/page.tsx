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

import NalaHeader from "./components/header"
import NalaExecutiveSummary from "./components/executive-summary"
import NalaVisibilityAnalysis from "./components/visibility-analysis"
import NalaRecommendations from "./components/recommendations"
import NalaCompetitorAnalysis from "./components/competitor-analysis"
import NalaBrandMetrics from "./components/brand-metrics"
import NalaCallToAction from "./components/call-to-action"
import NalaFooter from "./components/footer"
import { fetchNalaData } from "./data/fetch-data"

export default function NalaPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloadingPDF, setDownloadingPDF] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchNalaData()
        setData(result)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const downloadPDF = async () => {
    if (downloadingPDF) return

    try {
      setDownloadingPDF(true)
      
      const report = document.getElementById("nala-report")
      if (!report) return

      const canvas = await html2canvas(report, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      
      // Calculate PDF dimensions based on canvas size
      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? "landscape" : "portrait",
        unit: "mm",
      })
      
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight)
      pdf.save("NALA-AI-Visibility-Report.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setDownloadingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-800 text-lg">Loading NALA's AI visibility report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-blue-950" id="nala-report">
      <NalaHeader 
        downloadPDF={downloadPDF} 
        downloadingPDF={downloadingPDF} 
      />
      <NalaExecutiveSummary data={data} />
      <NalaVisibilityAnalysis data={data} />
      <NalaRecommendations data={data} />
      <NalaCompetitorAnalysis data={data} />
      <NalaBrandMetrics data={data} />
      <NalaCallToAction />
      <NalaFooter />
    </div>
  )
}
