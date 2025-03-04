import { AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RecommendationsProps {
  data: any[]
}

const DialAfrikaRecommendations = ({ data }: RecommendationsProps) => {
  // Extract knowledge gaps across platforms
  const allKnowledgeGaps = data.flatMap((item) => item.knowledgeGaps)
  const uniqueKnowledgeGaps = [...new Set(allKnowledgeGaps)]

  // Extract recommendations across platforms
  const allRecommendations = data.flatMap((item) => item.recommendations)
  const uniqueRecommendations = [...new Set(allRecommendations)]

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="gaps" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-green-900">Insights & Recommendations</h2>
              <p className="text-green-700">Critical findings and strategic next steps</p>
            </div>
            <TabsList className="bg-green-100">
              <TabsTrigger value="gaps" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Critical Gaps
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
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
                        <p className="text-red-700 mt-1">
                          {index === 0 && "Users asking about these details receive incomplete or outdated information."}
                          {index === 1 && "This creates an information gap about recent company developments and news."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uniqueRecommendations.slice(0, 8).map((recommendation, index) => (
                <Card key={index} className="border-green-200 shadow-lg overflow-hidden">
                  <div className="bg-green-500 h-1"></div>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-3 mr-4">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-900">{recommendation}</h3>
                        <p className="text-green-700 mt-1">
                          {/* {index === 0 && "Increases visibility and credibility across all AI platforms."} */}
                          {index === 1 && "Helps establish thought leadership and enhances technical reputation."}
                          {index === 2 && "Expands visibility in industry-specific publications for targeted audiences."}
                          {/* {index === 3 && "Provides real-world validation that AI systems can reference."} */}
                          {/* {index === 4 && "Highlights unique value proposition for African enterprises specifically."} */}
                          {index === 5 && "Boosts discovery through strategic keyword optimization."}
                          {/* {index === 6 && "Increases customer confidence through transparent pricing information."} */}
                          {/* {index === 7 && "Demonstrates success metrics through compelling customer testimonials."} */}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold text-green-900 mb-3">Strategic Priorities</h3>

          <p className="text-green-800">
            The most significant ROI opportunity lies in establishing visibility on Perplexity, which currently has high growth potential for B2B technology discovery.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DialAfrikaRecommendations
