// Mock data fetching function
export const fetchNalaData = async () => {
  // This would normally fetch from an API
  return [
    {
      "model": "OpenAI",
      "brandName": "NALA",
      "aggregatedRepresentation": {
        "mentions": 8,
        "sentiment": {
          "positive": 85,
          "negative": 5,
          "neutral": 10
        },
        "visibilityScore": 80,
        "solutionPrimacy": 70,
        "interactionRate": 6,
        "responseRate": 90
      },
      "competitorComparison": [
        {
          "competitorName": "M-Pesa",
          "sentimentComparison": {
            "betterThan": 30,
            "worseThan": 50,
            "equalTo": 20
          },
          "visibilityComparison": {
            "visibilityDifference": -20
          }
        },
        {
          "competitorName": "WorldRemit",
          "sentimentComparison": {
            "betterThan": 40,
            "worseThan": 30,
            "equalTo": 30
          },
          "visibilityComparison": {
            "visibilityDifference": -10
          }
        }
      ],
      "knowledgeGaps": [
        "Detailed user feedback and reviews",
        "Specific transaction fee structures",
        "Recent partnerships and expansions",
        "User base demographics and growth metrics"
      ],
      "recommendations": [
        "Publish detailed case studies highlighting user experiences",
        "Provide transparent information on fee structures",
        "Announce partnerships and expansions through press releases",
        "Share user demographics and growth metrics in annual reports"
      ],
      "trendAnalysis": {
        "monthlyTrend": 5,
        "quarterlyTrend": 12
      },
      "brandMetrics": {
        "brandAwareness": 70,
        "brandEngagement": 65,
        "marketShare": 10,
        "netPromoterScore": 60,
        "customerSatisfaction": 80
      },
      "topRankedTopics": [
        {
          "topicName": "NALA's cross-border payment solutions",
          "relevanceScore": 95
        },
        {
          "topicName": "NALA's partnership with M-Pesa",
          "relevanceScore": 90
        },
        {
          "topicName": "NALA's expansion into European markets",
          "relevanceScore": 85
        }
      ]
    },
    {
      "model": "Google",
      "brandName": "Nala",
      "aggregatedRepresentation": {
        "mentions": 6,
        "sentiment": {
          "positive": 75,
          "negative": 25,
          "neutral": 0
        },
        "visibilityScore": 60,
        "solutionPrimacy": 30,
        "interactionRate": 5,
        "responseRate": 70
      },
      "competitorComparison": [
        {
          "competitorName": "Kyshi",
          "sentimentComparison": {
            "betterThan": 40,
            "worseThan": 30,
            "equalTo": 30
          },
          "visibilityComparison": {
            "visibilityDifference": -10
          }
        },
        {
          "competitorName": "Tulix",
          "sentimentComparison": {
            "betterThan": 50,
            "worseThan": 20,
            "equalTo": 30
          },
          "visibilityComparison": {
            "visibilityDifference": -5
          }
        }
      ],
      "knowledgeGaps": [
        "Detailed information on specific product lines for each Nala brand (as there appear to be multiple)",
        "Comprehensive overview of Nala's market share in different sectors",
        "More in-depth analysis of customer reviews and feedback across various platforms"
      ],
      "recommendations": [
        "Create disambiguation pages to differentiate between the various companies named 'Nala'.",
        "Actively manage and respond to online reviews and mentions to improve public perception.",
        "Publish more detailed product information and case studies to showcase the brand's expertise and offerings."
      ],
      "trendAnalysis": {
        "monthlyTrend": 2,
        "quarterlyTrend": 3
      },
      "brandMetrics": {
        "brandAwareness": 55,
        "brandEngagement": 60,
        "marketShare": 15,
        "netPromoterScore": 45,
        "customerSatisfaction": 70
      },
      "topRankedTopics": [
        {
          "topicName": "Cross-border payments (NALA - African Fintech)",
          "relevanceScore": 90
        },
        {
          "topicName": "Remittance solutions",
          "relevanceScore": 85
        },
        {
          "topicName": "African diaspora finance",
          "relevanceScore": 75
        }
      ]
    },
    {
      "model": "Perplexity",
      "brandName": "Nala",
      "aggregatedRepresentation": {
        "mentions": 0.8,
        "sentiment": {
          "positive": 0.2,
          "negative": 0,
          "neutral": 0.6
        },
        "visibilityScore": 1,
        "solutionPrimacy": 0,
        "interactionRate": 0,
        "responseRate": 0
      },
      "competitorComparison": [
        {
          "competitorName": "Reputation.com",
          "sentimentComparison": {
            "betterThan": 0,
            "worseThan": 0.2,
            "equalTo": 0.6
          },
          "visibilityComparison": {
            "visibilityDifference": -1
          }
        }
      ],
      "knowledgeGaps": [
        "Detailed product features",
        "Customer reviews",
        "Company history",
        "Pricing information",
        "Target market"
      ],
      "recommendations": [
        "Provide more comprehensive information about Nala's services and features",
        "Include customer testimonials and case studies",
        "Add details about Nala's unique selling propositions",
        "Update information with recent news and developments"
      ],
      "trendAnalysis": {
        "monthlyTrend": 0.2,
        "quarterlyTrend": 0
      },
      "brandMetrics": {
        "brandAwareness": 4.6,
        "brandEngagement": 2,
        "marketShare": 0,
        "netPromoterScore": 0,
        "customerSatisfaction": 0
      },
      "topRankedTopics": [
        {
          "topicName": "African payment solutions",
          "relevanceScore": 24
        },
        {
          "topicName": "Financial inclusion",
          "relevanceScore": 16.4
        },
        {
          "topicName": "Cross-border payments",
          "relevanceScore": 2.4
        }
      ]
    }
  ];
};

// Helper function to process brand metrics data for easier display
export const processBrandMetricsData = (data) => {
  return [
    {
      name: "brandAwareness",
      OpenAI: data[0].brandMetrics.brandAwareness,
      Google: data[1].brandMetrics.brandAwareness,
      Perplexity: data[2].brandMetrics.brandAwareness,
    },
    {
      name: "brandEngagement",
      OpenAI: data[0].brandMetrics.brandEngagement,
      Google: data[1].brandMetrics.brandEngagement,
      Perplexity: data[2].brandMetrics.brandEngagement,
    },
    {
      name: "customerSatisfaction",
      OpenAI: data[0].brandMetrics.customerSatisfaction,
      Google: data[1].brandMetrics.customerSatisfaction,
      Perplexity: data[2].brandMetrics.customerSatisfaction || 0,
    },
  ];
};

// Helper function to process trend data for easier display
export const processTrendData = (data) => {
  return [
    {
      name: "monthlyTrend",
      OpenAI: data[0].trendAnalysis.monthlyTrend,
      Google: data[1].trendAnalysis.monthlyTrend,
      Perplexity: data[2].trendAnalysis.monthlyTrend,
    },
    {
      name: "quarterlyTrend",
      OpenAI: data[0].trendAnalysis.quarterlyTrend,
      Google: data[1].trendAnalysis.quarterlyTrend,
      Perplexity: data[2].trendAnalysis.quarterlyTrend,
    },
  ];
};

// Helper function to process competitor data
export const processCompetitorData = (data) => {
  return data.map((platform) => {
    const competitor = platform.competitorComparison?.[0] || {};
    return {
      model: platform.model,
      competitorName: competitor.competitorName || 'N/A',
      sentimentComparison: competitor.sentimentComparison || {
        betterThan: 0,
        worseThan: 0,
        equalTo: 0,
      },
      visibilityDifference: competitor.visibilityComparison?.visibilityDifference || 0,
    };
  });
};
