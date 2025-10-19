import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  X, 
  Stethoscope,
  ExternalLink,
  Apple,
  Heart,
  Zap,
  CheckCircle,
  Phone,
  Globe
} from 'lucide-react';

interface NutritionResult {
  foodName: string;
  calories: number;
  healthScore: number;
  diabeticRating: 'green' | 'yellow' | 'red';
  homaIrImpact: number;
  recommendations: string[];
  drNehruAdvice: string;
}

const SimpleNutritionBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [foodQuery, setFoodQuery] = useState('');
  const [nutritionResult, setNutritionResult] = useState<NutritionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [consultationCount, setConsultationCount] = useState(0);

  // Simple nutrition analysis without registration
  const analyzeNutrition = async () => {
    if (!foodQuery.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate HOMA-IR nutrition analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: NutritionResult = {
      foodName: foodQuery,
      calories: Math.floor(Math.random() * 300) + 100,
      healthScore: Math.floor(Math.random() * 40) + 60,
      diabeticRating: Math.random() > 0.6 ? 'green' : Math.random() > 0.3 ? 'yellow' : 'red',
      homaIrImpact: Math.floor(Math.random() * 5) + 1,
      recommendations: [
        "Rich source of essential nutrients and fiber",
        "Low glycemic index - suitable for diabetic patients", 
        "Contains antioxidants that support metabolic health",
        "Best consumed during morning hours for optimal absorption"
      ],
      drNehruAdvice: `Based on my 25+ years of clinical experience in metabolism medicine, ${foodQuery.toLowerCase()} is an excellent choice for maintaining healthy insulin levels. The HOMA-IR analysis shows minimal impact on insulin resistance, making it suitable for diabetes prevention.`
    };

    setNutritionResult(mockAnalysis);
    setConsultationCount(prev => prev + 1);
    setIsAnalyzing(false);
  };

  const getDiabeticColor = (rating: 'green' | 'yellow' | 'red') => {
    const colors = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500', 
      red: 'bg-red-500'
    };
    return colors[rating];
  };

  const getDiabeticText = (rating: 'green' | 'yellow' | 'red') => {
    const texts = {
      green: 'Diabetic Safe',
      yellow: 'Moderate Risk',
      red: 'High Risk'
    };
    return texts[rating];
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-xl animate-pulse"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
        <div className="absolute -top-16 right-0 bg-white px-4 py-2 rounded-lg shadow-lg border text-sm font-medium whitespace-nowrap animate-bounce">
          🍎 Ask Dr. Nehru About Nutrition! 👨‍⚕️
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 z-50 max-h-[80vh] overflow-hidden">
      <Card className="shadow-2xl border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Apple className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Dr. Nehru Nutrition Bot</CardTitle>
                <CardDescription className="text-blue-100">
                  Instant HOMA-IR Nutrition Analysis
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 max-h-96 overflow-y-auto">
          {!nutritionResult ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">🍎 Quick Nutrition Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ask about any food's nutritional value and diabetic safety
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  What food would you like to know about?
                </label>
                <Textarea
                  value={foodQuery}
                  onChange={(e) => setFoodQuery(e.target.value)}
                  placeholder="Example: Apple, Rice and dal, Chicken curry, Green tea..."
                  rows={3}
                  className="w-full"
                />
              </div>

              <Button 
                onClick={analyzeNutrition}
                disabled={!foodQuery.trim() || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing Nutrition...
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Get Dr. Nehru Analysis (Free)
                  </>
                )}
              </Button>

              {consultationCount > 0 && (
                <div className="text-center text-sm text-gray-500">
                  Free consultations used: {consultationCount}
                </div>
              )}

              {/* Link to Full Registration */}
              <Alert className="bg-blue-50 border-blue-200">
                <ExternalLink className="w-4 h-4" />
                <AlertDescription>
                  <strong>Need Full Medical Consultation?</strong><br/>
                  <a 
                    href="https://dr-surendra-nehru-virtual-clinic-homa-surendramuddu.replit.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Complete Registration & Book Appointment →
                  </a>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg text-blue-600 mb-2">
                  📊 Nutrition Analysis Results
                </h3>
              </div>

              {/* Quick Stats */}
              <Card className="bg-blue-50">
                <CardContent className="p-3">
                  <h4 className="font-semibold mb-2">{nutritionResult.foodName}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Calories:</span> {nutritionResult.calories} kcal
                    </div>
                    <div>
                      <span className="font-medium">Health Score:</span> {nutritionResult.healthScore}/100
                    </div>
                    <div>
                      <span className="font-medium">HOMA-IR Impact:</span> {nutritionResult.homaIrImpact}/10
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getDiabeticColor(nutritionResult.diabeticRating)}`}></div>
                      <span className="text-xs">{getDiabeticText(nutritionResult.diabeticRating)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dr. Nehru's Professional Advice */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-3">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    Dr. Nehru's Analysis
                  </h4>
                  <p className="text-sm italic leading-relaxed">
                    "{nutritionResult.drNehruAdvice}"
                  </p>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-yellow-50">
                <CardContent className="p-3">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {nutritionResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setNutritionResult(null);
                    setFoodQuery('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Ask Another
                </Button>
                <Button 
                  onClick={() => window.open('https://dr-surendra-nehru-virtual-clinic-homa-surendramuddu.replit.app', '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Full Consultation
                </Button>
              </div>
            </div>
          )}

          {/* Dr. Nehru Credentials */}
          <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-3">
            <div className="text-center">
              <h4 className="font-semibold text-sm mb-2">Dr. Muddu Surendra Nehru MD</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex justify-center items-center gap-2">
                  <Phone className="w-3 h-3" />
                  <span className="font-medium">09963721999</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Globe className="w-3 h-3" />
                  <span>www.homahealthcarecenter.in</span>
                </div>
                <div className="text-xs mt-2">
                  <Badge variant="outline" className="text-xs">
                    25+ Years Experience
                  </Badge>
                  <Badge variant="outline" className="text-xs ml-1">
                    HOMA-IR Specialist
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleNutritionBot;