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

const DialAfrikaCompetitorAnalysis = ({ data }: CompetitorAnalysisProps) => {
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
          <h2 className="text-3xl font-bold mb-2 text-green-900">Topic Association Analysis</h2>
          <p className="text-green-700 mb-8">How Dial Afrika is associated with key industry topics</p>

          <Card className="border-green-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <Radar
                  data={{
                    labels: [...new Set(topTopics.map((item) => item.name.replace(/Dial Afrika\s|DialAfrika\s/g, "")))].slice(0, 6),
                    datasets: data.map((platform, index) => ({
                      label: platform.model,
                      data: topTopics
                        .filter((item) => item.platform === platform.model)
                        .map((item) => item.score),
                      backgroundColor: [
                        "rgba(21, 128, 61, 0.2)",
                        "rgba(37, 99, 235, 0.2)",
                        "rgba(220, 38, 38, 0.2)",
                      ][index],
                      borderColor: [
                        "rgba(21, 128, 61, 1)",
                        "rgba(37, 99, 235, 1)",
                        "rgba(220, 38, 38, 1)",
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
                          color: "rgba(21, 128, 61, 0.7)",
                          font: {
                            size: 12,
                          },
                        },
                        grid: {
                          color: "rgba(21, 128, 61, 0.1)",
                        },
                        angleLines: {
                          color: "rgba(21, 128, 61, 0.1)",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "rgba(21, 128, 61, 0.7)",
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
          <h2 className="text-3xl font-bold mb-2 text-green-900">Competitor Analysis</h2>
          <p className="text-green-700 mb-8">How Dial Afrika ranks against competitors across AI platforms</p>

          {/* Competitor Ranking Table */}
          <Card className="border-green-200 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-green-900">Competitor Rankings</CardTitle>
              <CardDescription>Comprehensive analysis across all AI platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Ranking based on combined visibility and sentiment scores</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Rank</TableHead>
                    <TableHead>Competitor</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead className="text-right">Overall Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uniqueCompetitors.map((competitor, index) => (
                    <TableRow key={competitor.name}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{competitor.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {competitor.visibilityScore > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : competitor.visibilityScore < 0 ? (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          ) : (
                            <MinusIcon className="h-4 w-4 text-amber-600" />
                          )}
                          <span>{Math.abs(competitor.visibilityScore)}% {competitor.visibilityScore > 0 ? 'ahead' : 'behind'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={competitor.sentimentScore > 0 ? "bg-green-500" : competitor.sentimentScore < 0 ? "bg-red-500" : "bg-amber-500"}>
                          {competitor.sentimentScore > 0 ? '+' : ''}{competitor.sentimentScore}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={competitor.overallScore > 0 ? "text-green-600" : competitor.overallScore < 0 ? "text-red-600" : "text-amber-600"}>
                          {competitor.overallScore > 0 ? '+' : ''}{competitor.overallScore}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

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
                <Card key={index} className="border-green-200 shadow-lg overflow-hidden">
                  <div
                    className={`h-1 ${
                      platform.model === "OpenAI" ? "bg-green-500" : platform.model === "Google" ? "bg-blue-500" : "bg-red-500"
                    }`}
                  ></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{platform.model} Platform - Top Competitor</CardTitle>
                    <CardDescription>
                      Dial Afrika vs. {competitors[0].competitorName}
                    </CardDescription>
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
                            <p className="text-lg font-bold text-green-700">{competitors[0].sentimentComparison?.betterThan}%</p>
                          </div>
                          <div className="bg-yellow-50 p-2 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
                              <span className="text-yellow-600 font-medium">Equal</span>
                            </div>
                            <p className="text-lg font-bold text-yellow-700">{competitors[0].sentimentComparison?.equalTo}%</p>
                          </div>
                          <div className="bg-red-50 p-2 rounded-lg">
                            <div className="flex items-center justify-center mb-1">
                              <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                              <span className="text-red-600 font-medium">Worse</span>
                            </div>
                            <p className="text-lg font-bold text-red-700">{competitors[0].sentimentComparison?.worseThan}%</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                        <div
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            competitors[0].visibilityComparison?.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"
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
                              className={`font-bold ${
                                competitors[0].visibilityComparison?.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"
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

          <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-xl font-semibold text-green-900 mb-3">Competitive Analysis Summary</h3>
            <p className="text-green-800 mb-4">
              Dial Afrika shows competitive strengths against niche players like Dialpad and Generic CRM tools, but 
              faces significant visibility challenges when compared to global players like Twilio, Zendesk, and Genesys.
            </p>
            <p className="text-green-800">
              Strategic optimization focusing on Africa-specific use cases and customer success stories could help
              Dial Afrika establish a stronger competitive position across all AI platforms, particularly on 
              Perplexity where virtually no data exists about the company.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DialAfrikaCompetitorAnalysis;