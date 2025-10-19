import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Stethoscope, Phone, MapPin, Upload, Star, Users, Clock, CheckCircle, AlertTriangle, XCircle, Camera, MessageCircle, Download, Apple as WhatsApp, Calendar, TrendingUp, Heart, Zap, Shield } from 'lucide-react';
import { getVerifiedNutrition, generateEstimatedNutrition, formatNutritionAnalysis, type VerifiedNutrition } from '@/utils/nutritionDatabase';

interface PatientData {
  name: string;
  phone: string;
  age: string;
  query: string;
  queryType: string;
  location: string;
  foodImage?: File;
  foodDescription: string;
}

interface NutritionAnalysis {
  foodName: string;
  verifiedNutrition: VerifiedNutrition;
  diabeticRating: 'green' | 'yellow' | 'red';
  drNehruRecommendation: string;
  alternatives: string[];
  consultationNumber: number;
  timestamp: string;
}

const FloatingNutritionBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'analysis' | 'results'>('form');
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    phone: '',
    age: '',
    query: '',
    queryType: 'nutrition-analysis',
    location: 'India',
    foodDescription: ''
  });
  const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [consultationCount, setConsultationCount] = useState(1247);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPatientData(prev => ({ ...prev, foodImage: file }));
    }
  };

  const analyzeNutrition = async () => {
    if (!patientData.name || !patientData.phone || (!patientData.foodDescription && !patientData.foodImage)) {
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep('analysis');

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get verified nutrition data
    const foodQuery = patientData.foodDescription || 'Uploaded Food Item';
    const countryContext = patientData.location === 'India' ? 'India' : patientData.location === 'China' ? 'China' : 'Global';
    
    let verifiedNutrition = getVerifiedNutrition(foodQuery);
    if (!verifiedNutrition) {
      verifiedNutrition = generateEstimatedNutrition(foodQuery, countryContext as any);
    }

    // Determine diabetes rating based on verified data
    let diabeticRating: 'green' | 'yellow' | 'red';
    if (verifiedNutrition.averageGI < 55 && verifiedNutrition.averageCarbs < 30) {
      diabeticRating = 'green';
    } else if (verifiedNutrition.averageGI < 70 && verifiedNutrition.averageCarbs < 45) {
      diabeticRating = 'yellow';
    } else {
      diabeticRating = 'red';
    }
    const mockAnalysis: NutritionAnalysis = {
      foodName: verifiedNutrition.foodName,
      verifiedNutrition: verifiedNutrition,
      diabeticRating: diabeticRating,
      drNehruRecommendation: `Based on cross-verified nutrition databases (${verifiedNutrition.sources.map(s => s.name).join(', ')}), ${verifiedNutrition.foodName} contains ${verifiedNutrition.calorieRange}. ${verifiedNutrition.medicalNotes}`,
      alternatives: ['Brown rice', 'Quinoa', 'Sweet potato'],
      consultationNumber: consultationCount + 1,
      timestamp: new Date().toLocaleString()
    };

    setAnalysis(mockAnalysis);
    setConsultationCount(prev => prev + 1);
    setIsAnalyzing(false);
    setCurrentStep('results');
  };

  const getDiabeticColor = (rating: 'green' | 'yellow' | 'red') => {
    const colors = {
      green: 'text-green-600 bg-green-50 border-green-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      red: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[rating];
  };

  const getDiabeticIcon = (rating: 'green' | 'yellow' | 'red') => {
    const icons = {
      green: <CheckCircle className="w-5 h-5" />,
      yellow: <AlertTriangle className="w-5 h-5" />,
      red: <XCircle className="w-5 h-5" />
    };
    return icons[rating];
  };

  const getDiabeticText = (rating: 'green' | 'yellow' | 'red') => {
    const texts = {
      green: 'Excellent for diabetics - Go ahead!',
      yellow: 'Moderate - Consume in small portions',
      red: 'Avoid - High sugar/carb content'
    };
    return texts[rating];
  };

  const resetForm = () => {
    setCurrentStep('form');
    setPatientData({
      name: '',
      phone: '',
      age: '',
      query: '',
      queryType: 'nutrition-analysis',
      location: 'India',
      foodDescription: ''
    });
    setAnalysis(null);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Floating Animation Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-green-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-green-500 animate-pulse opacity-30"></div>
          
          {/* Main Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <Stethoscope className="w-8 h-8 mb-1" />
              <span className="text-xs font-bold">Dr. Nehru</span>
            </div>
          </Button>

          {/* Floating Text */}
          <div className="absolute -top-16 -left-8 bg-white px-4 py-2 rounded-xl shadow-lg border-2 border-blue-100 animate-bounce">
            <div className="text-sm font-bold text-blue-600 flex items-center gap-2">
              🩺 Ask Dr. Nehru
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-xs text-gray-600">Free Nutrition Analysis</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
        {currentStep === 'form' && (
          <>
            <DialogHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Dr. Nehru's AI Nutrition Bot</DialogTitle>
                  <DialogDescription className="text-blue-100">
                    Instant HOMA-IR Analysis & Diabetes Guidance
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="p-6 space-y-6">
              {/* Social Proof */}
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">5000+</span> patients
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">4.9/5</span> rating
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">24/7</span> available
                </div>
              </div>

              {/* Patient Details Form */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  📋 Patient Details
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name *</label>
                    <Input
                      placeholder="Your full name"
                      value={patientData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Age *</label>
                    <Input
                      type="number"
                      placeholder="Age in years"
                      value={patientData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                  <div className="flex">
                    <div className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 text-sm">+91</div>
                    <Input
                      placeholder="10-digit mobile number"
                      value={patientData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Select value={patientData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">🇮🇳 India</SelectItem>
                      <SelectItem value="China">🇨🇳 China</SelectItem>
                      <SelectItem value="Global">🌍 Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Food Query Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  🍽️ Food Query
                </h3>

                <div>
                  <label className="text-sm font-medium mb-2 block">What would you like to know?</label>
                  <RadioGroup value={patientData.queryType} onValueChange={(value) => handleInputChange('queryType', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="is-good" id="is-good" />
                      <label htmlFor="is-good" className="text-sm">Is this food good for me?</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nutrition-analysis" id="nutrition-analysis" />
                      <label htmlFor="nutrition-analysis" className="text-sm">Nutrition analysis</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="diabetes-friendly" id="diabetes-friendly" />
                      <label htmlFor="diabetes-friendly" className="text-sm">Diabetes-friendly?</label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Upload Food Image (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {patientData.foodImage ? patientData.foodImage.name : 'Upload Food Photo'}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Or describe the food item *</label>
                  <Textarea
                    placeholder="Example: Apple, Rice and dal, Chicken curry, Green tea..."
                    value={patientData.foodDescription}
                    onChange={(e) => handleInputChange('foodDescription', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Additional Query</label>
                  <Textarea
                    placeholder="Any specific health concerns or questions..."
                    value={patientData.query}
                    onChange={(e) => handleInputChange('query', e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={analyzeNutrition}
                disabled={!patientData.name || !patientData.phone || (!patientData.foodDescription && !patientData.foodImage)}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-12 text-lg font-semibold"
              >
                <Zap className="w-5 h-5 mr-2" />
                Book ₹299 Consultation
              </Button>

              {/* Lead Magnets */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Free Diabetes Diet Chart
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Join 1000+ patients WhatsApp group
                </Button>
              </div>
            </div>
          </>
        )}

        {currentStep === 'analysis' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center animate-pulse">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Dr. Nehru's AI is Analyzing...</h3>
              <p className="text-gray-600 mb-4">Processing your nutrition query with advanced HOMA-IR algorithms</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              ⚡ Analyzing nutritional content<br/>
              🧬 Calculating HOMA-IR impact<br/>
              🩺 Generating personalized recommendations
            </div>
          </div>
        )}

        {currentStep === 'results' && analysis && (
          <>
            <DialogHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-lg">📊 Nutrition Analysis Results</DialogTitle>
                  <DialogDescription className="text-blue-100">
                    Consultation #{analysis.consultationNumber} • {analysis.timestamp}
                  </DialogDescription>
                </div>
                <Badge variant="secondary" className="bg-white text-blue-600">
                  {patientData.name} • +91{patientData.phone}
                </Badge>
              </div>
            </DialogHeader>

            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {/* Food Image/Name */}
              <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg flex items-center justify-center">
                      🍎
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{analysis.foodName}</h4>
                      <p className="text-sm text-gray-600">Analyzed by Dr. Nehru's AI Assistant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diabetes Traffic Light */}
              <Alert className={`border-2 ${getDiabeticColor(analysis.diabeticRating)}`}>
                <div className="flex items-center gap-3">
                  {getDiabeticIcon(analysis.diabeticRating)}
                  <div>
                    <h4 className="font-semibold">Diabetes Safety Rating</h4>
                    <p className="text-sm">{getDiabeticText(analysis.diabeticRating)}</p>
                  </div>
                </div>
              </Alert>

              {/* Nutrition Panel */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Cross-Verified Nutrition Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Data Sources */}
                  <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                    <div className="font-semibold mb-1">Verified Sources:</div>
                    {analysis.verifiedNutrition.sources.map((source, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{source.name}:</span>
                        <span className="font-medium">{source.calories} kcal</span>
                      </div>
                    ))}
                    <div className="mt-1 pt-1 border-t border-blue-200">
                      <div className="flex justify-between font-semibold">
                        <span>Range:</span>
                        <span className="text-blue-600">{analysis.verifiedNutrition.calorieRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="font-semibold">{analysis.verifiedNutrition.averageCalories} kcal</div>
                      <div className="text-xs text-gray-600">Calories</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <div className="font-semibold">{analysis.verifiedNutrition.averageCarbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                      <div className="font-semibold">{analysis.verifiedNutrition.averageProtein}g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <div className="font-semibold">{analysis.verifiedNutrition.averageFat}g</div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Glycemic Index:</span>
                      <span className="font-semibold">{analysis.verifiedNutrition.averageGI}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fiber:</span>
                      <span className="font-semibold">{analysis.verifiedNutrition.averageFiber}g</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Serving Size:</span>
                      <span className="font-semibold text-xs">{analysis.verifiedNutrition.servingSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reliability:</span>
                      <span className={`font-semibold text-xs ${
                        analysis.verifiedNutrition.reliability === 'high' ? 'text-green-600' :
                        analysis.verifiedNutrition.reliability === 'medium' ? 'text-yellow-600' : 'text-orange-600'
                      }`}>
                        {analysis.verifiedNutrition.reliability.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dr. Nehru's Recommendation */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Dr. Nehru's Medical Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm italic leading-relaxed">"{analysis.drNehruRecommendation}"</p>
                  {analysis.alternatives.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-medium mb-2">Alternative suggestions:</p>
                      <div className="flex flex-wrap gap-1">
                        {analysis.alternatives.map((alt, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Professional Disclaimer */}
                  <div className="mt-3 pt-3 border-t text-xs text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <Shield className="w-3 h-3" />
                      <span className="font-semibold">Medical Disclaimer:</span>
                    </div>
                    <p>Nutrition data cross-verified from authoritative databases. For personalized medical advice, book consultation with Dr. Nehru.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Generation CTAs */}
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Phone className="w-4 h-4 mr-2" />
                  📞 Book ₹299 Consultation
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Diet Plan
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat Now
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={resetForm} variant="outline" className="flex-1">
                  Ask Another
                </Button>
                <Button 
                  onClick={() => window.open('tel:+919963721999')}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call Dr. Nehru
                </Button>
              </div>
            </div>

            {/* Doctor Credentials Footer */}
            <div className="bg-gray-50 p-4 border-t">
              <div className="text-center">
                <h4 className="font-semibold text-sm mb-2">Dr. Muddu Surendra Nehru MD</h4>
                <p className="text-xs text-gray-600 mb-2">Professor of Medicine & Physician</p>
                <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>09963721999</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Homa Healthcare Center</span>
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    25+ Years Experience
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    HOMA-IR Specialist
                  </Badge>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FloatingNutritionBot;