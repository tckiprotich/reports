"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function DataInsights() {
  // Data from the JSON file
  const brandMetrics = {
    OpenAI: {
      brandAwareness: 65.2,
      brandEngagement: 63.4,
      marketShare: 21.2,
      netPromoterScore: 44,
      customerSatisfaction: 87,
    },
    Google: {
      brandAwareness: 50,
      brandEngagement: 65,
      marketShare: 15,
      netPromoterScore: 45,
      customerSatisfaction: 80,
    },
    Perplexity: {
      brandAwareness: 3.8,
      brandEngagement: 3.4,
      marketShare: 2,
      netPromoterScore: 1.4,
      customerSatisfaction: 1.6,
    },
  }

  const trendData = {
    OpenAI: {
      monthlyTrend: 6.8,
      quarterlyTrend: 12.4,
    },
    Google: {
      monthlyTrend: 3,
      quarterlyTrend: 5,
    },
    Perplexity: {
      monthlyTrend: 2,
      quarterlyTrend: 3.4,
    },
  }

  // Format data for charts
  const brandMetricsData = [
    {
      name: "Brand Awareness",
      OpenAI: brandMetrics.OpenAI.brandAwareness,
      Google: brandMetrics.Google.brandAwareness,
      Perplexity: brandMetrics.Perplexity.brandAwareness,
    },
    {
      name: "Brand Engagement",
      OpenAI: brandMetrics.OpenAI.brandEngagement,
      Google: brandMetrics.Google.brandEngagement,
      Perplexity: brandMetrics.Perplexity.brandEngagement,
    },
    // {
    //   name: "Market Share",
    //   OpenAI: brandMetrics.OpenAI.marketShare,
    //   Google: brandMetrics.Google.marketShare,
    //   Perplexity: brandMetrics.Perplexity.marketShare,
    // },
    // {
    //   name: "NPS",
    //   OpenAI: brandMetrics.OpenAI.netPromoterScore,
    //   Google: brandMetrics.Google.netPromoterScore,
    //   Perplexity: brandMetrics.Perplexity.netPromoterScore,
    // },
    {
      name: "Customer Satisfaction",
      OpenAI: brandMetrics.OpenAI.customerSatisfaction,
      Google: brandMetrics.Google.customerSatisfaction,
      Perplexity: brandMetrics.Perplexity.customerSatisfaction,
    },
  ]

  const trendAnalysisData = [
    {
      name: "Monthly Trend",
      OpenAI: trendData.OpenAI.monthlyTrend,
      Google: trendData.Google.monthlyTrend,
      Perplexity: trendData.Perplexity.monthlyTrend,
    },
    {
      name: "Quarterly Trend",
      OpenAI: trendData.OpenAI.quarterlyTrend,
      Google: trendData.Google.quarterlyTrend,
      Perplexity: trendData.Perplexity.quarterlyTrend,
    },
  ]

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-orange-900">Additional Insights</h2>
        <p className="text-orange-700 mb-8">Detailed metrics from our comprehensive analysis</p>

        <Tabs defaultValue="brand-metrics" className="w-full">
          <TabsList className="bg-orange-100 mb-6">
            <TabsTrigger
              value="brand-metrics"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Brand Metrics
            </TabsTrigger>
            <TabsTrigger
              value="trend-analysis"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Trend Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brand-metrics">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle>Brand Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators across AI platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={brandMetricsData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(249, 115, 22, 0.1)" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "rgba(249, 115, 22, 0.7)" }}
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis tick={{ fill: "rgba(249, 115, 22, 0.7)" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "rgba(249, 115, 22, 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="OpenAI" fill="rgba(59, 130, 246, 0.8)" name="OpenAI" />
                      <Bar dataKey="Google" fill="rgba(16, 185, 129, 0.8)" name="Google" />
                      <Bar dataKey="Perplexity" fill="rgba(239, 68, 68, 0.8)" name="Perplexity" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trend-analysis">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Monthly and quarterly visibility growth trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trendAnalysisData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(249, 115, 22, 0.1)" />
                      <XAxis dataKey="name" tick={{ fill: "rgba(249, 115, 22, 0.7)" }} />
                      <YAxis tick={{ fill: "rgba(249, 115, 22, 0.7)" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "rgba(249, 115, 22, 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="OpenAI" fill="rgba(59, 130, 246, 0.8)" name="OpenAI" />
                      <Bar dataKey="Google" fill="rgba(16, 185, 129, 0.8)" name="Google" />
                      <Bar dataKey="Perplexity" fill="rgba(239, 68, 68, 0.8)" name="Perplexity" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Trend Analysis Insights</h4>
                  <p className="text-orange-800">
                    OpenAI shows the strongest growth trajectory with a 12.4% quarterly increase, while Google and
                    Perplexity show more modest growth. This indicates that optimization efforts should prioritize
                    OpenAI for maximum impact, while establishing a stronger foundation on Perplexity.
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

