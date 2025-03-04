import { Line } from "react-chartjs-2"
import { TrendingUp, Users, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processBrandMetricsData, processTrendData } from "../data/fetch-data"

// Make sure Chart.js components are imported and registered properly
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register the necessary components for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface BrandMetricsProps {
  data: any[]
}

const GustoBrandMetrics = ({ data }: BrandMetricsProps) => {
  // Process brand metrics data
  const brandMetricsData = processBrandMetricsData(data)

  // Process trend data
  const trendData = processTrendData(data)

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-purple-900">Opportunity Impact</h2>
        <p className="text-purple-700 mb-8">Expected improvements with Lantern's optimization</p>

        <Card className="border-purple-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 text-purple-500 mb-4 border border-purple-200">
                  <Eye className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-purple-900">Visibility</h3>
                <p className="text-3xl font-bold text-purple-500">+75%</p>
                <p className="text-purple-700 mt-2">Average increase across platforms</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 text-purple-500 mb-4 border border-purple-200">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-purple-900">Sentiment</h3>
                <p className="text-3xl font-bold text-purple-500">+45%</p>
                <p className="text-purple-700 mt-2">Positive sentiment improvement</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 text-purple-500 mb-4 border border-purple-200">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-purple-900">Reach</h3>
                <p className="text-3xl font-bold text-purple-500">+3.2%</p>
                <p className="text-purple-700 mt-2">Additional monthly impressions</p>
              </div>
            </div>

            <div className="h-[300px]">
              <Line
                data={{
                  labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
                  datasets: [
                    {
                      label: "Expected Visibility Growth",
                      data: [5, 30, 50, 75, 90, 95],
                      borderColor: "rgba(124, 58, 237, 1)",
                      backgroundColor: "rgba(124, 58, 237, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                    {
                      label: "Without Optimization",
                      data: [5, 8, 12, 15, 17, 20],
                      borderColor: "rgba(139, 92, 246, 1)",
                      backgroundColor: "rgba(139, 92, 246, 0.2)",
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

        <h2 className="text-3xl font-bold mb-2 mt-12 text-purple-900">Brand Performance Metrics</h2>
        <p className="text-purple-700 mb-8">Key performance indicators across AI platforms</p>

        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="bg-purple-100 mb-6">
            <TabsTrigger value="metrics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Brand Metrics
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Growth Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {brandMetricsData.map((metric, index) => {
                    const metricName = {
                      brandAwareness: "Brand Awareness",
                      brandEngagement: "Brand Engagement",
                      customerSatisfaction: "Customer Satisfaction",
                    }[metric.name]

                    const avgValue =
                      Object.keys(metric)
                        .filter((key) => key !== "name")
                        .reduce((sum, key) => sum + metric[key], 0) /
                      (Object.keys(metric).length - 1)

                    return (
                      <Card key={index} className="border-purple-200">
                        <CardHeader>
                          <CardTitle className="text-lg">{metricName}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-end justify-between mb-4">
                            <div className="text-2xl font-bold text-purple-700">{avgValue.toFixed(1)}%</div>
                            <div className="text-sm text-purple-500">(Average)</div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">OpenAI</span>
                                <span className="text-sm font-medium">{metric.OpenAI?.toFixed(1)}%</span>
                              </div>
                              <Progress 
                                value={metric.OpenAI} 
                                max={100} 
                                className="h-2 bg-purple-100" 
                                indicatorClassName="bg-green-500" 
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Google</span>
                                <span className="text-sm font-medium">{metric.Google?.toFixed(1)}%</span>
                              </div>
                              <Progress 
                                value={metric.Google} 
                                max={100} 
                                className="h-2 bg-purple-100" 
                                indicatorClassName="bg-blue-500" 
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Perplexity</span>
                                <span className="text-sm font-medium">{metric.Perplexity?.toFixed(1)}%</span>
                              </div>
                              <Progress 
                                value={metric.Perplexity} 
                                max={100} 
                                className="h-2 bg-purple-100" 
                                indicatorClassName="bg-red-500" 
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Brand Metrics Insights</h4>
                  <p className="text-purple-800">
                    Gusto shows strong customer satisfaction scores on OpenAI (85%) but significantly lower on Google (44%).
                    Brand awareness is strong on OpenAI (75%), moderate on Google (65%), and very low on Perplexity (9%).
                    Focusing on increasing brand awareness and satisfaction on Perplexity should be a priority, while
                    improving customer satisfaction metrics on Google.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="border-purple-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {trendData.map((trend, index) => {
                    const trendName = {
                      monthlyTrend: "Monthly Growth",
                      quarterlyTrend: "Quarterly Growth",
                    }[trend.name]

                    return (
                      <Card key={index} className="border-purple-200">
                        <CardHeader>
                          <CardTitle className="text-lg">{trendName}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">OpenAI</span>
                                <span className="text-sm font-medium">{trend.OpenAI}%</span>
                              </div>
                              <Progress
                                value={trend.OpenAI}
                                max={10}
                                className="h-2 bg-purple-100"
                                indicatorClassName="bg-green-500"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Google</span>
                                <span className="text-sm font-medium">{trend.Google}%</span>
                              </div>
                              <Progress
                                value={trend.Google}
                                max={10}
                                className="h-2 bg-purple-100"
                                indicatorClassName="bg-blue-500"
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Perplexity</span>
                                <span className="text-sm font-medium">{trend.Perplexity}%</span>
                              </div>
                              <Progress
                                value={trend.Perplexity}
                                max={10}
                                className="h-2 bg-purple-100"
                                indicatorClassName="bg-red-500"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Growth Trend Insights</h4>
                  <p className="text-purple-800">
                    OpenAI shows the strongest growth trajectory with a {trendData[1]?.OpenAI}% quarterly increase,
                    while Google shows moderate growth and Perplexity shows no measurable growth. This indicates that 
                    optimization efforts should prioritize OpenAI for maximum impact, while establishing a foundational 
                    presence on Perplexity where virtually no growth is currently happening.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default GustoBrandMetrics