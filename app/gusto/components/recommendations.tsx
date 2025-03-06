// @ts-nocheck
import { AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RecommendationsProps {
  data: any[]
}

const GustoRecommendations = ({ data }: RecommendationsProps) => {
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
              <h2 className="text-3xl font-bold text-red-900">Insights & Recommendations</h2>
              <p className="text-red-700">Critical findings and strategic next steps</p>
            </div>
            <TabsList className="bg-red-100">
              <TabsTrigger value="gaps" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                Knowledge Gaps
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
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
                          {index === 0 && "Users asking about this receive incomplete or outdated information."}
                          {index === 1 &&
                            "This creates trust issues as users can't verify competitive positioning."}
                          {index === 2 &&
                            "Without recent updates, AI platforms may provide outdated capabilities."}
                          {index === 3 &&
                            "Lack of pricing transparency prevents users from making purchasing decisions."}
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
                          {index === 0 && "Increases visibility and credibility across all AI platforms."}
                          {index === 1 && "Helps establish thought leadership and drives more accurate AI responses."}
                          {index === 2 && "Creates more citations that AI models will reference in responses."}
                          {index === 3 && "Demonstrates real-world value and improves customer testimonial data."}
                          {index === 4 &&
                            "Builds community engagement that AI systems recognize as positive signals."}
                          {index === 5 &&
                            "Visual content is increasingly indexed by AI systems for richer responses."}
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

export default GustoRecommendations