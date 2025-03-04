import { Bar, PolarArea } from "react-chartjs-2"
import { BarChart3, PieChart, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Make sure Chart.js components are imported and registered properly
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

// This should be handled in the main page, but registering here as well to be safe
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

interface VisibilityAnalysisProps {
  data: any[]
}

const GustoVisibilityAnalysis = ({ data }: VisibilityAnalysisProps) => {
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

  // Chart colors - purple theme
  const chartColors = {
    primary: "rgba(124, 58, 237, 0.8)", // purple-600
    secondary: "rgba(139, 92, 246, 0.8)", // purple-500
    tertiary: "rgba(167, 139, 250, 0.8)", // purple-400
    quaternary: "rgba(216, 180, 254, 0.8)", // purple-200
    background: "rgba(124, 58, 237, 0.1)",
    border: "rgba(124, 58, 237, 1)",
    borderSecondary: "rgba(139, 92, 246, 1)",
    borderTertiary: "rgba(167, 139, 250, 1)",
  }

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-purple-900">Cross-Platform Visibility</h2>
        <p className="text-purple-700 mb-8">How visible is Gusto on major AI platforms</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visibility Score Chart */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
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
                          color: "rgba(124, 58, 237, 0.1)",
                        },
                        ticks: {
                          color: "rgba(124, 58, 237, 0.7)",
                        },
                      },
                      x: {
                        grid: {
                          color: "rgba(124, 58, 237, 0.1)",
                        },
                        ticks: {
                          color: "rgba(124, 58, 237, 0.7)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-purple-500" />
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

        {/* Opportunity Gap */}
        <Card className="mt-8 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
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
                      backgroundColor: "rgba(124, 58, 237, 0.3)",
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
                        color: "rgba(124, 58, 237, 0.1)",
                      },
                      ticks: {
                        color: "rgba(124, 58, 237, 0.7)",
                      },
                    },
                    x: {
                      stacked: true,
                      grid: {
                        color: "rgba(124, 58, 237, 0.1)",
                      },
                      ticks: {
                        color: "rgba(124, 58, 237, 0.7)",
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
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-lg font-semibold text-purple-900 mb-2">Key Insights</h4>
              <p className="text-purple-800">
                Gusto has strong visibility on OpenAI (90%), moderate visibility on Google (75%), but is virtually 
                invisible on Perplexity (2%). This represents a significant opportunity gap that could be closed 
                with targeted optimization strategies.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default GustoVisibilityAnalysis