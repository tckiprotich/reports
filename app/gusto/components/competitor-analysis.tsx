import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processCompetitorData } from "../data/fetch-data"
import { Radar } from "react-chartjs-2"

// Make sure Chart.js components are imported and registered properly
import {
  Chart as ChartJS,
  RadarController,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js"

// Register the necessary components for Radar chart
ChartJS.register(
  RadarController,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend
)

interface CompetitorAnalysisProps {
  data: any[]
}

const GustoCompetitorAnalysis = ({ data }: CompetitorAnalysisProps) => {
  // Extract top topics across platforms
  const topTopics = data.flatMap((item) =>
    item.topRankedTopics.map((topic) => ({
      name: topic.topicName,
      score: topic.relevanceScore,
      platform: item.model,
    }))
  )

  // Process competitor data
  const competitorData = processCompetitorData(data)

  // Chart colors - purple theme
  const chartColors = {
    primary: "rgba(124, 58, 237, 0.8)", // purple-600
    secondary: "rgba(139, 92, 246, 0.8)", // purple-500
    tertiary: "rgba(167, 139, 250, 0.8)", // purple-400
    background: "rgba(124, 58, 237, 0.1)",
  }

  return (
    <>
      {/* Topic Association */}
      <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-purple-900">Topic Association Analysis</h2>
          <p className="text-purple-700 mb-8">How Gusto is associated with key industry topics</p>

          <Card className="border-purple-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <Radar
                  data={{
                    labels: [...new Set(topTopics.map((item) => item.name.replace(/Gusto\s/g, "")))].slice(0, 6),
                    datasets: data.map((platform, index) => ({
                      label: platform.model,
                      data: topTopics
                        .filter((item) => item.platform === platform.model)
                        .map((item) => item.score),
                      backgroundColor: [
                        "rgba(124, 58, 237, 0.2)",
                        "rgba(139, 92, 246, 0.2)",
                        "rgba(167, 139, 250, 0.2)",
                      ][index],
                      borderColor: [
                        "rgba(124, 58, 237, 1)",
                        "rgba(139, 92, 246, 1)",
                        "rgba(167, 139, 250, 1)",
                      ][index],
                      borderWidth: 2,
                    })),
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        pointLabels: {
                          color: "rgba(124, 58, 237, 0.7)",
                          font: {
                            size: 12,
                          },
                        },
                        grid: {
                          color: "rgba(124, 58, 237, 0.1)",
                        },
                        angleLines: {
                          color: "rgba(124, 58, 237, 0.1)",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "rgba(124, 58, 237, 0.7)",
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

      {/* Competitor Analysis */}
      <section className="py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-purple-900">Competitor Analysis</h2>
          <p className="text-purple-700 mb-8">How Gusto compares to competitors across AI platforms</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitorData.map((item, index) => (
              <Card key={index} className="border-purple-200 shadow-lg overflow-hidden">
                <div
                  className={`h-1 ${
                    item.model === "OpenAI" ? "bg-green-500" : item.model === "Google" ? "bg-blue-500" : "bg-red-500"
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
                        className={`p-3 rounded-lg flex items-center justify-between ${
                          item.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <span className="font-medium">Compared to competitor</span>
                        <div className="flex items-center">
                          {item.visibilityDifference >= 0 ? (
                            <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span
                            className={`font-bold ${
                              item.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {item.visibilityDifference}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-5 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Competitive Analysis Summary</h3>
            <p className="text-purple-800 mb-4">
              Gusto shows strong sentiment performance against competitors on OpenAI and Google, with a particularly 
              strong visibility advantage against QuickBooks Payroll on Google. However, Gusto lags behind ADP and Paychex 
              in visibility on OpenAI, representing an area for improvement.
            </p>
            <p className="text-purple-800">
              Strategic optimization can help Gusto close these visibility gaps and establish a stronger competitive
              position across all AI platforms, particularly on Perplexity where visibility is extremely low.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default GustoCompetitorAnalysis
