import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const GustoCallToAction = () => {
  return (
    <section className="py-16 px-6 md:px-10 lg:px-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ready to dominate AI search?</h2>
            <p className="text-lg mb-6">
              Lantern helps brands like Gusto become the top recommendation across all AI platforms. Our
              comprehensive approach ensures your brand is visible, accurately represented, and recommended to
              millions of potential customers using AI as their primary discovery tool.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-white">Dedicated AI SEO strategist for your brand</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-white">Cross-platform visibility optimization</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <p className="text-white">Monthly performance and optimization reports</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl"
                size="lg"
                asChild
              >
                <a href="https://lantern.ai/demo">Book a Strategy Session</a>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg" asChild>
                <a href="mailto:hello@lantern.ai">Contact Us</a>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Why act now?</h3>
                </div>
                <p className="text-white/90 mb-4">
                  AI platforms are evolving rapidly and early optimization provides a significant competitive
                  advantage. Brands that optimize for AI visibility now will establish themselves as the default
                  recommendation for HR and payroll solutions.
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-purple-800 font-bold text-sm">GPT</span>
                      </div>
                      <span>ChatGPT</span>
                    </div>
                    <span className="text-purple-100 font-medium">180m+ users</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-purple-800 font-bold text-sm">P</span>
                      </div>
                      <span>Perplexity</span>
                    </div>
                    <span className="text-purple-100 font-medium">15M+ users</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-purple-800 font-bold text-sm">G</span>
                      </div>
                      <span>Google AI</span>
                    </div>
                    <span className="text-purple-100 font-medium">275m+ users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GustoCallToAction
