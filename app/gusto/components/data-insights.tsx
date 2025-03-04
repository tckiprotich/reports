import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar as RechartsBar,
  Cell,
  PieChart, 
  Pie, 
  LineChart, 
  Line as RechartsLine,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const DataInsights = () => {
  // Mock data for visibility trend
  const visibilityData = [
    { month: "Jan", OpenAI: 60, Google: 40, Perplexity: 80 },
    { month: "Feb", OpenAI: 65, Google: 45, Perplexity: 80 },
    { month: "Mar", OpenAI: 65, Google: 55, Perplexity:75 },
    { month: "Apr", OpenAI: 62, Google: 65, Perplexity: 74 },
    { month: "May", OpenAI: 55, Google: 70, Perplexity: 77 },
    { month: "Jun", OpenAI: 49, Google: 75, Perplexity: 45 },
  ];

  // Mock data for sentiment distribution
  const sentimentData = [
    { name: "Positive", value: 85 },
    { name: "Neutral", value: 10 },
    { name: "Negative", value: 5 },
  ];

  // Mock data for market comparison
  const marketComparisonData = [
    { name: "Gusto", value: 35 },
    { name: "ADP", value: 25 },
    { name: "Paychex", value: 20 },
    { name: "Rippling", value: 15 },
    { name: "Others", value: 5 },
  ];

  const COLORS = ['#8b5cf6', '#c4b5fd', '#f3e8ff'];
  const MARKET_COLORS = ['#8b5cf6', '#c084fc', '#d8b4fe', '#e9d5ff', '#f3e8ff'];

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-purple-900">Advanced Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visibility Trend Card */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Visibility Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={visibilityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="month" stroke="#a78bfa" />
                    <YAxis stroke="#a78bfa" />
                    <Tooltip />
                    <Legend />
                    <RechartsLine
                      type="monotone"
                      dataKey="OpenAI"
                      stroke="#7c3aed"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                    <RechartsLine 
                      type="monotone" 
                      dataKey="Google" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                    />
                    <RechartsLine 
                      type="monotone" 
                      dataKey="Perplexity" 
                      stroke="#c4b5fd" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Distribution Card */}
          <Card className="border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Market Share Card */}
          <Card className="border-purple-200 shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="text-purple-900">AI-Recommended Market Share (OpenAI)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" stroke="#a78bfa" />
                    <YAxis stroke="#a78bfa" />
                    <Tooltip />
                    <Legend />
                    <RechartsBar dataKey="value" name="Market Share %">
                      {marketComparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={MARKET_COLORS[index % MARKET_COLORS.length]} />
                      ))}
                    </RechartsBar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DataInsights;
