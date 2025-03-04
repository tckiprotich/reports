import { CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ExecutiveSummaryProps {
  data: any[]
}

const DialAfrikaExecutiveSummary = ({ data }: ExecutiveSummaryProps) => {
  return (
    <section className="py-12 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-900">Executive Summary</h2>
        <Card className="border-green-200 shadow-lg">
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Dial Afrika's visibility across AI platforms varies significantly, indicating major opportunities for
              optimization. Our analysis of OpenAI, Google (Gemini), and Perplexity reveals:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800">OpenAI</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-800">Visibility</span>
                      <span className="text-sm font-medium text-green-800">
                        {data[0].aggregatedRepresentation.visibilityScore}%
                      </span>
                    </div>
                    <Progress 
                      value={data[0].aggregatedRepresentation.visibilityScore} 
                      className="h-2 bg-green-200" 
                      indicatorClassName="bg-green-500" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-800">Sentiment</span>
                      <span className="text-sm font-medium text-green-800">
                        {data[0].aggregatedRepresentation.sentiment.positive}%
                      </span>
                    </div>
                    <Progress 
                      value={data[0].aggregatedRepresentation.sentiment.positive} 
                      className="h-2 bg-green-200" 
                      indicatorClassName="bg-green-500" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 border border-blue-200">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-800">Google</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-blue-800">Visibility</span>
                      <span className="text-sm font-medium text-blue-800">
                        {data[1].aggregatedRepresentation.visibilityScore}%
                      </span>
                    </div>
                    <Progress 
                      value={data[1].aggregatedRepresentation.visibilityScore} 
                      className="h-2 bg-blue-200" 
                      indicatorClassName="bg-blue-500" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-blue-800">Sentiment</span>
                      <span className="text-sm font-medium text-blue-800">
                        {data[1].aggregatedRepresentation.sentiment.positive}%
                      </span>
                    </div>
                    <Progress 
                      value={data[1].aggregatedRepresentation.sentiment.positive} 
                      className="h-2 bg-blue-200" 
                      indicatorClassName="bg-blue-500" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 border border-red-200">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-red-800">Perplexity</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-red-800">Visibility</span>
                      <span className="text-sm font-medium text-red-800">
                        {data[2].aggregatedRepresentation.visibilityScore}%
                      </span>
                    </div>
                    <Progress 
                      value={data[2].aggregatedRepresentation.visibilityScore} 
                      className="h-2 bg-red-200" 
                      indicatorClassName="bg-red-500" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-red-800">Sentiment</span>
                      <span className="text-sm font-medium text-red-800">
                        {data[2].aggregatedRepresentation.sentiment.positive}%
                      </span>
                    </div>
                    <Progress 
                      value={data[2].aggregatedRepresentation.sentiment.positive} 
                      className="h-2 bg-red-200" 
                      indicatorClassName="bg-red-500" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 rounded">
              <p className="font-medium text-green-800">
                African businesses are rapidly adopting AI-powered customer engagement solutions, but Dial Afrika's visibility 
                on emerging AI platforms is preventing maximum discovery by potential enterprise clients.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default DialAfrikaExecutiveSummary
