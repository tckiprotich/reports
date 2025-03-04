import { Line } from "react-chartjs-2"
import { TrendingUp, Users, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const NalaBrandMetrics = ({ data }: BrandMetricsProps) => {
  // Process brand metrics data
  const brandMetricsData = [
    {
      name: "brandAwareness",
      OpenAI: data[0].brandMetrics.brandAwareness,
      Google: data[1].brandMetrics.brandAwareness,
      Perplexity: data[2].brandMetrics.brandAwareness,
    },
    {
      name: "brandEngagement",
      OpenAI: data[0].brandMetrics.brandEngagement,
      Google: data[1].brandMetrics.brandEngagement,
      Perplexity: data[2].brandMetrics.brandEngagement,
    },
    {
      name: "customerSatisfaction",
      OpenAI: data[0].brandMetrics.customerSatisfaction,
      Google: data[1].brandMetrics.customerSatisfaction,
      Perplexity: data[2].brandMetrics.customerSatisfaction || 0,
    },
  ]

  // Process trend data
  const trendData = [
    {
      name: "monthlyTrend",
      OpenAI: data[0].trendAnalysis.monthlyTrend,
      Google: data[1].trendAnalysis.monthlyTrend,
      Perplexity: data[2].trendAnalysis.monthlyTrend,
    },
    {
      name: "quarterlyTrend",
      OpenAI: data[0].trendAnalysis.quarterlyTrend,
      Google: data[1].trendAnalysis.quarterlyTrend,
      Perplexity: data[2].trendAnalysis.quarterlyTrend,
    },
  ]

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-blue-900">Opportunity Impact</h2>
        <p className="text-blue-700 mb-8">Expected improvements with Lantern's optimization</p>

        <Card className="border-blue-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-500 mb-4 border border-blue-200">
                  <Eye className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-blue-900">Visibility</h3>
                <p className="text-3xl font-bold text-blue-500">+85%</p>
                <p className="text-blue-700 mt-2">Average increase across platforms</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-500 mb-4 border border-blue-200">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-blue-900">Sentiment</h3>
                <p className="text-3xl font-bold text-blue-500">+35%</p>
                <p className="text-blue-700 mt-2">Positive sentiment improvement</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-500 mb-4 border border-blue-200">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-blue-900">Diaspora Reach</h3>
                <p className="text-3xl font-bold text-blue-500">+4.8%</p>
                <p className="text-blue-700 mt-2">Additional monthly customer acquisition</p>
              </div>
            </div>

            <div className="h-[300px]">
              <Line
                data={{
                  labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
                  datasets: [
                    {
                      label: "Expected Visibility Growth",
                      data: [5, 25, 45, 65, 85, 95],
                      borderColor: "rgba(30, 64, 175, 1)",
                      backgroundColor: "rgba(30, 64, 175, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                    {
                      label: "Without Optimization",
                      data: [5, 7, 10, 12, 15, 18],
                      borderColor: "rgba(59, 130, 246, 1)",
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
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
                        color: "rgba(30, 64, 175, 0.1)",
                      },
                      ticks: {
                        color: "rgba(30, 64, 175, 0.7)",
                      },
                    },
                    x: {
                      grid: {
                        color: "rgba(30, 64, 175, 0.1)",
                      },
                      ticks: {
                        color: "rgba(30, 64, 175, 0.7)",
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-2 mt-12 text-blue-900">Brand Performance Metrics</h2>
        <p className="text-blue-700 mb-8">Key performance indicators across AI platforms</p>

        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="bg-blue-100 mb-6">
            <TabsTrigger value="metrics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Brand Metrics
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Growth Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <Card className="border-blue-200 shadow-lg">
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
                      <Card key={index} className="border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-lg">{metricName}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-end justify-between mb-4">
                            <div className="text-2xl font-bold text-blue-700">{avgValue.toFixed(1)}%</div>
                            <div className="text-sm text-blue-500">(Average)</div>
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
                                className="h-2 bg-blue-100" 
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
                                className="h-2 bg-blue-100" 
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
                                className="h-2 bg-blue-100" 
                                indicatorClassName="bg-red-500" 
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Brand Metrics Insights</h4>
                  <p className="text-blue-800">
                    NALA shows strong customer satisfaction scores on OpenAI (80%) but significantly lower metrics 
                    on Google (70%). Brand awareness is strong on OpenAI (70%), moderate on Google (55%), and 
                    virtually non-existent on Perplexity (4.6%). Focusing on optimizing brand visibility on Perplexity 
                    represents the largest opportunity for growth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="border-blue-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {trendData.map((trend, index) => {
                    const trendName = {
                      monthlyTrend: "Monthly Growth",
                      quarterlyTrend: "Quarterly Growth",
                    }[trend.name]

                    return (
                      <Card key={index} className="border-blue-200">
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
                                max={12}
                                className="h-2 bg-blue-100"
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
                                max={12}
                                className="h-2 bg-blue-100"
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
                                max={12}
                                className="h-2 bg-blue-100"
                                indicatorClassName="bg-red-500"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Growth Trend Insights</h4>
                  <p className="text-blue-800">
                    OpenAI shows the strongest growth trajectory with a {trendData[1]?.OpenAI}% quarterly increase,
                    while Google shows moderate growth at {trendData[1]?.Google}% and Perplexity shows minimal growth.
                    To capitalize on this trend, prioritize content that optimizes for OpenAI's algorithms while 
                    establishing foundational presence on emerging platforms like Perplexity.
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

export default NalaBrandMetrics
