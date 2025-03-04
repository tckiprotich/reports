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
              <h2 className="text-3xl font-bold text-blue-900">Insights & Recommendations</h2>
              <p className="text-blue-700">Critical findings and strategic next steps</p>
            </div>
            <TabsList className="bg-blue-100">
              <TabsTrigger value="gaps" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Knowledge Gaps
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Recommendations
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="gaps" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uniqueKnowledgeGaps.slice(0, 6).map((gap, index) => (
                <Card key={index} className="border-blue-200 shadow-lg overflow-hidden">
                  <div className="bg-blue-500 h-1"></div>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <AlertCircle className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{gap}</h3>
                        <p className="text-blue-700 mt-1">
                          {index === 0 && "Users asking about this receive incomplete or outdated information."}
                          {index === 1 &&
                            "This creates trust issues as users can't verify financial reliability."}
                          {index === 2 &&
                            "Without fee clarity, users may choose alternative remittance services."}
                          {index === 3 &&
                            "AI platforms lack recent data about NALA's expansion into new markets."}
                          {index === 4 &&
                            "Users can't access demographic data about NALA's growth across Africa."}
                          {index === 5 &&
                            "Current AI responses lack specifics about NALA's competitive advantages."}
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
              {uniqueRecommendations.slice(0, 6).map((recommendation, index) => (
                <Card key={index} className="border-blue-200 shadow-lg overflow-hidden">
                  <div className="bg-blue-500 h-1"></div>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-3 mr-4">
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{recommendation}</h3>
                        <p className="text-blue-700 mt-1">
                          {index === 0 && "Showcases authentic user experiences and builds trust."}
                          {index === 1 && "Improves AI understanding of NALA's competitive advantages."}
                          {index === 2 && "Increases visibility across AI platforms through trusted sources."}
                          {index === 3 && "Creates authoritative sources for AI platforms to reference."}
                          {index === 4 &&
                            "Enhances brand credibility and accessibility of accurate information."}
                          {index === 5 &&
                            "Increases discoverability among diaspora communities searching for remittance solutions."}
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
