"use client"

import { useState, useEffect } from "react"
import { Bar, Line, Radar, PolarArea } from "react-chartjs-2"
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
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
// Add these imports at the top of the file
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
  TrendingUp,
  Users,
  Eye,
  PieChart,
  BarChart3,
  Download,
  CheckCircle,
  AlertCircle,
  Table,
  Badge,
  TrendingDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"

// Register ChartJS components
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

// Add this function to process competitor data
const processCompetitorData = (data) => {
  return data
    .map((item) => {
      const model = item.model
      let competitor = null

      if (model === "gemini" && Array.isArray(item.competitorComparison)) {
        competitor = item.competitorComparison[0] // Take the first competitor for gemini
      } else if (item.competitorComparison) {
        competitor = item.competitorComparison
      }

      if (!competitor) return null

      return {
        model,
        competitorName: competitor.competitorName,
        sentimentComparison: competitor.sentimentComparison,
        visibilityDifference: competitor.visibilityComparison?.visibilityDifference || 0,
      }
    })
    .filter(Boolean)
}

// Add this function to process brand metrics data
const processBrandMetricsData = (data) => {
  const metrics = ["brandAwareness", "brandEngagement", "marketShare", "netPromoterScore", "customerSatisfaction"]
  const result = []

  metrics.forEach((metric) => {
    const item = { name: metric }
    data.forEach((platform) => {
      if (platform.brandMetrics && platform.brandMetrics[metric] !== undefined) {
        item[platform.model] = platform.brandMetrics[metric]
      }
    })
    result.push(item)
  })

  return result
}

// Add this function to process trend data
const processTrendData = (data) => {
  const trends = ["monthlyTrend", "quarterlyTrend"]
  const result = []

  trends.forEach((trend) => {
    const item = { name: trend }
    data.forEach((platform) => {
      if (platform.trendAnalysis && platform.trendAnalysis[trend] !== undefined) {
        item[platform.model] = platform.trendAnalysis[trend]
      }
    })
    result.push(item)
  })

  return result
}

const GumloopPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloadingPDF, setDownloadingPDF] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, we'll simulate loading data
    setTimeout(() => {
      // Updated mock data with complete competitor information
      const mockData = [
        {
          model: "OpenAI",
          aggregatedRepresentation: {
            visibilityScore: 71,
            sentiment: { positive: 72.4, neutral: 24.4, negative: 8.4 },
            mentions: 7.2,
            solutionPrimacy: 64.8,
            interactionRate: 4.8,
            responseRate: 64.2,
          },
          competitorComparison: {
            competitorName: "Make",
            sentimentComparison: {
              betterThan: 42,
              worseThan: 17,
              equalTo: 11.6,
            },
            visibilityComparison: {
              visibilityDifference: -2.2,
            },
          },
          knowledgeGaps: [
            "Detailed product features and specifications",
            "Recent company developments and news",
            "Customer testimonials and case studies",
            "Pricing information and business model",
          ],
          recommendations: [
            "Create comprehensive Wikipedia article about the brand",
            "Publish more technical content on widely referenced platforms",
            "Increase presence in industry publications",
            "Develop case studies that get cited by reputable sources",
          ],
          topRankedTopics: [
            { topicName: "Gumloop technology", relevanceScore: 92.4 },
            { topicName: "Gumloop solutions", relevanceScore: 75.6 },
            { topicName: "Gumloop pricing", relevanceScore: 68.2 },
            {topicName: "Gumloop workflow automations", relevanceScore: 55.8},
          ],
          trendAnalysis: {
            monthlyTrend: 6.8,
            quarterlyTrend: 12.4,
          },
          brandMetrics: {
            brandAwareness: 65.2,
            brandEngagement: 63.4,
            marketShare: 21.2,
            netPromoterScore: 44,
            customerSatisfaction: 87,
          },
        },
        {
          model: "gemini",
          aggregatedRepresentation: {
            visibilityScore: 75,
            sentiment: { positive: 90, neutral: 0, negative: 10 },
            mentions: 8,
            solutionPrimacy: 60,
            interactionRate: 7,
            responseRate: 85,
          },
          competitorComparison: [
            {
              competitorName: "Zapier",
              sentimentComparison: {
                betterThan: 60,
                worseThan: 20,
                equalTo: 20,
              },
              visibilityComparison: {
                visibilityDifference: -20,
              },
            },
            {
              competitorName: "Make.com",
              sentimentComparison: {
                betterThan: 50,
                worseThan: 30,
                equalTo: 20,
              },
              visibilityComparison: {
                visibilityDifference: -10,
              },
            },
          ],
          knowledgeGaps: [
            "Detailed case studies showcasing ROI for enterprise clients",
            "Specific pricing tiers and credit usage details",
            "Deeper insights into the technology stack and AI models used",
          ],
          recommendations: [
            "Develop more in-depth content targeting specific industry use cases",
            "Actively participate in relevant online communities and forums",
            "Create video tutorials demonstrating advanced features and integrations",
          ],
          topRankedTopics: [
            { topicName: "No-code AI Automation", relevanceScore: 95 },
            { topicName: "Workflow Automation", relevanceScore: 85 },
            { topicName: "AI Agents", relevanceScore: 75 },
          ],
          trendAnalysis: {
            monthlyTrend: 3,
            quarterlyTrend: 5,
          },
          brandMetrics: {
            brandAwareness: 50,
            brandEngagement: 65,
            marketShare: 15,
            netPromoterScore: 45,
            customerSatisfaction: 80,
          },
        },
        {
          model: "Perplexity",
          aggregatedRepresentation: {
            visibilityScore: 5,
            sentiment: { positive: 30, neutral: 50, negative: 20 },
            mentions: 3,
            solutionPrimacy: 5,
            interactionRate: 2.8,
            responseRate: 3,
          },
          competitorComparison: {
            competitorName: "Parabola",
            sentimentComparison: {
              betterThan: 0.2,
              worseThan: 0,
              equalTo: 0.8,
            },
            visibilityComparison: {
              visibilityDifference: -0.4,
            },
          },
          knowledgeGaps: ["Detailed product features", "User testimonials and reviews", "Pricing information"],
          recommendations: [
            "Provide more detailed product information",
            "Include user testimonials and case studies",
            "Update information on features and integrations",
          ],
          topRankedTopics: [
            { topicName: "AI automation/AI-powered workflow automation", relevanceScore: 40 },
            { topicName: "No-code platforms", relevanceScore: 30 },
            { topicName: "Workflow automation/Drag-and-drop interface", relevanceScore: 20 },
          ],
          trendAnalysis: {
            monthlyTrend: 2,
            quarterlyTrend: 3.4,
          },
          brandMetrics: {
            brandAwareness: 3.8,
            brandEngagement: 3.4,
            marketShare: 2,
            netPromoterScore: 1.4,
            customerSatisfaction: 1.6,
          },
        },
      ]

      setData(mockData)
      setLoading(false)
    }, 1500)
  }, [])

  const downloadPDF = async () => {
    setDownloadingPDF(true)
    const reportElement = document.getElementById("gumloop-report")

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

      pdf.save("Gumloop_AI_Visibility_Report.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setDownloadingPDF(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <div className="animate-pulse flex space-x-4 mb-6 justify-center">
            <div className="h-12 w-12 rounded-full bg-orange-500"></div>
            <div className="flex-1 space-y-4 py-1 max-w-md">
              <div className="h-4 bg-orange-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-orange-200 rounded"></div>
                <div className="h-4 bg-orange-100 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-orange-950">Loading your personalized report...</h2>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-orange-950">Error loading report</h2>
          <p className="text-orange-700">Unable to load the report data. Please try again.</p>
        </div>
      </div>
    )
  }

  // Process data for charts
  const platforms = data.map((item) => item.model)
  const visibility = data.map((item) => item.aggregatedRepresentation.visibilityScore)
  const sentiment = data.map((item) => item.aggregatedRepresentation.sentiment.positive)

  // Calculate visibility gap to ideal score (100)
  const visibilityGap = platforms.map((platform, index) => ({
    platform,
    current: visibility[index],
    potential: 100 - visibility[index],
  }))

  // Extract knowledge gaps across platforms
  const allKnowledgeGaps = data.flatMap((item) => item.knowledgeGaps)
  const uniqueKnowledgeGaps = [...new Set(allKnowledgeGaps)]

  // Extract recommendations across platforms
  const allRecommendations = data.flatMap((item) => item.recommendations)

  // Extract top topics across platforms
  const topTopics = data.flatMap((item) =>
    item.topRankedTopics.map((topic) => ({
      name: topic.topicName,
      score: topic.relevanceScore,
      platform: item.model,
    })),
  )

  // Process competitor data
  const competitorData = processCompetitorData(data)

  // Process brand metrics data
  const brandMetricsData = processBrandMetricsData(data)

  // Process trend data
  const trendData = processTrendData(data)

  // Chart colors - orange theme
  const chartColors = {
    primary: "rgba(249, 115, 22, 0.8)", // orange-500
    secondary: "rgba(251, 146, 60, 0.8)", // orange-400
    tertiary: "rgba(254, 215, 170, 0.8)", // orange-200
    quaternary: "rgba(255, 237, 213, 0.8)", // orange-100
    background: "rgba(249, 115, 22, 0.1)",
    border: "rgba(249, 115, 22, 1)",
    borderSecondary: "rgba(251, 146, 60, 1)",
    borderTertiary: "rgba(254, 215, 170, 1)",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white text-orange-950" id="gumloop-report">
      {/* Header */}
      <header className="py-10 px-6 md:px-10 lg:px-16 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-orange-500">Gumloop</span> AI Visibility Report
              </h1>
              <p className="text-orange-700 text-lg">
                AI is the new search. <span className="text-orange-500 font-medium">Lantern</span> is the new SEO.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={downloadPDF}
                disabled={downloadingPDF}
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all"
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
          <div className="mt-6 inline-block bg-orange-100 rounded-lg px-4 py-2">
            <p className="text-sm text-orange-700">Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-orange-900">Executive Summary</h2>
          <Card className="border-orange-200 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-lg mb-4">
                Gumloop's visibility across AI platforms varies significantly, indicating major opportunities for
                optimization. Our analysis of OpenAI, gemini, and Perplexity reveals:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-800">gemini</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-green-800">Visibility</span>
                        <span className="text-sm font-medium text-green-800">75%</span>
                      </div>
                      <Progress value={75} className="h-2 bg-green-200" indicatorClassName="bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-green-800">Sentiment</span>
                        <span className="text-sm font-medium text-green-800">90%</span>
                      </div>
                      <Progress value={90} className="h-2 bg-green-200" indicatorClassName="bg-green-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 border border-blue-200">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-800">OpenAI</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-blue-800">Visibility</span>
                        <span className="text-sm font-medium text-blue-800">71%</span>
                      </div>
                      <Progress value={71} className="h-2 bg-blue-200" indicatorClassName="bg-blue-500" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-blue-800">Sentiment</span>
                        <span className="text-sm font-medium text-blue-800">72.4%</span>
                      </div>
                      <Progress value={72.4} className="h-2 bg-blue-200" indicatorClassName="bg-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-red-800">Perplexity</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-red-800">Visibility</span>
                        <span className="text-sm font-medium text-red-800">5%</span>
                      </div>
                      <Progress value={5} className="h-2 bg-red-200" indicatorClassName="bg-red-500" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-red-800">Sentiment</span>
                        <span className="text-sm font-medium text-red-800">30%</span>
                      </div>
                      <Progress value={30} className="h-2 bg-red-200" indicatorClassName="bg-red-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-orange-100 border-l-4 border-orange-500 rounded">
                <p className="font-medium text-orange-800">
                  Millions of potential customers are using AI platforms to discover solutions like Gumloop, but your
                  visibility on key platforms is preventing discovery.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visibility Analysis */}
      <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-orange-900">Cross-Platform Visibility</h2>
          <p className="text-orange-700 mb-8">How visible is Gumloop on major AI platforms</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visibility Score Chart */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                  Visibility Score
                </CardTitle>
                <CardDescription>Current visibility percentage across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar
                    data={{
                      labels: platforms,
                      datasets: [
                        {
                          label: "Current Visibility",
                          data: visibility,
                          backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.tertiary],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          min: 0,
                          max: 100,
                          grid: {
                            color: "rgba(249, 115, 22, 0.1)",
                          },
                          ticks: {
                            color: "rgba(249, 115, 22, 0.7)",
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(249, 115, 22, 0.1)",
                          },
                          ticks: {
                            color: "rgba(249, 115, 22, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-orange-500" />
                  Sentiment Analysis
                </CardTitle>
                <CardDescription>Positive sentiment percentage across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PolarArea
                    data={{
                      labels: platforms,
                      datasets: [
                        {
                          label: "Positive Sentiment",
                          data: sentiment,
                          backgroundColor: [chartColors.primary, chartColors.secondary, chartColors.tertiary],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "right",
                          labels: {
                            color: "rgba(249, 115, 22, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opportunity Gap */}
          <Card className="mt-8 border-orange-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                Visibility Gap Analysis
              </CardTitle>
              <CardDescription>Current visibility vs potential opportunity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar
                  data={{
                    labels: visibilityGap.map((item) => item.platform),
                    datasets: [
                      {
                        label: "Current Visibility",
                        data: visibilityGap.map((item) => item.current),
                        backgroundColor: chartColors.primary,
                      },
                      {
                        label: "Opportunity Gap",
                        data: visibilityGap.map((item) => item.potential),
                        backgroundColor: "rgba(249, 115, 22, 0.3)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        stacked: true,
                        min: 0,
                        max: 100,
                        grid: {
                          color: "rgba(249, 115, 22, 0.1)",
                        },
                        ticks: {
                          color: "rgba(249, 115, 22, 0.7)",
                        },
                      },
                      x: {
                        stacked: true,
                        grid: {
                          color: "rgba(249, 115, 22, 0.1)",
                        },
                        ticks: {
                          color: "rgba(249, 115, 22, 0.7)",
                        },
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.dataset.label || ""
                            const value = context.parsed.y || 0
                            return `${label}: ${value}%`
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Knowledge Gaps & Recommendations */}
      <section className="py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="gaps" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-orange-900">Insights & Recommendations</h2>
                <p className="text-orange-700">Critical findings and strategic next steps</p>
              </div>
              <TabsList className="bg-orange-100">
                <TabsTrigger value="gaps" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  critical Knowledge Gaps
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Recommendations
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="gaps" className="mt-0">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {uniqueKnowledgeGaps.slice(0, 2).map((gap, index) => (
      <Card key={index} className="border-red-200 shadow-lg overflow-hidden">
        <div className="bg-red-500 h-1"></div>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="bg-red-100 rounded-full p-3 mr-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">{gap}</h3>
              <ul className="text-red-700 mt-2 space-y-1 list-disc pl-4">
                <li>{index === 0 ? "Users receive incomplete information" : 
                     index === 1 ? "Creates trust issues with potential customers" : 
                     index === 2 ? "Prevents purchasing decisions" : 
                     "Obscures your unique value proposition"}</li>
                <li>{index === 0 ? "Competitors fill the information void" : 
                     index === 1 ? "Reduces conversion rates" : 
                     index === 2 ? "Increases customer support inquiries" : 
                     "Limits AI recommendation potential"}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>

<TabsContent value="recommendations" className="mt-0">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {allRecommendations.slice(0, 2).map((recommendation, index) => (
      <Card key={index} className="border-orange-200 shadow-lg overflow-hidden">
        <div className="bg-orange-500 h-1"></div>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="bg-orange-100 rounded-full p-3 mr-4">
              <CheckCircle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-900">{recommendation}</h3>
              <ul className="text-orange-700 mt-2 space-y-1 list-disc pl-4">
                <li>{index === 0 ? "Increases credibility across AI platforms" : 
                     index === 1 ? "Establishes thought leadership" : 
                     index === 2 ? "Creates authoritative citations" : 
                     index === 3 ? "Demonstrates real-world value" :
                     index === 4 ? "Builds positive engagement signals" :
                     "Enhances visual content indexing"}</li>
                <li>{index === 0 ? "Improves accuracy of AI responses" : 
                     index === 1 ? "Drives more accurate feature representation" : 
                     index === 2 ? "Strengthens industry authority" : 
                     index === 3 ? "Improves customer testimonial data" :
                     index === 4 ? "Increases community-driven validation" :
                     "Enables richer AI responses"}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Topic Association */}
      <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold mb-2 text-orange-900">Topic Association Analysis</h2>
    <p className="text-orange-700 mb-8">How Gumloop is associated with key industry topics</p>

    <Card className="border-orange-200 shadow-lg">
      <CardContent className="pt-6">
        <div className="h-[400px]">
          <Radar
            data={{
              labels: [...new Set(topTopics.map((item) => 
                item.name.replace(/Gumloop\s/g, "")
                       .replace(/\/.*$/, "") // Remove content after slashes for cleaner labels
                       .trim()
              ))],
              datasets: platforms.map((platform, index) => ({
                label: platform,
                data: (function() {
                  // Get unique topic names
                  const uniqueTopics = [...new Set(topTopics.map(item => 
                    item.name.replace(/Gumloop\s/g, "")
                           .replace(/\/.*$/, "")
                           .trim()
                  ))];
                  
                  // Map scores for each platform against unique topics
                  return uniqueTopics.map(topic => {
                    const matchingTopic = topTopics.find(item => 
                      item.platform === platform && 
                      item.name.replace(/Gumloop\s/g, "")
                           .replace(/\/.*$/, "")
                           .trim() === topic
                    );
                    return matchingTopic ? matchingTopic.score : 0;
                  });
                })(),
                backgroundColor: [
                  "rgba(249, 115, 22, 0.2)",
                  "rgba(251, 146, 60, 0.2)",
                  "rgba(254, 215, 170, 0.2)",
                ][index],
                borderColor: ["rgba(249, 115, 22, 1)", "rgba(251, 146, 60, 1)", "rgba(254, 215, 170, 1)"][index],
                borderWidth: 2,
              })),
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  pointLabels: {
                    color: "rgba(249, 115, 22, 0.7)",
                    font: {
                      size: 12,
                    },
                  },
                  grid: {
                    color: "rgba(249, 115, 22, 0.1)",
                  },
                  angleLines: {
                    color: "rgba(249, 115, 22, 0.1)",
                  },
                },
              },
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "rgba(249, 115, 22, 0.7)",
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.dataset.label || '';
                      const value = context.raw || 0;
                      return `${label}: ${value.toFixed(1)}`;
                    }
                  }
                }
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
    
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {platforms.map((platform, index) => (
        <Card key={platform} className="border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{platform} Top Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.find(item => item.model === platform)?.topRankedTopics.map((topic, i) => (
                <li key={i} className="flex justify-between">
                  <span className="text-sm">{topic.topicName.replace(/Gumloop\s/g, "")}</span>
                  <span className="text-sm font-semibold text-orange-600">{topic.relevanceScore}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
      {/* Competitor Analysis */}
      <section className="py-12 px-6 md:px-10 lg:px-16">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold mb-2 text-orange-900">Competitor Analysis</h2>
    <p className="text-orange-700 mb-8">How Gumloop compares to competitors across AI platforms</p>

    {/* Competitor Ranking Table */}
    <Card className="border-orange-200 shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="text-orange-900">Competitor Rankings</CardTitle>
        <CardDescription>Comprehensive analysis across all AI platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Ranking based on sentiment and visibility differences</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Platform</TableHead>
              <TableHead>Competitor</TableHead>
              <TableHead>Sentiment Performance</TableHead>
              <TableHead>Visibility Difference</TableHead>
              <TableHead>Overall Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {competitorData.map((item, index) => {
              // Calculate overall score based on sentiment and visibility
              const sentimentScore = item.sentimentComparison.betterThan - item.sentimentComparison.worseThan;
              const overallScore = sentimentScore + item.visibilityDifference;
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div 
                        className={`w-3 h-3 rounded-full mr-2 ${
                          item.model === "OpenAI" ? "bg-blue-500" : item.model === "gemini" ? "bg-green-500" : "bg-red-500"
                        }`}>
                      </div>
                      {item.model}
                    </div>
                  </TableCell>
                  <TableCell>{item.competitorName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <ArrowUpIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item.sentimentComparison.betterThan}% better</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <ArrowDownIcon className="h-4 w-4 text-red-600" />
                        <span className="text-sm">{item.sentimentComparison.worseThan}% worse</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {item.visibilityDifference >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span>{Math.abs(item.visibilityDifference)}% {item.visibilityDifference >= 0 ? 'ahead' : 'behind'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={overallScore > 0 ? "bg-green-500" : "bg-red-500"}>
                      {overallScore > 0 ? '+' : ''}{overallScore.toFixed(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Individual competitor cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {competitorData.map((item, index) => (
        <Card key={index} className="border-orange-200 shadow-lg overflow-hidden">
          <div
            className={`h-1 ${
              item.model === "OpenAI" ? "bg-blue-500" : item.model === "gemini" ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{item.model} Platform</CardTitle>
            <CardDescription>vs. {item.competitorName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Sentiment Comparison</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-green-600 font-medium">Better</span>
                    </div>
                    <p className="text-lg font-bold text-green-700">{item.sentimentComparison.betterThan}%</p>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
                      <span className="text-yellow-600 font-medium">Equal</span>
                    </div>
                    <p className="text-lg font-bold text-yellow-700">{item.sentimentComparison.equalTo}%</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-red-600 font-medium">Worse</span>
                    </div>
                    <p className="text-lg font-bold text-red-700">{item.sentimentComparison.worseThan}%</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                <div
                  className={`p-3 rounded-lg flex items-center justify-between ${item.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"}`}
                >
                  <span className="font-medium">Compared to {item.competitorName}</span>
                  <div className="flex items-center">
                    {item.visibilityDifference >= 0 ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span
                      className={`font-bold ${item.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"}`}
                    >
                      {Math.abs(item.visibilityDifference)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="mt-8 p-5 bg-orange-50 border border-orange-200 rounded-lg">
      <h3 className="text-xl font-semibold text-orange-900 mb-3">Competitive Analysis Summary</h3>
      <p className="text-orange-800 mb-4">
        Gumloop shows strong sentiment performance against competitors on gemini and OpenAI, but lags in overall
        visibility. On Perplexity, both visibility and sentiment are significantly lower than competitors,
        representing a critical area for improvement.
      </p>
      <p className="text-orange-800">
        Strategic optimization can help Gumloop close these visibility gaps and establish a stronger competitive
        position across all AI platforms.
      </p>
    </div>
  </div>
</section>

      {/* Opportunity Impact */}
      <section className="py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-orange-900">Opportunity Impact</h2>
          <p className="text-orange-700 mb-8">Expected improvements with Lantern's optimization</p>

          <Card className="border-orange-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-orange-100 text-orange-500 mb-4 border border-orange-200">
                    <Eye className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-orange-900">Visibility</h3>
                  <p className="text-3xl font-bold text-orange-500">+65%</p>
                  <p className="text-orange-700 mt-2">Average increase across platforms</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-orange-100 text-orange-500 mb-4 border border-orange-200">
                    <TrendingUp className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-orange-900">Sentiment</h3>
                  <p className="text-3xl font-bold text-orange-500">+40%</p>
                  <p className="text-orange-700 mt-2">Positive sentiment improvement</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-orange-100 text-orange-500 mb-4 border border-orange-200">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-orange-900">Reach</h3>
                  <p className="text-3xl font-bold text-orange-500">+2.5%</p>
                  <p className="text-orange-700 mt-2">Additional monthly impressions</p>
                </div>
              </div>

              <div className="h-[300px]">
                <Line
                  data={{
                    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
                    datasets: [
                      {
                        label: "Expected Visibility Growth",
                        data: [5, 25, 45, 70, 85, 95],
                        borderColor: "rgba(249, 115, 22, 1)",
                        backgroundColor: "rgba(249, 115, 22, 0.2)",
                        fill: true,
                        tension: 0.4,
                      },
                      {
                        label: "Without Optimization",
                        data: [5, 7, 10, 12, 15, 17],
                        borderColor: "rgba(251, 146, 60, 1)",
                        backgroundColor: "rgba(251, 146, 60, 0.2)",
                        borderDash: [5, 5],
                        fill: true,
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                          color: "rgba(249, 115, 22, 0.1)",
                        },
                        ticks: {
                          color: "rgba(249, 115, 22, 0.7)",
                        },
                      },
                      x: {
                        grid: {
                          color: "rgba(249, 115, 22, 0.1)",
                        },
                        ticks: {
                          color: "rgba(249, 115, 22, 0.7)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Brand Metrics & Trends */}
      

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-10 lg:px-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to dominate AI search?</h2>
              <p className="text-lg mb-6">
                Lantern helps brands like Gumloop become the top recommendation across all AI platforms. Our
                comprehensive approach ensures your brand is visible, accurately represented, and recommended to
                millions of potential customers using AI as their primary discovery tool.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-2 mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white">Dedicated AI SEO strategist for your brand</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-2 mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white">Cross-platform visibility optimization</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 rounded-full p-2 mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white">Monthly performance and optimization reports</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl"
                  size="lg"
                  asChild
                >
                  <a href="https://calendly.com/gideon-at-lantern/30min">Book a Strategy Session</a>
                </Button>
                topic
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Why act now?</h3>
                  </div>
                  <p className="text-white/90 mb-4">
                    AI platforms are evolving rapidly and early optimization provides a significant competitive
                    advantage. Brands that optimize for AI visibility now will establish themselves as the default
                    recommendation.
                  </p>
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <span className="text-orange-800 font-bold text-sm">GPT</span>
                        </div>
                        <span>ChatGPT</span>
                      </div>
                      <span className="text-orange-100 font-medium">180m+ users</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <span className="text-orange-800 font-bold text-sm">P</span>
                        </div>
                        <span>Perplexity</span>
                      </div>
                      <span className="text-orange-100 font-medium">15M+ users</span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <span className="text-orange-800 font-bold text-sm">G</span>
                        </div>
                        <span>gemini AI</span>
                      </div>
                      <span className="text-orange-100 font-medium">275m+ users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-orange-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-orange-700">
                © {new Date().getFullYear()} Lantern AI, Inc. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
              <div className="flex space-x-4 ml-6">
                <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-orange-700 hover:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default GumloopPage

