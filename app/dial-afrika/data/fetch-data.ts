// Mock data fetching function for Dial Afrika
export const fetchDialAfrikaData = async () => {
  // This would normally fetch from an API
  return [
    {
      "model": "OpenAI",
      "brandName": "Dial Afrika",
      "aggregatedRepresentation": {
        "mentions": 7,
        "sentiment": {
          "positive": 85,
          "negative": 5,
          "neutral": 10
        },
        "visibilityScore": 70,
        "solutionPrimacy": 80,
        "interactionRate": 6,
        "responseRate": 90
      },
      "competitorComparison": [
        {
          "competitorName": "Twilio",
          "sentimentComparison": {
            "betterThan": 40,
            "worseThan": 50,
            "equalTo": 10
          },
          "visibilityComparison": {
            "visibilityDifference": -20
          }
        }
      ],
      "knowledgeGaps": [
        "Detailed product features and specifications",
        "Recent company developments and news",
        "Customer testimonials and case studies",
        "Pricing information and business model"
      ],
      "recommendations": [
        "Create comprehensive Wikipedia article about the brand",
        "Publish more technical content on widely referenced platforms",
        "Increase presence in industry publications",
        "Develop case studies that get cited by reputable sources"
      ],
      "trendAnalysis": {
        "monthlyTrend": 5,
        "quarterlyTrend": 10
      },
      "brandMetrics": {
        "brandAwareness": 60,
        "brandEngagement": 65,
        "marketShare": 15,
        "netPromoterScore": 50,
        "customerSatisfaction": 80
      },
      "topRankedTopics": [
        {
          "topicName": "Dial Afrika technology",
          "relevanceScore": 90
        },
        {
          "topicName": "Dial Afrika solutions",
          "relevanceScore": 85
        },
        {
          "topicName": "Dial Afrika pricing",
          "relevanceScore": 80
        }
      ]
    },
    {
      "model": "Google",
      "brandName": "Dial Afrika",
      "aggregatedRepresentation": {
        "mentions": 6,
        "sentiment": {
          "positive": 90,
          "negative": 5,
          "neutral": 5
        },
        "visibilityScore": 60,
        "solutionPrimacy": 50,
        "interactionRate": 4,
        "responseRate": 75
      },
      "competitorComparison": [
        {
          "competitorName": "Zendesk",
          "sentimentComparison": {
            "betterThan": 30,
            "worseThan": 40,
            "equalTo": 30
          },
          "visibilityComparison": {
            "visibilityDifference": -30
          }
        },
        {
          "competitorName": "Genesys",
          "sentimentComparison": {
            "betterThan": 35,
            "worseThan": 35,
            "equalTo": 30
          },
          "visibilityComparison": {
            "visibilityDifference": -25
          }
        },
        {
          "competitorName": "Dialpad",
          "sentimentComparison": {
            "betterThan": 40,
            "worseThan": 30,
            "equalTo": 30
          },
          "visibilityComparison": {
            "visibilityDifference": -15
          }
        }
      ],
      "knowledgeGaps": [
        "Detailed case studies showcasing successful customer implementations.",
        "More information on specific product features and their benefits.",
        "Deeper insights into their AI-powered analytics capabilities."
      ],
      "recommendations": [
        "Create more content (blog posts, articles, videos) highlighting the unique value proposition for African SMEs.",
        "Actively participate in industry forums and discussions to increase brand visibility.",
        "Optimize website and content for relevant keywords to improve search engine rankings."
      ],
      "trendAnalysis": {
        "monthlyTrend": 2,
        "quarterlyTrend": 3
      },
      "brandMetrics": {
        "brandAwareness": 40,
        "brandEngagement": 50,
        "marketShare": 10,
        "netPromoterScore": 60,
        "customerSatisfaction": 75
      },
      "topRankedTopics": [
        {
          "topicName": "Customer Support Solutions for African Businesses",
          "relevanceScore": 95
        },
        {
          "topicName": "AI-Powered Customer Engagement",
          "relevanceScore": 85
        },
        {
          "topicName": "Bonga CX Platform",
          "relevanceScore": 75
        }
      ]
    },
    {
      "model": "Perplexity",
      "brandName": "Dial Afrika",
      "aggregatedRepresentation": {
        "mentions": 84.2,
        "sentiment": {
          "positive": 83.2,
          "negative": 3,
          "neutral": 21
        },
        "visibilityScore": 66,
        "solutionPrimacy": 68,
        "interactionRate": 64.6,
        "responseRate": 6
      },
      "competitorComparison": [
        {
          "competitorName": "Generic/International CRM tools",
          "sentimentComparison": {
            "betterThan": 1,
            "worseThan": 0,
            "equalTo": 0
          },
          "visibilityComparison": {
            "visibilityDifference": -0.8
          }
        }
      ],
      "knowledgeGaps": [
        "Detailed product features",
        "Pricing information",
        "Customer testimonials and case studies",
        "Integration capabilities"
      ],
      "recommendations": [
        "Provide more detailed product information",
        "Include customer testimonials and success stories",
        "Add pricing details and structure",
        "Highlight unique selling points for African markets"
      ],
      "trendAnalysis": {
        "monthlyTrend": 12.4,
        "quarterlyTrend": 3.8
      },
      "brandMetrics": {
        "brandAwareness": 75.2,
        "brandEngagement": 66.2,
        "marketShare": 3.8,
        "netPromoterScore": 5.8,
        "customerSatisfaction": 86.4
      },
      "topRankedTopics": [
        {
          "topicName": "Customer engagement platform",
          "relevanceScore": 9
        },
        {
          "topicName": "African business solutions/B2B SaaS",
          "relevanceScore": 8
        },
        {
          "topicName": "Affordable CRM/AI-powered omnichannel tool",
          "relevanceScore": 7
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
