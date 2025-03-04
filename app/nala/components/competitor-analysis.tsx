import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar } from "react-chartjs-2"

// Make sure Chart.js components are imported and registered properly
import {
  Chart as ChartJS,
  RadarController,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js"

// Register the necessary components for Radar chart
ChartJS.register(
  RadarController,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  Tooltip,
  Legend
)

interface CompetitorAnalysisProps {
  data: any[]
}

const NalaCompetitorAnalysis = ({ data }: CompetitorAnalysisProps) => {
  // Extract competitor data from the provided data
  const competitorData = data.map(platform => {
    const competitors = platform.competitorComparison || [];
    return {
      model: platform.model,
      competitors: Array.isArray(competitors) ? competitors : [competitors]
    };
  });

  // Extract top topics across platforms
  const topTopics = data.flatMap((item) =>
    (item.topRankedTopics || []).map((topic) => ({
      name: topic.topicName,
      score: topic.relevanceScore,
      platform: item.model,
    }))
  );

  return (
    <>
      {/* Topic Association */}
      <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-blue-900">Topic Association Analysis</h2>
          <p className="text-blue-700 mb-8">How NALA is associated with key industry topics</p>

          <Card className="border-blue-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <Radar
                  data={{
                    labels: [...new Set(topTopics.map((item) => item.name.replace(/NALA's\s|NALA\s/g, "")))].slice(0, 6),
                    datasets: data.map((platform, index) => ({
                      label: platform.model,
                      data: topTopics
                        .filter((item) => item.platform === platform.model)
                        .map((item) => item.score),
                      backgroundColor: [
                        "rgba(30, 64, 175, 0.2)",
                        "rgba(59, 130, 246, 0.2)",
                        "rgba(96, 165, 250, 0.2)",
                      ][index],
                      borderColor: [
                        "rgba(30, 64, 175, 1)",
                        "rgba(59, 130, 246, 1)",
                        "rgba(96, 165, 250, 1)",
                      ][index],
                      borderWidth: 2,
                    })),
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      r: {
                        pointLabels: {
                          color: "rgba(30, 64, 175, 0.7)",
                          font: {
                            size: 12,
                          },
                        },
                        grid: {
                          color: "rgba(30, 64, 175, 0.1)",
                        },
                        angleLines: {
                          color: "rgba(30, 64, 175, 0.1)",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "rgba(30, 64, 175, 0.7)",
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Competitor Analysis */}
      <section className="py-12 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-blue-900">Competitor Analysis</h2>
          <p className="text-blue-700 mb-8">How NALA compares to competitors across AI platforms</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitorData.map((platform, index) => (
              platform.competitors[0] && (
                <Card key={index} className="border-blue-200 shadow-lg overflow-hidden">
                  <div
                    className={`h-1 ${platform.model === "OpenAI" ? "bg-green-500" : platform.model === "Google" ? "bg-blue-500" : "bg-red-500"
                      }`}
                  ></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{platform.model} Platform</CardTitle>
                    <CardDescription>vs. {platform.competitors[0].competitorName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Sentiment Comparison</h4>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-green-50 p-2 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                              <span className="text-green-600 font-medium">Better</span>
                            </div>
                            <p className="text-lg font-bold text-green-700">{platform.competitors[0].sentimentComparison?.betterThan}%</p>
                          </div>
                          <div className="bg-yellow-50 p-2 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
                              <span className="text-yellow-600 font-medium">Equal</span>
                            </div>
                            <p className="text-lg font-bold text-yellow-700">{platform.competitors[0].sentimentComparison?.equalTo}%</p>
                          </div>
                          <div className="bg-red-50 p-2 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                              <span className="text-red-600 font-medium">Worse</span>
                            </div>
                            <p className="text-lg font-bold text-red-700">{platform.competitors[0].sentimentComparison?.worseThan}%</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                        <div
                          className={`p-3 rounded-lg flex items-center justify-between ${platform.competitors[0].visibilityComparison?.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"
                            }`}
                        >
                          <span className="font-medium">Compared to competitor</span>
                          <div className="flex items-center">
                            {platform.competitors[0].visibilityComparison?.visibilityDifference >= 0 ? (
                              <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                            ) : (
                              <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                            )}
                            <span
                              className={`font-bold ${platform.competitors[0].visibilityComparison?.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"
                                }`}
                            >
                              {Math.abs(platform.competitors[0].visibilityComparison?.visibilityDifference)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Key Competitive Insights</h4>
            <p className="text-blue-800">
              NALA's remittance service is perceived more positively than M-Pesa on OpenAI but has lower visibility.
              On Google, NALA performs better than Kyshi with more positive sentiment across the board.
              A targeted optimization strategy could significantly increase NALA's competitive standing, especially on
              Perplexity where no meaningful competitive data currently exists.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NalaCompetitorAnalysis;