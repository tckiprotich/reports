// @ts-nocheck
import { AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RecommendationsProps {
  data: any[]
}

const NalaRecommendations = ({ data }: RecommendationsProps) => {
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
              <h2 className="text-3xl font-bold text-red-900">Critical Insights & Action Items</h2>
              <p className="text-red-700">High-priority issues requiring immediate attention</p>
            </div>
            <TabsList className="bg-red-100">
              <TabsTrigger value="gaps" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                Critical Knowledge Gaps
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                Priority Actions
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
                          {index === 0 && "Users asking about this receive incomplete or outdated information."}
                          {index === 1 && "This creates trust issues as users can't verify financial reliability."}
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
              {uniqueRecommendations.slice(0, 2).map((recommendation, index) => (
                <Card key={index} className="border-red-200 shadow-lg overflow-hidden">
                  <div className="bg-red-500 h-1"></div>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-full p-3 mr-4">
                        <CheckCircle className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-900">{recommendation}</h3>
                        <p className="text-red-700 mt-1">
                          {index === 0 && "Showcases authentic user experiences and builds trust."}
                          {index === 1 && "Improves AI understanding of NALA's competitive advantages."}
                        </p>
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
  )
}

export default NalaRecommendations