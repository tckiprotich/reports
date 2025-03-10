// @ts-nocheck
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
                  labels: ["Month 1", "Month 2", "Month 3"],
                  datasets: [
                    {
                      label: "Expected Visibility Growth",
                      data: [5 , 65, 85],
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

        
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="bg-blue-100 mb-6">
            
          </TabsList>

          

               

          <TabsContent value="trends">
            <Card className="border-blue-200 shadow-lg">
              <CardContent className="pt-6">
                

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
