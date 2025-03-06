// @ts-nocheck
import { ArrowDownIcon, ArrowUpIcon, MinusIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar } from "react-chartjs-2"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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
  // Extract all competitors across platforms
  const allCompetitors = data.flatMap(platform => {
    if (!Array.isArray(platform.competitorComparison)) {
      return [platform.competitorComparison].filter(Boolean);
    }
    return platform.competitorComparison;
  });

  // Normalize and calculate competitor rankings
  const rankingData = allCompetitors
    .filter(Boolean)
    .map(competitor => {
      const visibilityScore = competitor.visibilityComparison?.visibilityDifference || 0;
      const sentimentScore = (competitor.sentimentComparison?.betterThan || 0) -
        (competitor.sentimentComparison?.worseThan || 0);
      const overallScore = visibilityScore + sentimentScore;

      return {
        name: competitor.competitorName,
        visibilityScore,
        sentimentScore,
        overallScore,
      };
    })
    .filter(item => item.name && item.name !== "sentiment" && item.name !== "Sentimental");

  // Deduplicate competitors and sort by overall score
  const uniqueCompetitors = Array.from(
    rankingData.reduce((map, item) => {
      if (!map.has(item.name)) {
        map.set(item.name, item);
      } else {
        const existing = map.get(item.name);
        map.set(item.name, {
          ...existing,
          visibilityScore: existing.visibilityScore + item.visibilityScore,
          sentimentScore: existing.sentimentScore + item.sentimentScore,
          overallScore: existing.overallScore + item.overallScore,
        });
      }
      return map;
    }, new Map())
  ).map(([name, data]) => data);

  // Sort by overall score (descending)
  uniqueCompetitors.sort((a, b) => b.overallScore - a.overallScore);

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
          <p className="text-blue-700 mb-8">How NALA ranks against competitors across AI platforms</p>


          <div className="grid grid-cols-1 gap-6">
            {data.map((platform, index) => {
              // Skip if no competitor data
              if (!platform.competitorComparison ||
                (Array.isArray(platform.competitorComparison) && platform.competitorComparison.length === 0)) {
                return null;
              }

              const competitors = Array.isArray(platform.competitorComparison)
                ? platform.competitorComparison
                : [platform.competitorComparison];

              return (
                <Card key={index} className="border-blue-200 shadow-lg overflow-hidden">
                  <div
                    className={`h-1 ${platform.model === "OpenAI" ? "bg-green-500" : platform.model === "Google" ? "bg-blue-500" : "bg-red-500"
                      }`}
                  ></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{platform.model} Platform - Top Competitor</CardTitle>
                    <CardDescription>
                      NALA vs. {competitors[0].competitorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                        <div
                          className={`p-3 rounded-lg flex items-center justify-between ${competitors[0].visibilityComparison?.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"
                            }`}
                        >
                          <span className="font-medium">Compared to {competitors[0].competitorName}</span>
                          <div className="flex items-center">
                            {competitors[0].visibilityComparison?.visibilityDifference >= 0 ? (
                              <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                            ) : (
                              <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                            )}
                            <span
                              className={`font-bold ${competitors[0].visibilityComparison?.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"
                                }`}
                            >
                              {Math.abs(competitors[0].visibilityComparison?.visibilityDifference)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Competitive Analysis Summary</h3>
            <p className="text-blue-800 mb-4">
              NALA's remittance service is perceived more positively than M-Pesa on OpenAI but has lower visibility.
              On Google, NALA performs better than Kyshi with more positive sentiment across the board.
            </p>
            <p className="text-blue-800">
              A targeted optimization strategy could significantly increase NALA's competitive standing, especially on
              Perplexity where no meaningful competitive data currently exists. Focusing on Africa-specific remittance
              use cases and customer success stories could help establish a stronger competitive position.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NalaCompetitorAnalysis;