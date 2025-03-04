export const fetchGustoData = async () => {
  // In a real app, this would fetch data from an API
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          model: "OpenAI",
          aggregatedRepresentation: {
            visibilityScore: 90,
            sentiment: { positive: 85, neutral: 10, negative: 5 },
            mentions: 8,
            solutionPrimacy: 80,
            interactionRate: 7,
            responseRate: 95,
          },
          competitorComparison: [
            {
              competitorName: "ADP",
              sentimentComparison: {
                betterThan: 60,
                worseThan: 30,
                equalTo: 10,
              },
              visibilityComparison: {
                visibilityDifference: -20,
              },
            },
            {
              competitorName: "Paychex",
              sentimentComparison: {
                betterThan: 55,
                worseThan: 35,
                equalTo: 10,
              },
              visibilityComparison: {
                visibilityDifference: -15,
              },
            },
          ],
          knowledgeGaps: [
            "Detailed customer satisfaction metrics",
            "Comprehensive market share data",
            "Recent product feature updates"
          ],
          recommendations: [
            "Increase publication of customer success stories",
            "Enhance visibility in industry-specific forums and discussions",
            "Collaborate on webinars with industry leaders"
          ],
          topRankedTopics: [
            { topicName: "Gusto payroll services", relevanceScore: 95 },
            { topicName: "Gusto employee benefits", relevanceScore: 90 },
            { topicName: "Gusto HR tools", relevanceScore: 85 },
          ],
          trendAnalysis: {
            monthlyTrend: 3,
            quarterlyTrend: 5,
          },
          brandMetrics: {
            brandAwareness: 75,
            brandEngagement: 70,
            customerSatisfaction: 85,
          },
        },
        {
          model: "Google",
          aggregatedRepresentation: {
            visibilityScore: 75,
            sentiment: { positive: 85, neutral: 5, negative: 10 },
            mentions: 9,
            solutionPrimacy: 60,
            interactionRate: 7,
            responseRate: 90,
          },
          competitorComparison: [
            {
              competitorName: "QuickBooks Payroll",
              sentimentComparison: {
                betterThan: 60,
                worseThan: 20,
                equalTo: 20,
              },
              visibilityComparison: {
                visibilityDifference: 40,
              },
            },
            {
              competitorName: "Paychex",
              sentimentComparison: {
                betterThan: 70,
                worseThan: 15,
                equalTo: 15,
              },
              visibilityComparison: {
                visibilityDifference: 30,
              },
            },
            {
              competitorName: "Rippling",
              sentimentComparison: {
                betterThan: 40,
                worseThan: 30,
                equalTo: 30,
              },
              visibilityComparison: {
                visibilityDifference: 15,
              },
            },
          ],
          knowledgeGaps: [
            "Detailed breakdown of customer demographics beyond company size and industry.",
            "Specific data on the effectiveness of their embedded payroll partnerships.",
            "Up-to-date trend analysis beyond monthly and quarterly metrics."
          ],
          recommendations: [
            "Focus on publishing more customer case studies and success stories.",
            "Actively engage in industry forums and discussions to address customer concerns and showcase expertise.",
            "Create more video content demonstrating the platform's features and benefits."
          ],
          topRankedTopics: [
            { topicName: "Payroll Services", relevanceScore: 95 },
            { topicName: "HR Solutions", relevanceScore: 85 },
            { topicName: "Small Business", relevanceScore: 75 },
          ],
          trendAnalysis: {
            monthlyTrend: 2,
            quarterlyTrend: 3,
          },
          brandMetrics: {
            brandAwareness: 65,
            brandEngagement: 70,
            customerSatisfaction: 44,
          },
        },
        {
          model: "Perplexity",
          aggregatedRepresentation: {
            visibilityScore: 2,
            sentiment: { positive: 1, neutral: 0, negative: 0 },
            mentions: 1,
            solutionPrimacy: 0,
            interactionRate: 0,
            responseRate: 0,
          },
          competitorComparison: [
            {
              competitorName: "sentiment",
              sentimentComparison: {
                betterThan: 1,
                worseThan: 0,
                equalTo: 0,
              },
              visibilityComparison: {
                visibilityDifference: 0.6,
              },
            },
          ],
          knowledgeGaps: [
            "Gusto's specific features and services",
            "Gusto's target market and industries",
            "Gusto's pricing structure",
            "Gusto's integration capabilities"
          ],
          recommendations: [
            "Provide more comprehensive information about Gusto's features and services",
            "Include user reviews and testimonials",
            "Add comparisons with other payroll and HR software solutions",
            "Update information about recent features and updates"
          ],
          topRankedTopics: [
            { topicName: "Sentiment Analysis", relevanceScore: 86.4 },
            { topicName: "Performance Comparison", relevanceScore: 66.4 },
            { topicName: "AFINN-165", relevanceScore: 61 },
          ],
          trendAnalysis: {
            monthlyTrend: 0,
            quarterlyTrend: 0,
          },
          brandMetrics: {
            brandAwareness: 9,
            brandEngagement: 4,
            customerSatisfaction: 0,
          },
        },
      ])
    }, 1500)
  })
}

// Helper functions for data processing
export const processCompetitorData = (data) => {
  return data
    .map((item) => {
      const model = item.model
      let competitor = null

      if (Array.isArray(item.competitorComparison) && item.competitorComparison.length > 0) {
        competitor = item.competitorComparison[0] // Take the first competitor
      } else if (item.competitorComparison) {
        competitor = item.competitorComparison
      }

      if (!competitor) return null

      return {
        model,
        competitorName: competitor.competitorName,
        sentimentComparison: competitor.sentimentComparison,
        visibilityDifference: competitor.visibilityComparison?.visibilityDifference || 0,
      }
    })
    .filter(Boolean)
}

export const processBrandMetricsData = (data) => {
  const metrics = ["brandAwareness", "brandEngagement", "customerSatisfaction"]
  const result = []

  metrics.forEach((metric) => {
    const item = { name: metric }
    data.forEach((platform) => {
      if (platform.brandMetrics && platform.brandMetrics[metric] !== undefined) {
        item[platform.model] = platform.brandMetrics[metric]
      }
    })
    result.push(item)
  })

  return result
}

export const processTrendData = (data) => {
  const trends = ["monthlyTrend", "quarterlyTrend"]
  const result = []

  trends.forEach((trend) => {
    const item = { name: trend }
    data.forEach((platform) => {
      if (platform.trendAnalysis && platform.trendAnalysis[trend] !== undefined) {
        item[platform.model] = platform.trendAnalysis[trend]
      }
    })
    result.push(item)
  })

  return result
}
