"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

export default function CompetitorAnalysis() {
  // Data from the JSON file
  const competitorData = {
    OpenAI: {
      competitorName: "Competitor 1",
      sentimentComparison: {
        betterThan: 42,
        worseThan: 17,
        equalTo: 11.6,
      },
      visibilityDifference: -2.2,
    },
    Google: {
      competitors: [
        {
          competitorName: "Zapier",
          sentimentComparison: {
            betterThan: 60,
            worseThan: 20,
            equalTo: 20,
          },
          visibilityDifference: -20,
        },
        {
          competitorName: "Make.com",
          sentimentComparison: {
            betterThan: 50,
            worseThan: 30,
            equalTo: 20,
          },
          visibilityDifference: -10,
        },
      ],
    },
    Perplexity: {
      competitorName: "Parabola",
      sentimentComparison: {
        betterThan: 0.2,
        worseThan: 0,
        equalTo: 0.8,
      },
      visibilityDifference: -0.4,
    },
  }

  return (
    <section className="py-12 px-6 md:px-10 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-orange-900">Competitor Analysis</h2>
        <p className="text-orange-700 mb-8">How Gumloop compares to competitors across AI platforms</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* OpenAI Competitor */}
          <Card className="border-orange-200 shadow-lg overflow-hidden">
            <div className="bg-blue-500 h-1"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">OpenAI Platform</CardTitle>
              <CardDescription>vs. {competitorData.OpenAI.competitorName}</CardDescription>
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
                      <p className="text-lg font-bold text-green-700">
                        {competitorData.OpenAI.sentimentComparison.betterThan}%
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="text-yellow-600 font-medium">Equal</span>
                      </div>
                      <p className="text-lg font-bold text-yellow-700">
                        {competitorData.OpenAI.sentimentComparison.equalTo}%
                      </p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                        <span className="text-red-600 font-medium">Worse</span>
                      </div>
                      <p className="text-lg font-bold text-red-700">
                        {competitorData.OpenAI.sentimentComparison.worseThan}%
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                  <div
                    className={`p-3 rounded-lg flex items-center justify-between ${competitorData.OpenAI.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"}`}
                  >
                    <span className="font-medium">Compared to competitor</span>
                    <div className="flex items-center">
                      {competitorData.OpenAI.visibilityDifference >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`font-bold ${competitorData.OpenAI.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"}`}
                      >
                        {competitorData.OpenAI.visibilityDifference}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Competitor - Zapier */}
          <Card className="border-orange-200 shadow-lg overflow-hidden">
            <div className="bg-green-500 h-1"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Google Platform</CardTitle>
              <CardDescription>vs. {competitorData.Google.competitors[0].competitorName}</CardDescription>
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
                      <p className="text-lg font-bold text-green-700">
                        {competitorData.Google.competitors[0].sentimentComparison.betterThan}%
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="text-yellow-600 font-medium">Equal</span>
                      </div>
                      <p className="text-lg font-bold text-yellow-700">
                        {competitorData.Google.competitors[0].sentimentComparison.equalTo}%
                      </p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                        <span className="text-red-600 font-medium">Worse</span>
                      </div>
                      <p className="text-lg font-bold text-red-700">
                        {competitorData.Google.competitors[0].sentimentComparison.worseThan}%
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                  <div
                    className={`p-3 rounded-lg flex items-center justify-between ${competitorData.Google.competitors[0].visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"}`}
                  >
                    <span className="font-medium">Compared to competitor</span>
                    <div className="flex items-center">
                      {competitorData.Google.competitors[0].visibilityDifference >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`font-bold ${competitorData.Google.competitors[0].visibilityDifference >= 0 ? "text-green-700" : "text-red-700"}`}
                      >
                        {competitorData.Google.competitors[0].visibilityDifference}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Perplexity Competitor */}
          <Card className="border-orange-200 shadow-lg overflow-hidden">
            <div className="bg-red-500 h-1"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Perplexity Platform</CardTitle>
              <CardDescription>vs. {competitorData.Perplexity.competitorName}</CardDescription>
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
                      <p className="text-lg font-bold text-green-700">
                        {competitorData.Perplexity.sentimentComparison.betterThan}%
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="text-yellow-600 font-medium">Equal</span>
                      </div>
                      <p className="text-lg font-bold text-yellow-700">
                        {competitorData.Perplexity.sentimentComparison.equalTo}%
                      </p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                        <span className="text-red-600 font-medium">Worse</span>
                      </div>
                      <p className="text-lg font-bold text-red-700">
                        {competitorData.Perplexity.sentimentComparison.worseThan}%
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Visibility Difference</h4>
                  <div
                    className={`p-3 rounded-lg flex items-center justify-between ${competitorData.Perplexity.visibilityDifference >= 0 ? "bg-green-50" : "bg-red-50"}`}
                  >
                    <span className="font-medium">Compared to competitor</span>
                    <div className="flex items-center">
                      {competitorData.Perplexity.visibilityDifference >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span
                        className={`font-bold ${competitorData.Perplexity.visibilityDifference >= 0 ? "text-green-700" : "text-red-700"}`}
                      >
                        {competitorData.Perplexity.visibilityDifference}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-5 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-900 mb-3">Competitive Analysis Summary</h3>
          <p className="text-orange-800 mb-4">
            Gumloop shows strong sentiment performance against competitors on Google and OpenAI, but lags in overall
            visibility. On Perplexity, both visibility and sentiment are significantly lower than competitors,
            representing a critical area for improvement.
          </p>
          <p className="text-orange-800">
            Strategic optimization can help Gumloop close these visibility gaps and establish a stronger competitive
            position across all AI platforms.
          </p>
        </div>
      </div>
    </section>
  )
}

