import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowDown, Sparkles, Heart, Star } from 'lucide-react';

const AnimatedLanding = () => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [currentFood, setCurrentFood] = useState(0);

  // 30 Indian languages with "What to eat?" translation
  const languages = [
    { lang: 'Hindi', text: 'क्या खाना है?', script: 'Devanagari' },
    { lang: 'Telugu', text: 'ఏమి తినాలి?', script: 'Telugu' },
    { lang: 'Tamil', text: 'என்ன சாப்பிட வேண்டும்?', script: 'Tamil' },
    { lang: 'Bengali', text: 'কি খেতে হবে?', script: 'Bengali' },
    { lang: 'Marathi', text: 'काय खायचं?', script: 'Devanagari' },
    { lang: 'Gujarati', text: 'શું ખાવું?', script: 'Gujarati' },
    { lang: 'Kannada', text: 'ಏನು ತಿನ್ನಬೇಕು?', script: 'Kannada' },
    { lang: 'Malayalam', text: 'എന്താണ് കഴിക്കേണ്ടത്?', script: 'Malayalam' },
    { lang: 'Punjabi', text: 'ਕੀ ਖਾਣਾ ਹੈ?', script: 'Gurmukhi' },
    { lang: 'Odia', text: 'କଣ ଖାଇବା?', script: 'Odia' },
    { lang: 'Assamese', text: 'কি খাব?', script: 'Bengali' },
    { lang: 'Urdu', text: 'کیا کھانا ہے؟', script: 'Arabic' },
    { lang: 'Sanskrit', text: 'किं भोक्तव्यम्?', script: 'Devanagari' },
    { lang: 'Konkani', text: 'कितें खावचें?', script: 'Devanagari' },
    { lang: 'Manipuri', text: 'ꯀꯔꯤ ꯆꯥꯒꯗꯒꯦ?', script: 'Meetei' },
    { lang: 'Nepali', text: 'के खाने?', script: 'Devanagari' },
    { lang: 'Sindhi', text: 'ڇا کائڻو آهي؟', script: 'Arabic' },
    { lang: 'Kashmiri', text: 'کیاہ کھیون؟', script: 'Arabic' },
    { lang: 'Dogri', text: 'क्या खाणा ऐ?', script: 'Devanagari' },
    { lang: 'Maithili', text: 'की खाएब?', script: 'Devanagari' },
    { lang: 'Santali', text: 'ᱪᱤᱱᱟᱹ ᱡᱚᱢ ᱞᱟᱹᱜᱤᱫ?', script: 'Ol Chiki' },
    { lang: 'Bodo', text: 'मावा जानाय?', script: 'Devanagari' },
    { lang: 'Santhali', text: 'ᱪᱤᱱᱟᱹ ᱡᱚᱢ?', script: 'Ol Chiki' },
    { lang: 'Mizo', text: 'Eng nge ei tur?', script: 'Latin' },
    { lang: 'Khasi', text: 'Mynta bam?', script: 'Latin' },
    { lang: 'Garo', text: 'Ba chak?', script: 'Latin' },
    { lang: 'Tripuri', text: 'Khurum sa?', script: 'Latin' },
    { lang: 'Nagamese', text: 'Ki khabole?', script: 'Latin' },
    { lang: 'Bhojpuri', text: 'का खाईं?', script: 'Devanagari' },
    { lang: 'Rajasthani', text: 'के खावणो?', script: 'Devanagari' }
  ];

  // 50+ Popular foods with emojis for rolling animation
  const foods = [
    { name: 'Fish Curry', emoji: '🐟', type: 'Non-Veg' },
    { name: 'Chicken Biryani', emoji: '🍗', type: 'Non-Veg' },
    { name: 'Mutton Curry', emoji: '🍖', type: 'Non-Veg' },
    { name: 'Fresh Milk', emoji: '🥛', type: 'Dairy' },
    { name: 'Spicy Curry', emoji: '🍛', type: 'Veg' },
    { name: 'Cheese Burger', emoji: '🍔', type: 'Fast Food' },
    { name: 'Pizza Slice', emoji: '🍕', type: 'Fast Food' },
    { name: 'Fresh Roti', emoji: '🫓', type: 'Indian' },
    { name: 'Basmati Rice', emoji: '🍚', type: 'Indian' },
    { name: 'Masala Dosa', emoji: '🥞', type: 'South Indian' },
    { name: 'Chole Bhature', emoji: '🍛', type: 'North Indian' },
    { name: 'Idli Sambar', emoji: '🥞', type: 'South Indian' },
    { name: 'Pav Bhaji', emoji: '🍞', type: 'Street Food' },
    { name: 'Vada Pav', emoji: '🍔', type: 'Street Food' },
    { name: 'Samosa', emoji: '🥟', type: 'Snacks' },
    { name: 'Dhokla', emoji: '🧈', type: 'Gujarati' },
    { name: 'Rajma Rice', emoji: '🍚', type: 'North Indian' },
    { name: 'Dal Tadka', emoji: '🍲', type: 'Indian' },
    { name: 'Paneer Curry', emoji: '🧀', type: 'Vegetarian' },
    { name: 'Aloo Paratha', emoji: '🫓', type: 'Punjabi' },
    { name: 'Poha', emoji: '🍚', type: 'Breakfast' },
    { name: 'Upma', emoji: '🍚', type: 'South Indian' },
    { name: 'Pasta', emoji: '🍝', type: 'Italian' },
    { name: 'Noodles', emoji: '🍜', type: 'Chinese' },
    { name: 'Fried Rice', emoji: '🍛', type: 'Chinese' },
    { name: 'Momos', emoji: '🥟', type: 'Chinese' },
    { name: 'Spring Rolls', emoji: '🌯', type: 'Chinese' },
    { name: 'Manchurian', emoji: '🥘', type: 'Indo-Chinese' },
    { name: 'Hakka Noodles', emoji: '🍜', type: 'Chinese' },
    { name: 'Sweet Corn', emoji: '🌽', type: 'Healthy' },
    { name: 'Green Salad', emoji: '🥗', type: 'Healthy' },
    { name: 'Fruit Bowl', emoji: '🍇', type: 'Healthy' },
    { name: 'Apple', emoji: '🍎', type: 'Fruits' },
    { name: 'Banana', emoji: '🍌', type: 'Fruits' },
    { name: 'Mango', emoji: '🥭', type: 'Fruits' },
    { name: 'Orange', emoji: '🍊', type: 'Fruits' },
    { name: 'Grapes', emoji: '🍇', type: 'Fruits' },
    { name: 'Watermelon', emoji: '🍉', type: 'Fruits' },
    { name: 'Pineapple', emoji: '🍍', type: 'Fruits' },
    { name: 'Strawberry', emoji: '🍓', type: 'Fruits' },
    { name: 'Ice Cream', emoji: '🍦', type: 'Dessert' },
    { name: 'Chocolate Cake', emoji: '🍰', type: 'Dessert' },
    { name: 'Cookies', emoji: '🍪', type: 'Dessert' },
    { name: 'Donuts', emoji: '🍩', type: 'Dessert' },
    { name: 'French Fries', emoji: '🍟', type: 'Fast Food' },
    { name: 'Sandwich', emoji: '🥪', type: 'Fast Food' },
    { name: 'Hot Dog', emoji: '🌭', type: 'Fast Food' },
    { name: 'Tacos', emoji: '🌮', type: 'Mexican' },
    { name: 'Sushi', emoji: '🍣', type: 'Japanese' },
    { name: 'Green Tea', emoji: '🍵', type: 'Beverages' },
    { name: 'Coffee', emoji: '☕', type: 'Beverages' }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const foodInterval = setInterval(() => {
      setCurrentFood((prev) => (prev + 1) % foods.length);
    }, 600); // Change every 0.6 seconds for faster rolling

    return () => clearInterval(foodInterval);
  }, []);
  const scrollToBot = () => {
    const botElement = document.querySelector('.floating-bot');
    if (botElement) {
      botElement.scrollIntoView({ behavior: 'smooth' });
      // Add attention animation
      botElement.classList.add('animate-bounce');
      setTimeout(() => {
        botElement.classList.remove('animate-bounce');
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-green-200 rounded-full animate-pulse opacity-60"></div>
      </div>

      {/* Hospital Header - Subtle */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
            <div className="flex items-center gap-2 mb-1 sm:mb-0">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
              <span className="font-semibold">Homa Healthcare Center</span>
            </div>
            <div className="flex items-center gap-4">
              <span>📞 +91 99637 21999</span>
              <span>🩺 Dr. Muddu Surendra Nehru MD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Left Side - Content */}
          <div className="w-full space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Animated Language Display */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Ask in your language:</div>
                <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text animate-pulse">
                  {languages[currentLanguage].text}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {languages[currentLanguage].lang} • {languages[currentLanguage].script}
                </div>
                <div className="flex justify-center mt-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Main Heading */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                <span className="text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
                  What to Eat?
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed">
                Get instant nutrition analysis from Dr. Nehru's AI Bot
                <br />
                <span className="text-pink-600 font-semibold">3 Lakh foods • 165 countries • 7 continents</span>
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              <Card className="p-4 bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl mb-2">🍎</div>
                  <div className="font-semibold text-green-700 text-sm sm:text-base">Instant Analysis</div>
                  <div className="text-xs sm:text-sm text-green-600">Any food, any cuisine</div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl mb-2">🩺</div>
                  <div className="font-semibold text-purple-700 text-sm sm:text-base">Dr. Nehru's AI</div>
                  <div className="text-xs sm:text-sm text-purple-600">25+ years experience</div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl mb-2">🚦</div>
                  <div className="font-semibold text-orange-700 text-sm sm:text-base">Diabetes Safe</div>
                  <div className="text-xs sm:text-sm text-orange-600">Traffic light system</div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl mb-2">⚡</div>
                  <div className="font-semibold text-blue-700 text-sm sm:text-base">24/7 Available</div>
                  <div className="text-xs sm:text-sm text-blue-600">Always ready</div>
                </div>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left">
              <Button 
                onClick={scrollToBot}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Click the Green Bot Below! 
                <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
              </Button>
              <p className="text-xs sm:text-sm text-gray-600 mt-3">
                👇 Scroll down and click the floating doctor bot
              </p>
            </div>
          </div>

          {/* Right Side - Attractive Model */}
          <div className="relative w-full order-1 lg:order-2">
            <Card className="p-6 sm:p-8 bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-2xl rounded-3xl">
              <div className="text-center space-y-6">
                {/* Beautiful Girl Face */}
                <div className="relative mx-auto w-24 sm:w-32 h-24 sm:h-32 mb-4">
                  <div className="w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-b from-pink-100 to-rose-200 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
                    {/* Face Structure */}
                    <div className="absolute inset-2">
                      {/* Hair */}
                      <div className="absolute -top-2 -left-2 -right-2 h-16 sm:h-20 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-full"></div>
                      
                      {/* Face */}
                      <div className="absolute top-4 sm:top-6 left-3 sm:left-4 right-3 sm:right-4 h-12 sm:h-16 bg-gradient-to-b from-rose-100 to-rose-200 rounded-full">
                        {/* Eyes */}
                        <div className="absolute top-3 sm:top-4 left-2 sm:left-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-black rounded-full"></div>
                        <div className="absolute top-3 sm:top-4 right-2 sm:right-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-black rounded-full"></div>
                        
                        {/* Nose */}
                        <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rose-300 rounded-full"></div>
                        
                        {/* Smile */}
                        <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 w-3 sm:w-4 h-1.5 sm:h-2 border-b-2 border-rose-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Sparkle Effects */}
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-400 animate-pulse" />
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Heart className="w-2 sm:w-3 h-2 sm:h-3 text-pink-500 animate-bounce" />
                    </div>
                  </div>
                </div>
                {/* Model Illustration */}
                <div className="relative mx-auto w-48 sm:w-64 h-60 sm:h-80 bg-gradient-to-b from-pink-100 to-purple-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                  {/* Professional Model Representation */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Body - Professional Attire */}
                    <div className="w-16 sm:w-20 h-24 sm:h-32 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-3xl border-2 border-white shadow-lg mt-6 sm:mt-8"></div>
                    
                    {/* Professional Pants */}
                    <div className="w-14 sm:w-18 h-18 sm:h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg border-2 border-white shadow-lg"></div>
                    
                    {/* Professional Shoes */}
                    <div className="w-10 sm:w-12 h-3 sm:h-4 bg-black rounded-full mt-1 sm:mt-2 shadow-lg"></div>
                  </div>

                  {/* Floating Hearts */}
                  <div className="absolute top-4 right-4">
                    <Heart className="w-4 sm:w-6 h-4 sm:h-6 text-pink-500 animate-pulse" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-red-400 animate-bounce" />
                  </div>
                </div>

                {/* Rolling Food Animation */}
                <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Ask about any food:</div>
                    <div className="text-lg sm:text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text animate-pulse">
                      {foods[currentFood].emoji} {foods[currentFood].name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {foods[currentFood].type} • Instant Analysis
                    </div>
                  </div>
                </Card>
                {/* Pointing Gesture */}
                <div className="relative">
                  <div className="text-4xl sm:text-6xl animate-bounce">👇</div>
                  <div className="absolute -right-6 sm:-right-8 top-1 sm:top-2 text-lg sm:text-2xl animate-pulse">✨</div>
                  <div className="absolute -left-6 sm:-left-8 top-1 sm:top-2 text-lg sm:text-2xl animate-pulse">💫</div>
                </div>

                {/* Message */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border-2 border-pink-200">
                  <p className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    "Click the Green Bot!"
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Get instant nutrition advice from Dr. Nehru's AI
                  </p>
                </div>

                {/* Animated Indicators */}
                <div className="flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Rolling Food Banner */}
        <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <div className="text-center">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
                🍽️ Ask About ANY Food - Get Instant Analysis! 
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {foods.slice(0, 8).map((food, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg shadow-md border hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="text-xl sm:text-2xl mb-1">{food.emoji}</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700">{food.name}</div>
                    <div className="text-xs text-gray-500">{food.type}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-4">
                + 3 Lakh more foods from 165 countries! 🌍
              </p>
            </div>
          </Card>
        </div>
        {/* Bottom Arrow Indicator */}
        <div className="text-center mt-12">
          <div className="animate-bounce">
            <ArrowDown className="w-6 sm:w-8 h-6 sm:h-8 text-pink-500 mx-auto" />
          </div>
          <p className="text-base sm:text-lg font-semibold text-gray-700 mt-2">
            Look for the Green Doctor Bot Below! 🩺
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            Click it to start your free nutrition analysis
          </p>
        </div>
      </div>

      {/* Footer with Hospital Info */}
      <div className="relative z-10 bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="font-semibold">🏥 Homa Healthcare Center</div>
            <div>Dr. Muddu Surendra Nehru MD - Professor of Medicine & Physician</div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <span>📞 +91 99637 21999</span>
              <span>🌐 www.homahealthcarecenter.in</span>
              <span>📍 HOMA-IR Specialist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
    </div>
  );
};

export default AnimatedLanding;